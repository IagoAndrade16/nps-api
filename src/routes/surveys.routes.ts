import { Router } from "express";
import { SurveysController } from "../controllers/SurveysController";

export const surveysRouter = Router()

const surveyController = new SurveysController();

surveysRouter.post("/", surveyController.create)
surveysRouter.get("/", surveyController.show)