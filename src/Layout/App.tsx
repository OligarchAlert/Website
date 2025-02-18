import { hydrate } from "preact";
import Home from "./routes/Home/Home";
import Layout from "./components/Layout/Layout";

// Get the initial state that was injected by the server
declare global {
  interface Window {
    __INITIAL_STATE__: {
      cases: Array<{
        id: number;
        title: string;
        content: string;
        slug: string;
        published: boolean;
      }>;
    };
  }
}

const initialState = window.__INITIAL_STATE__;

// Client-side router
// const routes = {
//   '/': Home,
//   '/about': About
// };

const path = window.location.pathname;
// const RouteComponent = routes[path as keyof typeof routes] || Home;

const app = (
  <Layout>
    <Home cases={initialState.cases} />
  </Layout>
);

const root = document.getElementById("root");
if (root) {
  // Clear the root first to avoid hydration mismatches
  root.innerHTML = '';
  hydrate(app, root);
}