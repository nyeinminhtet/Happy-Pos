import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";
import { MenuQuaries } from "../MenuQuaries/MenuQuaries";
import { fileUpload } from "../libs/fileUpload";
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
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        return res.sendStatus(500);
      }
      const [{ originalname }]: any = req.files;
      const { name, price, locationIds } = JSON.parse(req.body["menu"]);
      const imgUrl = `${config.spaceEndpoint}/happy-pos/jey/${originalname}`;
      const menu = await MenuQuaries.createMenu({
        name,
        price,
        imgUrl,
        locationIds,
      });
      res.send(menu);
      res.sendStatus(200);
    });
  } catch (err) {
    console.error(err);
  }
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
