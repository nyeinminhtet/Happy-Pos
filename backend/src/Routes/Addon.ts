import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";

export const addons = express.Router();

//create addons

addons.post("/", checkAuth, async (req: Request, res: Response) => {
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
