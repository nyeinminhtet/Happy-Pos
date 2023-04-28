import express, { Request, Response } from "express";
import cors from "cors";
import pg from "pg";
import { pool } from "./db/db";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//get all data
app.get("/data", async (req: Request, res: Response) => {
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
app.post("/menus", async (req: Request, res: Response) => {
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

app.put("/menus/:menuId", async (req: Request, res: Response) => {
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
app.post("/menu_categories", async (req: Request, res: Response) => {
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

app.put("/menu_categories/:id", async (req: Request, res: Response) => {
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
});

//delete category
app.delete("/menu_categories/:id", async (req: Request, res: Response) => {
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
});

//creat addonCat

app.post("/addon_categories", async (req: Request, res: Response) => {
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
});

//create addons

app.post("/addons", async (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log("server is listening:", port);
});