import renderToString from "preact-render-to-string";
import Home from "../../Frontend/routes/Home/Home";
import Elysia from "elysia";
import { getBundleData } from "./bundler";
import Document from "../../Frontend/Document";

export function ConfigureRoutes(app: Elysia) {
    app.get('/:path?', ({ params }) => {
        const { clientBundle, stylesBundle } = getBundleData(); 

        // const path = params.path ? `/${params.path}` : '/';
        // const route = routes[path as keyof typeof routes];

        // if (!route) {
        //   return new Response('404 Not Found', { status: 404 });
        // }

        // const RouteComponent = route.component;
        const renderedContent = renderToString(
            <Document
                title={params.path ?? 'Home'}
                clientBundle={clientBundle}
                stylesBundle={stylesBundle}>    
                <Home />
            </Document>
        );

        return renderedContent;
    })
}