import { hydrate } from "preact";
import Home from "./routes/Home/Home";
import Layout from "./components/Layout/Layout";

// Client-side router
// const routes = {
//   '/': Home,
//   '/about': About
// };

const path = window.location.pathname;
// const RouteComponent = routes[path as keyof typeof routes] || Home;

const app = (
  <Layout>
    <Home />
  </Layout>
);

const root = document.getElementById("root");
if (root) {
  // Clear the root first to avoid hydration mismatches
  root.innerHTML = '';
  hydrate(app, root);
}