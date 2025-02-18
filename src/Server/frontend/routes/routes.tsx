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

        // const path = params.path ? `/${params.path}` : '/';
        // const route = routes[path as keyof typeof routes];

        // if (!route) {
        //   return new Response('404 Not Found', { status: 404 });
        // }

        // const RouteComponent = route.component;
        const cases = [{
            id: 1,
            title: 'Test Case',
            content: 'Test Content',
            slug: 'test-case',
            published: true
        }, {
            id: 2,
            title: 'Test Case 2',
            content: 'Test Content 2',
            slug: 'test-case-2',
            published: true
        }];

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