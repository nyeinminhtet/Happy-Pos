import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";

export const dataRouter = express.Router();

//get all data
dataRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const menus = await pool.query("SELECT * FROM menus");
    const menuCategories = await pool.query("select * from menu_categories");
    const addons = await pool.query("SELECT * FROM addons");
    const addonCategories = await pool.query("SELECT * FROM addon_categories");
    const locations = await pool.query("SELECT * FROM locations");
    const menuLocations = await pool.query("select * from menu_locations");
    res.send({
      menus: menus.rows,
      menuCategories: menuCategories.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      locations: locations.rows,
      menuLocations: menuLocations.rows,
    });
  } catch (err) {
    console.error(err);
  }
});
