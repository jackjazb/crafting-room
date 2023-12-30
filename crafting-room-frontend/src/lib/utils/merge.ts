/**
 * Shallowly merges one one or more objects together into a new object.
*
* When the same key is present in multiple objects, the latter
* object's value is used.
* @param obj - Target objects
* @returns Merged objects
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merge: typeof Object.assign = (...obj: Parameters<typeof Object.assign>) =>
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	Object.assign({}, ...obj);
