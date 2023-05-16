import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../db/db";

export const addonCategoriesRouter = express.Router();

//creat addonCat

addonCategoriesRouter.post(
  "/",
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
