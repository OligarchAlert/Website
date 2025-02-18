import Elysia from "elysia";
import { ConfigureCourtlistenerWebhook } from "./courtlistener";

export function ConfigureApi(app: Elysia) {
    ConfigureCourtlistenerWebhook(app);
}