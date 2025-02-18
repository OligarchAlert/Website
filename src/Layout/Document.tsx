import { ComponentChildren } from "preact";
import Layout from "./components/Layout/Layout";

interface DocumentProps {
    title: string;
    clientBundle: string;
    stylesBundle: string;
    children: ComponentChildren;
    initialState?: any;
}

export default function Document({ title, clientBundle, stylesBundle, children, initialState }: DocumentProps) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
                <link rel="stylesheet" href={`/static/${stylesBundle}`} />
            </head>
            <body>
                <div id="root">
                    <Layout>
                        {children}
                    </Layout>
                </div>
                <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};` }} />
                <script src={`/static/${clientBundle}`}></script>
            </body>
        </html>
    );
}