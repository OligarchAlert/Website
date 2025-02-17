import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { renderToString } from "preact-render-to-string";
import Document from "../Frontend/Document";
import Home from "../Frontend/routes/Home/Home";
import staticPlugin from "@elysiajs/static";

// Read the build metadata at startup
let clientBundle = 'client.js'; // default fallback
let stylesBundle = 'styles.css';
try {
  const meta = JSON.parse(await Bun.file('./dist/build-meta.json').text());
  console.log('meta', meta);
  clientBundle = meta.client;
  stylesBundle = meta['styles.css'];
  console.log('Using client bundle:', clientBundle);
} catch (e) {
  console.warn('No build-meta.json found, using default client.js');
}

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: 'dist',
    prefix: '/static'
  }))
  .get('/:path?', ({ params }) => {
    // const path = params.path ? `/${params.path}` : '/';
    // const route = routes[path as keyof typeof routes];
    
    // if (!route) {
    //   return new Response('404 Not Found', { status: 404 });
    // }

    // const RouteComponent = route.component;
    console.log('clientBundle', clientBundle);
    console.log('stylesBundle', stylesBundle);
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
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
