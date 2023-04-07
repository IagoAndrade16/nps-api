import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const usersRoutes = Router();
const usersController = new UserController();

usersRoutes.post("/", usersController.create)