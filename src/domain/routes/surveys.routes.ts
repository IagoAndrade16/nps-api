import { Router } from "express";
import { SurveysController } from "../controllers/SurveysController";
import { SendEmailController } from "../controllers/SendEmailController";
import { AnswerController } from "../controllers/AnswerController";
import { NpsController } from "../controllers/NpsController";

export const surveysRouter = Router();

const surveysController = new SurveysController();
const surveysUsersController = new SendEmailController();
const answerController = new AnswerController();
const npsController = new NpsController();

surveysRouter.post("/", surveysController.create);
surveysRouter.get("/", surveysController.show);
surveysRouter.post("/send-mail", surveysUsersController.execute);
surveysRouter.get("/answers/:value", answerController.execute);
surveysRouter.get("/nps/:survey_id", npsController.execute);