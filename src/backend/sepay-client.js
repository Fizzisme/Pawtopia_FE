import { env } from "./env.js";
import { SePayPgClient } from "sepay-pg-node";

export const client = new SePayPgClient({
    env: env.SEPAY_ENV,
    merchant_id: env.SEPAY_MERCHANT_ID,
    secret_key: env.SEPAY_SECRET_KEY,
});
