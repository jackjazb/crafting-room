import { merge } from 'lodash';
import { stringify } from 'qs';
import { OptionalProps } from '@/types/utils';

/**
 * Options for a HTTP client.
 */
export type HttpClientOptions = {
	/**
	 * Hostname of the API.
	 */
	hostname: string;
	/**
	 * Base endpoint of the API. All calls will be made with this endpoint as the root.
	 * @defaultValue ""
	 */
	baseEndpoint?: string;
	/**
	 * Base URL parameters to be passed on every request.
	 * @defaultValue null
	 */
	baseParams?: Record<string, string> | null;
	/**
	 * Number of times to attempt an API call before giving up.
	 * @defaultValue 1 attempt
	 */
	retryCount?: number;
	/**
	 * Time to wait for a response (in milliseconds) before giving up.
	 * @defaultValue 30 seconds
	 */
	timeout?: number;
	/**
	 * The interval between cache revalidations (in seconds), or false to disable.
	 *
	 * In other words, *"after this period of time, ask the server for new data on
	 * the next request"*.
	 * @defaultValue false, never revalidate
	 */
	cacheRevalidationInterval?: number | false;
};

/**
 * A HTTP client based on the Fetch API.
 *
 * No longer using Axios because of this: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries.
 *
 * Axios uses XHR under the hood, not Fetch.
 */
export class HttpClient<TBaseResponseData extends object = object> {
	/**
	 * The default options for any instance.
	 */
	static readonly defaultOptions: Required<OptionalProps<HttpClientOptions>> = {
		baseEndpoint: '',
		baseParams: null,
		retryCount: 1,
		timeout: 30000,
		cacheRevalidationInterval: false
	};

	/**
	 * The options set for this instance.
	 */
	protected readonly options: Required<HttpClientOptions>;

	/**
	 * @param options - Target HTTP client options
	 */
	constructor(options: HttpClientOptions) {
		this.options = merge({},
			HttpClient.defaultOptions,
			options);
	}

	/**
	 * Send a GET request.
	 *
	 * The response data type should be provided to provide effective typings.
	 * @param endpoint - Target endpoint
	 * @param params - Request querystring parameters
	 * @param options - Fetch request options
	 * @returns Promise containing response data
	 */
	async get<TData extends TBaseResponseData = TBaseResponseData>(
		endpoint: string,
		params?: object,
		options?: RequestInit
	) {
		const resolvedParams = merge({},
			this.options.baseParams,
			params);

		const encodedParams = '?' + stringify(resolvedParams);

		const url = this.options.hostname
			+ this.options.baseEndpoint
			+ '/'
			+ endpoint
			+ encodedParams;

		const resolvedOptions: RequestInit = merge({},
			{
				next: {
					revalidate: this.options.cacheRevalidationInterval
						? this.options.cacheRevalidationInterval
						: undefined
				}
			},
			options);

		const sendRequest = async () => {
			const response = await fetch(url, resolvedOptions);
			if (!response.ok)
				throw new Error('Response was not OK');

			return response;
		};

		let attempts = 0;

		const startAttemptingRequest = async (): Promise<Response> => {
			if (attempts >= this.options.retryCount)
				throw new Error(`Maximum number of fetch request attempts (${this.options.retryCount}) has been reached`);

			attempts++;

			try {
				const response = await new Promise<Response>((resolve, reject) => {
					void sendRequest().then(resolve).catch(reject);
					setTimeout(reject, this.options.timeout);
				});

				return response;

			} catch (e) {
				return await startAttemptingRequest();
			}
		};

		const response = await startAttemptingRequest();
		return await response.json() as TData;
	}
}