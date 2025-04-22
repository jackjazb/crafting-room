/* eslint-disable @typescript-eslint/no-invalid-void-type */
export type Config = object | ((props: { env: EnvFunction; }) => object);

export type EnvFunction = {
    /**
     * Parses an environment variable as a string.
     */
    (this: void, key: string): string | undefined;
    (this: void, key: string, defaultValue: string | number): string;

    /**
     * Parses an environment variable as an integer.
     */
    int(this: void, key: string): number | undefined;
    int(this: void, key: string, defaultValue: number): number;

    /**
     * Parses an environment variable as a float.
     */
    float(this: void, key: string): number | undefined;
    float(this: void, key: string, defaultValue: number): number;

    /**
     * Parses an environment variable as a boolean.
     */
    bool(this: void, key: string): boolean | undefined;
    bool(this: void, key: string, defaultValue: boolean): boolean;

    /**
     * Parses an environment variable as a JSON object
     */
    json<T = unknown>(this: void, key: string): T | undefined;
    json<T = unknown>(this: void, key: string, defaultValue: object): T;

    /**
     * Parses an environment variable as an array.
     *
     * `ENV_VAR=[value1, value2, value3] | ENV_VAR=["value1", "value2", "value3"])`
     */
    array<T = unknown>(this: void, key: string): T[] | undefined;
    array<T = unknown>(this: void, key: string, defaultValue: T[]): T[];

    /**
     * Parses an environment variable as a date.
     */
    date(this: void, key: string): Date | undefined;
    date(this: void, key: string, defaultValue: Date): Date;

    /**
     * Parses and returns an environment variable matching oneOf union types.
     */
    oneOf<T = unknown>(this: void, key: string, typesToMatch: string[]): T | undefined;
    oneOf<T = unknown>(this: void, key: string, typesToMatch: string[], defaultValue: string): T;
};
