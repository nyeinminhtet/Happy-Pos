import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../db/db";

export const settingRouter = express.Router();

settingRouter.put(
  "/companies/:companyId",
  checkAuth,
  async (req: Request, res: Response) => {
    const companyId = req.params.companyId;
    console.log("companyId", companyId);
    const { name, address } = req.body;
    if (!companyId || !name || !address)
      return console.log("you have an error 400");
    const companyResult = await pool.query(
      "update companies set name=$1, address=$2 where id=$3",
      [name, address, companyId]
    );
    res.send(companyResult.rows[0]);
  }
);
