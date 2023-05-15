import express, { Request, Response } from "express";
import { checkAuth } from "../Auth/auth";
import { pool } from "../../db/db";

export const locationRouter = express.Router();

locationRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, address } = req.body;
  if (!name || !address) return res.sendStatus(400);
  const newLocation = await pool.query(
    `insert into locations (name,address) values($1,$2) returning *`,
    [name, address]
  );
  res.send(newLocation.rows);
});

locationRouter.put(
  "/:locationId",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    const { name, address } = req.body;
    if (!locationId || !name || !address) return res.sendStatus(400);
    const locationResult = await pool.query(
      "update locations set name=$1 ,address=$2 where id=$3",
      [name, address, locationId]
    );
    res.send(locationResult.rows[0]);
  }
);
