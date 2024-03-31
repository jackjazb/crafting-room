/**
 * Shorthand to throw an error as an expression.
 * @param error - Error message or instance
 */
export const throwExp = (error?: string | Error): never => {
	if (error instanceof Error)
		throw error;
	else
		throw new Error(error);
};
