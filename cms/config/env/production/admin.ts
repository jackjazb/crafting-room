import type { Config } from "../../lib/types";
import { throwExp } from "../../lib/utils";

const admin: Config = ({ env }) => {
    return {
        auth: {
            secret: env("ADMIN_JWT_SECRET")
                ?? throwExp("Missing 'ADMIN_JWT_SECRET' environment variable"),
        },
        apiToken: {
            salt: env("API_TOKEN_SALT")
                ?? throwExp("Missing 'API_TOKEN_SALT' environment variable"),
        },
        transfer: {
            token: {
                salt: env("TRANSFER_TOKEN_SALT")
                    ?? throwExp("Missing 'TRANSFER_TOKEN_SALT' environment variable"),
            },
        },
    };
};

export default admin;
