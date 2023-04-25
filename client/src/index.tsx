import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import MenuProvider from "./Contents/Menu_Contents";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <MenuProvider>
    <RouterProvider router={router} />
  </MenuProvider>
);
