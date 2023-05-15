import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { menuRouter } from "./src/Routes/MenuRouter";
import { menuCategoriesRouter } from "./src/Routes/MenuCategoriesRouter";
import { addonCategoriesRouter } from "./src/Routes/AddonCategories";
import { addons } from "./src/Routes/Addon";
import { auth } from "./src/Routes/Auth";
import { dataRouter } from "./src/Routes/DataRouter";
import { locationRouter } from "./src/Routes/LocationRouter";
import { settingRouter } from "./src/Routes/SettingRouter";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/", dataRouter);

app.use("/menus", menuRouter);

app.use("/menu_categories", menuCategoriesRouter);

app.use("/addon_categories", addonCategoriesRouter);

app.use("/addons", addons);

app.use("/auth", auth);

app.use("/locations", locationRouter);

app.use("/setting", settingRouter);

app.listen(port, () => {
  console.log("server is listening:", port);
});
