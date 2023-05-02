import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import App from "../App";
import Menus from "../Menus/Menus";
import Addon from "../Menus/Addons";
import Addon_Categories from "../Menus/Addon_Categories";
import Setting from "../Menus/Settting";
import Menu_Categories from "../Menus/Menu_Categories";
import MenuDetails from "../Menus/MenuDetails";
import MenuCategoryDetail from "../Menus/Menu_CategoryDetail";
import Addons from "../Menus/Addons";
import Login from "../Menus/Login";
import Register from "../Menus/Register";
import Loggin from "../Menus/Login";
import PrivateRoute from "./PrivateRoute";
import Logout from "../Menus/LogOut";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/menus",
//     element: <Menus />,
//   },
//   {
//     path: "/menus/:menuId",
//     element: <MenuDetails />,
//   },
//   {
//     path: "/addons",
//     element: <Addons />,
//   },
//   {
//     path: "/menu_categories",
//     element: <Menu_Categories />,
//   },
//   {
//     path: "/menu_categories/:id",
//     element: <MenuCategoryDetail />,
//   },
//   {
//     path: "/addon_categories",
//     element: <Addon_Categories />,
//   },
//   {
//     path: "/settings",
//     element: <Setting />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);

// export default router;

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/orders" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menus/:menuId" Component={MenuDetails} />
          <Route path="/addons" Component={Addons} />
          <Route path="/menu_categories" Component={Menu_Categories} />
          <Route path="/menu_categories/:id" Component={MenuCategoryDetail} />
          <Route path="/addon_categories" Component={Addon_Categories} />
          <Route path="/settings" Component={Setting} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
