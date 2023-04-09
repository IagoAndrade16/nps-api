import { Router } from "express";
import { SurveysController } from "../controllers/SurveysController";
import { SendEmailController } from "../controllers/SendEmailController";

export const surveysRouter = Router()

const surveysController = new SurveysController();
const surveysUsersController = new SendEmailController();

surveysRouter.post("/", surveysController.create)
surveysRouter.get("/", surveysController.show)
surveysRouter.post("/send-mail", surveysUsersController.execute)