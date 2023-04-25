import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "../App";
import Menus from "../Menus/Menus";
import Addons from "../Menus/Addons";
import Addon_Categories from "../Menus/Addon_Categories";
import Setting from "../Menus/Settting";
import Menu_Categories from "../Menus/Menu_Categories";
import MenuDetails from "../Menus/MenuDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/menus/:menuId",
    element: <MenuDetails />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/menu_categories",
    element: <Menu_Categories />,
  },
  {
    path: "/addon_categories",
    element: <Addon_Categories />,
  },
  {
    path: "/settings",
    element: <Setting />,
  },
]);

export default router;
