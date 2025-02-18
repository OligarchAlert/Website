import renderToString from "preact-render-to-string";
import * as HomeRoute from "../../../Layout/routes/Home";
import Elysia from "elysia";
import { getBundleData } from "../bundler";
import Document from "../../../Layout/Document";
import prisma from "../../db";

const routes = {
    'home': {
        component: HomeRoute.default,
        getStaticProps: HomeRoute.getStaticProps
    }
}

export function ConfigureRoutes(app: Elysia) {
    app.get('/:path?', async ({ params }) => {
        const { clientBundle, stylesBundle } = getBundleData();

        const route = routes[(params.path ?? 'home') as keyof typeof routes];

        if (!route) {
            return new Response('404 Not Found', { status: 404 });
        }

        const { component: RouteComponent, getStaticProps } = route;
        const initialState = await getStaticProps({ prisma });

        const renderedContent = renderToString(
            <Document
                title={params.path ?? 'Home'}
                clientBundle={clientBundle}
                stylesBundle={stylesBundle}
                initialState={initialState.props}>
                <RouteComponent {...initialState.props} />
            </Document>
        );

        return renderedContent;
    })
}