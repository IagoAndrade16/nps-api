import "reflect-metadata"
import express from 'express'
import createConnection from "./database"
import { router } from "./routes/routes"
import * as dotenv from "dotenv";

dotenv.config()

createConnection()

export const app = express()

app.use(express.json())

app.use(router)