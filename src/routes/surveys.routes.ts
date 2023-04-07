import { Router } from "express";
import { SurveysController } from "../controllers/SurveysController";

export const surveysRouter = Router()

const surveysController = new SurveysController();

surveysRouter.post("/", surveysController.create)
surveysRouter.get("/", surveysController.show)