import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";
import { MenuQuaries } from "../MenuQuaries/MenuQuaries";

import { config } from "../config/config";

export const menuRouter = express.Router();

// menuRouter.get("/:menuId", async (req: Request, res: Response) => {
//   const menuId = req.params.menuId;
//   const menu = await MenuQuaries.deleteMenu(menuId);
//   res.send({ msg: "you delete this menu" });
// });
menuRouter.get("/:locationId", async (req: Request, res: Response) => {
  const locationId = req.params.locationId;
  const menu = await MenuQuaries.getMenuByLocations(locationId);
  res.send(menu);
});

//create a menu
menuRouter.post("/", async (req: Request, res: Response) => {
  const { name, price, description, assetUrl, locationIds } = req.body;
  const isValid = name && locationIds && locationIds.length;
  if (!isValid) return res.sendStatus(400);
  const menu = await MenuQuaries.createMenu({
    name,
    price,
    assetUrl,
    description,
    locationIds,
  });
  res.send(menu);
});

//update menu

menuRouter.put("/:menuId", checkAuth, async (req: Request, res: Response) => {
  try {
    const menuId = req.params.menuId;
    if (!menuId) return res.send("Menu id is required");
    const { name, price } = req.body;
    if (!name && !price) return res.send("pls provide at least name");
    const text = "UPDATE menus SET name=$1, price=$2 WHERE id= $3 RETURNING *";
    const values = [name, price, menuId];
    const { rows } = await pool.query(text, values);
    res.send(rows);
  } catch (err) {
    console.error(err);
  }
});
