/**
 * Creates a timeout wrapped in a promise that resolves after a given
 * `duration`.
 * @param duration - Duration in milliseconds
 * @returns Void promise that resolves after duration
 */
export const delay = async (duration: number): Promise<void> =>
    new Promise<void>(resolve => setTimeout(resolve, duration));

/**
 * Creates a timeout wrapped in a promise that resolves after a random
 * duration between `minDuration` and `maxDuration`.
 * @param minDuration - Minimum duration in milliseconds
 * @param maxDuration - Maximum duration in milliseconds
 * @returns Void promise that resolves after duration
 */
export const randomDelay = async (minDuration: number, maxDuration: number): Promise<void> =>
    new Promise<void>(resolve =>
        setTimeout(
            resolve,
            Math.floor(Math.random() * (maxDuration - minDuration)) + minDuration,
        ));
