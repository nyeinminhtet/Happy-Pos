import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";

export const menuCategoriesRouter = express.Router();

//create a menuCategory
menuCategoriesRouter.post(
  "/",
  checkAuth,
  async (req: Request, res: Response) => {
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
  }
);

//update category

menuCategoriesRouter.put(
  "/:id",
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
menuCategoriesRouter.delete(
  "/:id",
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
