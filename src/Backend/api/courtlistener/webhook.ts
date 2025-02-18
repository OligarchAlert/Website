import Elysia from "elysia";

export function ConfigureCourtlistenerWebhook(app: Elysia) {
    app.post(`/api/webhook/${process.env.COURTLISTENER_WEBHOOK_SECRET}`, ({ body }) => {
        console.log('Webhook received', body);
    })
}