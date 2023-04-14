import { Router } from "express";
import { CreateSurveyController } from "../modules/surveys/controllers/CreateSurveyController";
import { CreateSurveyUserController } from "../modules/surveysUsers/controllers/CreateSurveyUserController";
import { AnswerController } from "../controllers/AnswerController";
import { NpsController } from "../controllers/NpsController";
import { ListAllSurveysController } from "../modules/surveys/controllers/ListAllSurveysController";

export const surveysRouter = Router();

const createSurveyController = new CreateSurveyController();
const listAllSurveysController = new ListAllSurveysController();
const surveysUsersController = new CreateSurveyUserController();
const answerController = new AnswerController();
const npsController = new NpsController();

surveysRouter.post("/", createSurveyController.handle);
surveysRouter.get("/", listAllSurveysController.handle);
surveysRouter.post("/send-mail", surveysUsersController.execute);
surveysRouter.get("/answers/:value", answerController.execute);
surveysRouter.get("/nps/:survey_id", npsController.execute);