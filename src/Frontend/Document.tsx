import { ComponentChildren } from "preact";
import Layout from "./components/Layout/Layout";

type DocumentProps = {
    children: ComponentChildren;
    title: string;
    clientBundle: string;
    stylesBundle: string;
};

export default function Document({ children, title, clientBundle, stylesBundle }: DocumentProps) {
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
                <script src={`/static/${clientBundle}`}></script>
            </body>
        </html>
    );
}