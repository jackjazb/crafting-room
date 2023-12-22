import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { merge } from 'lodash';
import { OptionalProps } from '@/types/utils';

/**
 * Options for an API client.
 */
export type ApiOptions = {
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
	 * @defaultValue 5 attempts
	 */
	retryCount?: number;
	/** The time to wait for a response (in milliseconds) before giving up.
	 * @defaultValue 30 seconds
	 */
	timeout?: number;
};

/**
 * An API client based on Axios.
 */
export abstract class ApiClient {
	/**
	 * The default options for the API client.
	 *
	 * This has to be static.
	 *
	 * If you're curious, and (like me) didn't fully understand prototypes and the prototype chain, read [this section 'Inspecting prototypes: a deeper dive'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#inspecting_prototypes_a_deeper_dive)
	 * and [this section 'Accessing super in class field declaration'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super#accessing_super_in_class_field_declaration)
	 * to understand why this is the case, and why we can't access through `super.property` or `super["property"]` in subclasses if not static.
	 * @returns Currently defined options
	 */
	protected static readonly defaultOptions: Required<OptionalProps<ApiOptions>> = {
		baseEndpoint: '',
		baseParams: null,
		retryCount: 5,
		timeout: 30000
	};
	/** The options set for this API client instance. */
	protected readonly options: Required<ApiOptions>;
	/** The Axios HTTP client instance being used to perform API calls. */
	protected readonly httpClient: AxiosInstance;

	/**
	 * @param options - Target API client options
	 */
	constructor(options: ApiOptions) {
		this.options = merge({}, ApiClient.defaultOptions, options);

		this.httpClient = axios.create({
			baseURL: this.options.hostname + this.options.baseEndpoint,
			params: this.options.baseParams ?? undefined,
			timeout: this.options.timeout
		});

		axiosRetry(this.httpClient, {
			retries: this.options.retryCount ?? 5
		});
	}

	/**
	 * Send a GET request to the API.
	 *
	 * The response data type should be provided to provide effective typings.
	 * @param endpoint - Target endpoint
	 * @param params - Target parameters
	 * @returns Promise containing response data
	 */
	protected abstract get(endpoint: string, params?: object): unknown;
}