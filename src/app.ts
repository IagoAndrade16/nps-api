import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import createConnection from "./database"
import { router } from "./routes/routes"
import * as dotenv from "dotenv";
import { AppError } from "./errors/AppError";
import "./container"

dotenv.config()
createConnection()

export const app = express()

app.use(express.json())
app.use(router)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "ERROR",
      message: err.message
    })
  } 
  return res.status(500).json({
    status: "ERROR",
    message: `Internal server error: ${err.message}`
  })
})