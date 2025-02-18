import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import Elysia from "elysia";
import { StartBundler } from "./bundler";
import { ConfigureRoutes } from "./routes/routes";

export function ConfigureFrontend(app: Elysia) {

    StartBundler();

    app
        .use(html())
        .use(staticPlugin({
            assets: 'dist',
            prefix: '/static'
        }));

    ConfigureRoutes(app);
}