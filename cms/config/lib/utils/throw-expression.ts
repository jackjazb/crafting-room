/**
 * Throws an error as an expression.
 * @param error - Error message or instance
 */
export const throwExp = (error?: string | Error) => {
	if (error instanceof Error)
		throw error;
	else
		throw new Error(error);
};
