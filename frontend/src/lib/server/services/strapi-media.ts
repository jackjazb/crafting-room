import type { StrapiMediaServiceOptions } from "@/lib/server/services/classes/strapi-media";
import { StrapiMediaService } from "@/lib/server/services/classes/strapi-media";

const options: StrapiMediaServiceOptions = {
    mediaProviderHostname: process.env.STRAPI_HOST ?? "",
    defaultFallbackColor: "var(--fallback-image-color)",
};

/**
 * Strapi media service instance on the server.
 */
export const media = new StrapiMediaService(options);
