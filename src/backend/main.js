import express from "express"
import cors from "cors"

import { env } from "./env.js"
import { client } from "./sepay-client.js"
import { checkoutInputSchema } from "./checkout-input-schema.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use((_, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:5173 http://localhost:3001");
    next();
});

function sendJson(res, body, status = 200) {
    return res.status(status).json(body);
}

app.post("/create-checkout", async (req, res) => {
    let parsed;

    try {
        const payload = req.body;
        parsed = checkoutInputSchema.parse(payload);
    } catch (err) {
        return sendJson(
            res,
            { error: "Invalid payload", details: err instanceof Error ? err.message : String(err) },
            400,
        );
    }

    const fields = client.checkout.initOneTimePaymentFields({
        operation: "PURCHASE",
        payment_method: parsed.payment_method,
        order_invoice_number: parsed.order_invoice_number,
        order_amount: parsed.order_amount,
        currency: parsed.currency,
        order_description: parsed.order_description,
        customer_id: parsed.customer_id,
        success_url: parsed.success_url,
        error_url: parsed.error_url,
        cancel_url: parsed.cancel_url,
        custom_data: parsed.custom_data ? JSON.stringify(parsed.custom_data) : undefined,
    });

    const checkoutUrl = client.checkout.initCheckoutUrl();

    return sendJson(res, { checkoutUrl, fields }, 200);
});

app.get('/check-health', async (req, res) => {
    return sendJson(res, { message: "Okay" }, 200);
})

const PORT = env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
