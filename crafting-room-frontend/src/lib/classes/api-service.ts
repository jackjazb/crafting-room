import { merge } from 'lodash';
import { stringify } from 'qs';
import { OptionalProps } from '@/lib/types/utils';

/**
 * Options for an API service.
 */
export interface ApiServiceOptions {
	/**
	 * Hostname of the API.
	 */
	hostname: string;
	/**
	 * Base URL path of the API. This will be appended to the hostname on every request.
	 *
	 * Include a leading, **but not a trailing slash - it's automatically appended**.
	 * @defaultValue null
	 */
	basePath?: string | null;
	/**
	 * Base URL parameters to be passed on every request.
	 * @defaultValue null
	 */
	baseParams?: Record<string, string> | null;
	/**
	 * Number of times to attempt a request before giving up.
	 * @defaultValue 1 attempt
	 */
	requestAttempts?: number;
	/**
	 * Time to wait for a response (in seconds) before giving up.
	 *
	 * This applies to each individual request attempt.
	 * @defaultValue 30 seconds
	 */
	timeout?: number;
	/**
	 * Interval between cache revalidations (in seconds), or false to disable.
	 *
	 * In other words, *"after this period of time, ask the server for new data on
	 * the next request"*.
	 * @defaultValue null, never revalidate
	 */
	cacheRevalidationInterval?: number | null;
}

/**
 * An API service based on the Fetch API.
 */
export class ApiService<
	TBaseResponse extends object = object,
	TBaseParams extends object = object
> {
	/**
	 * The default options for any API service instance.
	 */
	static readonly defaultOptions: Required<OptionalProps<ApiServiceOptions>> = {
		basePath: null,
		baseParams: null,
		requestAttempts: 1,
		timeout: 30,
		cacheRevalidationInterval: null
	};

	/**
	 * The options set for this API service instance.
	 */
	protected readonly options: Required<ApiServiceOptions>;

	/**
	 * An API service based on the Fetch API.
	 * @param options - API service options
	 */
	constructor(options: ApiServiceOptions) {
		this.options = merge({}, ApiService.defaultOptions, options);
	}

	/**
	 * Send a GET request to the API.
	 *
	 * The response data type should be provided to provide effective typings.
	 * @param endpoint - Target endpoint
	 * @param params - Request parameters
	 * @param options - Fetch request options
	 * @returns Response data
	 * @throws Error if request failed, took too long, or reached max attempts
	 */
	async get<
		TResponse extends TBaseResponse = TBaseResponse,
		TParams extends TBaseParams = TBaseParams
	>(
		endpoint: string,
		params?: TParams,
		options?: RequestInit
	) {
		const _params = merge({}, this.options.baseParams, params);
		const encodedParams = '?' + stringify(_params);

		const url = this.options.hostname
			+ (this.options.basePath ?? '')
			+ '/'
			+ endpoint
			+ encodedParams;

		const _options: RequestInit =
			merge({}, {
				next: { revalidate: this.options.cacheRevalidationInterval }
			}, options);

		const sendRequest = async () => {
			const response = await fetch(url, _options);
			if (!response.ok)
				throw new Error('Response was not OK');
			return response;
		};

		let attempts = 0;

		const attemptRequest = async (): Promise<Response> => {
			if (attempts >= this.options.requestAttempts)
				throw new Error(`Maximum number of fetch request attempts (${this.options.requestAttempts}) has been reached`);

			attempts++;

			try {
				return new Promise<Response>((resolve, reject) => {
					// TODO -> do actual cancellation here, see AbortController
					void sendRequest().then(resolve).catch(reject);
					setTimeout(reject, this.options.timeout * 1000);
				});

			} catch (e) {
				return await attemptRequest();
			}
		};

		const response = await attemptRequest();
		return response.json() as Promise<TResponse>;
	}
}