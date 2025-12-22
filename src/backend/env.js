import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"
import dotenv from "@dotenvx/dotenvx"

dotenv.config()

export const env = createEnv({
    server: {
        BASE_URL: z
            .url()
            .optional()
            .transform((v) => (v?.endsWith("/") ? v.slice(0, -1) : v)),
        PORT: z
            .string()
            .default("3001")
            .transform((v) => {
                const parsed = Number(v);
                if (Number.isNaN(parsed) || parsed <= 0) throw new Error("PORT must be a positive number");
                return parsed;
            }),
        SEPAY_ENV: z.enum(["sandbox", "production"]).default("sandbox"),
        SEPAY_MERCHANT_ID: z.string().min(1, "Missing SEPAY_MERCHANT_ID"),
        SEPAY_SECRET_KEY: z.string().min(1, "Missing SEPAY_SECRET_KEY"),
    },
    // eslint-disable-next-line no-undef
    runtimeEnv: process.env,
});
