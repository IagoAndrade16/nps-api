import { Router } from "express";
import { CreateSurveyController } from "../modules/surveys/controllers/CreateSurveyController";
import { SetSurveyUserAnswerController } from "../modules/surveysUsers/controllers/SetSurveyUserAnswerController";
import { ListAllSurveysController } from "../modules/surveys/controllers/ListAllSurveysController";

export const surveysRouter = Router();

const createSurveyController = new CreateSurveyController();
const listAllSurveysController = new ListAllSurveysController();
const answerController = new SetSurveyUserAnswerController();

surveysRouter.post("/", createSurveyController.handle);
surveysRouter.get("/", listAllSurveysController.handle);
surveysRouter.get("/answers/:value", answerController.handle);