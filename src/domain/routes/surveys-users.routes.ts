import { Router } from "express";
import { CreateSurveyUserController } from "../modules/surveysUsers/controllers/CreateSurveyUserController";
import { CalculateNpsController } from "../modules/surveysUsers/controllers/CalculateNpsController";


export const surveysUsersRouter = Router();

const surveysUsersController = new CreateSurveyUserController();
const calculateNpsController = new CalculateNpsController();

surveysUsersRouter.post("/send-mail", surveysUsersController.handle);
surveysUsersRouter.get("/nps/:survey_id", calculateNpsController.handle);