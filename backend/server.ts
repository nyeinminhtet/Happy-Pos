import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { pool } from "./db/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./src/config/config";
import { checkAuth } from "./src/config/Auth/auth";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//get all data
app.get("/data", checkAuth, async (req: Request, res: Response) => {
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

//create a menu
app.post("/menus", checkAuth, async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    if (!name && !price) return res.send("Please Fill all Requirements");
    const text = "INSERT INTO menus(name, price) VALUES($1, $2) RETURNING *";
    const values = [name, price];
    const { rows } = await pool.query(text, values);
    res.send(rows);
  } catch (err) {
    console.error(err);
  }
});

//update menu

app.put("/menus/:menuId", checkAuth, async (req: Request, res: Response) => {
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

//create a menuCategory
app.post("/menu_categories", checkAuth, async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const text =
      "INSERT INTO menu_categories (category) VALUES($1) RETURNING *";
    const values = [category];
    const { rows } = await pool.query(text, values);
    res.send(rows);
  } catch (err) {
    console.error(err);
  }
});

//update category

app.put(
  "/menu_categories/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.send("pls provide category-id");
      const { category } = req.body;
      const text =
        "UPDATE menu_categories SET category=$1 WHERE id = $2 RETURNING *";
      const values = [category, id];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } catch (err) {
      console.error(err);
    }
  }
);

//delete category
app.delete(
  "/menu_categories/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const menuId = req.params.id;
      if (!menuId) return res.send("Menu id is required.");
      const text = "DELETE FROM menu_categories WHERE id =($1) RETURNING *";
      const values = [menuId];
      const { rows } = await pool.query(text, values);
      res.send({ rows });
    } catch (err) {
      console.log(err);
    }
  }
);

//creat addonCat

app.post(
  "/addon_categories",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      const { category_of_addon } = req.body;
      if (!category_of_addon) return res.send("pls enter ");
      const text =
        "INSERT INTO addon_categories(category_of_addon) VALUES($1) RETURNING *";
      const values = [category_of_addon];
      const { rows } = await pool.query(text, values);
      res.send(rows);
    } catch (err) {
      console.error(err);
    }
  }
);

//create addons

app.post("/addons", checkAuth, async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const text = "INSERT INTO addons (name,price) VALUES($1,$2) RETURNING *";
    const values = [name, price];
    const { rows } = await pool.query(text, values);
    res.send(rows);
  } catch (err) {
    console.error(err);
  }
});

//auth
app.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "insert into users (name, email, password) values($1, $2, $3) returning *",
      [name, email, hashedPassword]
    );
    res.send(newUser.rows);
  } catch (err) {
    console.error(err);
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log("server is listening:", port);
});
