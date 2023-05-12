import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";

export const dataRouter = express.Router();

//get all data
dataRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const userResult = await pool.query("select * from users where email=$1", [
    //@ts-ignore
    req.email,
  ]);
  const userRows = userResult.rows;
  if (!userRows.length) return res.sendStatus(401);
  try {
    const user = userRows[0];
    const companyId = user.companies_id;
    const locations = await pool.query(
      "select * from locations where companies_id = $1",
      [companyId]
    );
    const locationIds = locations.rows.map((row) => row.id);

    const menuLocations = await pool.query(
      "select * from menu_locations where location_id = any($1::int[])",
      [locationIds]
    );

    const menuIds = menuLocations.rows.map((row) => row.menu_id);

    const menus = await pool.query(
      "select * from menus where id = any($1::int[])",
      [menuIds]
    );

    const menuMenuCategoriesResult = await pool.query(
      "select * from menus_menucategrories where menu_id = ANY($1::int[])",
      [menuIds]
    );
    const menuCategoryIds = menuMenuCategoriesResult.rows.map(
      (row) => row.menu_categories_id
    );

    const menuCategoriesResult = await pool.query(
      "select * from menu_categories where  id = ANY($1::int[])",
      [menuCategoryIds]
    );
    const menusAddonCategoriesResult = await pool.query(
      "select * from addons_menus where menu_id = ANY($1::int[])",
      [menuIds]
    );
    const addonCategoryIds = menusAddonCategoriesResult.rows.map(
      (row) => row.category_of_addon
    );
    const addonCategories = await pool.query(
      "select * from addon_categories where id = ANY($1::int[])",
      [addonCategoryIds]
    );
    const addons = await pool.query(
      "select * from addons where addon_category_id = ANY($1::int[])",
      [addonCategoryIds]
    );
    const companyResult = await pool.query(
      "select * from company where id = $1",
      [companyId]
    );
    const company = companyResult.rows[0];

    res.send({
      menus: menus.rows,
      menuCategories: menuCategoriesResult.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      locations: locations.rows,
      menuLocations: menuLocations.rows,
      company,
    });
  } catch (err) {
    console.error(err);
  }
});
