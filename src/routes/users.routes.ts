import { Router } from "express";
import { CreateUserController } from "../modules/users/createUser/CreateUserController";
import { CreateUserUseCase } from "../modules/users/createUser/CreateUserUseCase";

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle)