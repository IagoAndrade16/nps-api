import { Router } from "express";
import { CreateSurveyController } from "../modules/surveys/controllers/CreateSurveyController";
import { SetSurveyUserAnswerController } from "../modules/surveysUsers/controllers/SetSurveyUserAnswerController";
import { NpsController } from "../controllers/NpsController";
import { ListAllSurveysController } from "../modules/surveys/controllers/ListAllSurveysController";

export const surveysRouter = Router();

const createSurveyController = new CreateSurveyController();
const listAllSurveysController = new ListAllSurveysController();
const answerController = new SetSurveyUserAnswerController();
const npsController = new NpsController();

surveysRouter.post("/", createSurveyController.handle);
surveysRouter.get("/", listAllSurveysController.handle);
surveysRouter.get("/answers/:value", answerController.execute);
surveysRouter.get("/nps/:survey_id", npsController.execute);