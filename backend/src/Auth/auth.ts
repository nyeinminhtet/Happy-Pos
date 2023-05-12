import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

//@ts-ignore
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const acessToken = authHeader && authHeader.split(" ")[1];
  if (!acessToken) return res.sendStatus(401);
  try {
    const user = jwt.verify(acessToken, config.jwtSecret);
    //@ts-ignore
    req["email"] = user.email;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
