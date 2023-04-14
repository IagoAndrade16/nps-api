import { Router } from "express";
import { CreateSurveyUserController } from "../modules/surveysUsers/controllers/CreateSurveyUserController";


export const surveysUsersRouter = Router();

const surveysUsersController = new CreateSurveyUserController();

surveysUsersRouter.post("/send-mail", surveysUsersController.execute);
