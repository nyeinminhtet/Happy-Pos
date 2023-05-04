import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";

export const menuRouter = express.Router();

//create a menu
menuRouter.post("/", checkAuth, async (req: Request, res: Response) => {
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
