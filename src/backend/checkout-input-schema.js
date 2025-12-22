import { z } from "zod"

export const checkoutInputSchema = z.object({
    order_invoice_number: z.string().min(1, "`order_invoice_number` is required"),
    order_amount: z.preprocess((v) => (typeof v === "string" ? Number(v) : v), z.number().positive("`order_amount` must be > 0")),
    currency: z.string().default("VND"),
    payment_method: z.enum(["BANK_TRANSFER", "NAPAS_BANK_TRANSFER"]).default("BANK_TRANSFER"),
    order_description: z.string().default("Pawtopia order payment"),
    customer_id: z.string().optional(),
    custom_data: z.record(z.string(), z.any()).optional(),
    success_url: z.url(),
    error_url: z.url(),
    cancel_url: z.url(),
});
