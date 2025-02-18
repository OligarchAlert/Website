import { Elysia } from "elysia";
import { ConfigureFrontend } from "./frontend";
import { ConfigureApi } from "./api";

const app = new Elysia();
ConfigureFrontend(app);
ConfigureApi(app);
app.listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
