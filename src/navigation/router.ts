import { Router, RootRoute, Route } from "@tanstack/react-router";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Register from "./routes/Register";
import App from "./routes/App";
import Stores from "./routes/stores/Stores";
import Brands from "./routes/brands/Brands";
import Restrictions from "./routes/Restrictions";
import StoresEditor from "./routes/stores/StoresEditor";
import StoresCreator from "./routes/stores/StoresCreator";
import BrandsEditor from "./routes/brands/BrandsEditor";
import BrandsCreator from "./routes/brands/BrandsCreator";

const rootRoute = new RootRoute({
  component: Root,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "login",
  component: Login,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "register",
  component: Register,
});

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "app",
  component: App,
});

const storesRoute = new Route({
  getParentRoute: () => appRoute,
  path: "stores",
  component: Stores,
});

const storesEditorRoute = new Route({
  getParentRoute: () => appRoute,
  path: "stores/$id",
  component: StoresEditor,
});

const storesCreatorRoute = new Route({
  getParentRoute: () => appRoute,
  path: "stores/create",
  component: StoresCreator,
});

const brandsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "brands",
  component: Brands,
});

const brandsEditorRoute = new Route({
  getParentRoute: () => appRoute,
  path: "brands/$id",
  component: BrandsEditor,
});

const brandsCreatorRoute = new Route({
  getParentRoute: () => appRoute,
  path: "brands/create",
  component: BrandsCreator,
});

const restrictionsRoute = new Route({
  getParentRoute: () => appRoute,
  path: "restrictions",
  component: Restrictions,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  appRoute.addChildren([
    storesRoute,
    storesEditorRoute,
    storesCreatorRoute,
    brandsRoute,
    brandsEditorRoute,
    brandsCreatorRoute,
    restrictionsRoute,
  ]),
]);

const router = new Router({ routeTree });

export default router;
