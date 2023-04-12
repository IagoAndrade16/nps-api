import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

export class SurveysController {
  async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const surveysRepository = getCustomRepository(SurveysRepository)

    const survey = surveysRepository.create({ title, description })

    await surveysRepository.save(survey)

    return res.status(201).json(survey);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const surveysRepository = getCustomRepository(SurveysRepository)

    const listOfAllSurveys = await surveysRepository.find();

    return res.json(listOfAllSurveys)
  }
}