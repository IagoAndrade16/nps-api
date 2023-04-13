import { Router } from "express";
import { CreateSurveyController } from "../modules/surveys/controllers/CreateSurveyController";
import { SendEmailController } from "../controllers/SendEmailController";
import { AnswerController } from "../controllers/AnswerController";
import { NpsController } from "../controllers/NpsController";

export const surveysRouter = Router();

const createSurveyController = new CreateSurveyController();
const surveysUsersController = new SendEmailController();
const answerController = new AnswerController();
const npsController = new NpsController();

surveysRouter.post("/", createSurveyController.handle);
// surveysRouter.get("/", surveysController.show);
surveysRouter.post("/send-mail", surveysUsersController.execute);
surveysRouter.get("/answers/:value", answerController.execute);
surveysRouter.get("/nps/:survey_id", npsController.execute);