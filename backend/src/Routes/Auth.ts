import express, { Request, Response } from "express";
import { pool } from "../../db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const auth = express.Router();

//auth
auth.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isValid =
      name &&
      name.length > 0 &&
      email &&
      email.length > 0 &&
      password &&
      password.length > 0;
    if (!isValid) return res.send({ error: "pls enter fully form" });
    const result = await pool.query(
      "select * from users where email=$1 and password=$2",
      [email, password]
    );
    if (result.rows.length) res.send({ message: "User already exist" });

    // creat default company
    const defaultCompany = await pool.query(
      "INSERT INTO company (name) values($1) returning *",
      ["Default Company"]
    );
    const defaultCompanyId = defaultCompany.rows[0].id;
    //create user -->(company_id)
    const newUser = await pool.query(
      "insert into users (name, email, password,companies_id) values($1, $2, $3, $4) returning *",
      [name, email, hashedPassword, defaultCompanyId]
    );
    //create default location--> (company_id)
    const defaultLocation = await pool.query(
      "insert into locations (name,address,companies_id) values($1,$2,$3) returning *",
      ["Default Name", "Default Address", defaultCompanyId]
    );
    const defaultLocationId = defaultLocation.rows[0].id;
    // create dafault menus
    const defaultMenus = await pool.query(
      "insert into menus (name,price) select * from unnest ($1::text[],$2::int[]) returning *",
      [
        ["mote-hinn-khar", "shan-khout-swell"],
        [1000, 1500],
      ]
    );
    const menuId1 = defaultMenus.rows[0].id;
    const menuId2 = defaultMenus.rows[1].id;
    // connect two menus into menu_locations
    await pool.query(
      "insert into menu_locations (menu_id,location_id) select * from unnest ($1::int[],$2::int[]) returning *",
      [
        [menuId1, menuId2],
        [defaultLocationId, defaultLocationId],
      ]
    );
    //create default menu_categories
    const defaultMenuCategories = await pool.query(
      "insert into menu_categories (category) values ('defaultCategory1'),('defaultCategory2') returning *"
    );
    const defaultmenuCategory1 = defaultMenuCategories.rows[0].id;
    const defaultmenuCategory2 = defaultMenuCategories.rows[1].id;

    //create menus_menu_categories
    await pool.query(
      `insert into menus_menucategrories (menu_id,menu_categories_id) values (${menuId1},${defaultmenuCategory1}),(${menuId2},${defaultmenuCategory2}) returning *`
    );
    //create addon_categories
    const defaultAddonCategories = await pool.query(
      "insert into addon_categories (category_of_addon) values('drink'),('size') returning *"
    );
    const addonCategory1 = defaultAddonCategories.rows[0].id;
    const addonCategory2 = defaultAddonCategories.rows[1].id;

    //create addons
    await pool.query(
      `insert into addons (name,price,addon_category_id) values('Cola',600,${addonCategory1}),('Pepsi',600,${addonCategory1}),('large',300,${addonCategory2}) returning *`
    );

    // addon_menu
    await pool.query(
      `insert into addons_menus (menu_id,addon_category_id) values(${menuId1},${addonCategory1}),(${menuId2},${addonCategory2}) returning *`
    );

    res.send(newUser.rows);
  } catch (err) {
    console.error(err);
  }
});

auth.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isValid = email && email.length > 0 && password && password.length > 0;
  if (!isValid) return res.sendStatus(400);
  try {
    const result = await pool.query("select * from users where email=$1", [
      email,
    ]);
    if (!result.rows.length) return res.sendStatus(404);
    const isValidPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    if (!isValidPassword) return res.status(401).send("invilid credentail");
    const userResult = result.rows[0];
    const user = {
      id: userResult.id,
      name: userResult.name,
      email: userResult.email,
    };
    const accessToken = jwt.sign(user, config.jwtSecret);
    res.send({ accessToken });
  } catch (err) {
    console.error(err);
  }
});
