import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

//@ts-ignore
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const acessToken = authHeader && authHeader.split(" ")[1];
  if (!acessToken) return res.sendStatus(401);
  try {
    jwt.verify(acessToken, config.jwtSecret);
    console.log("accesstoken");
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
