import { Request, Response } from "express";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { getCustomRepository } from "typeorm";
import { AppError } from "../../infra/errors/AppError";

export class AnswerController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    })

    if(!surveyUser) {
      throw new AppError("SURVEY_USER_NOT_FOUND");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);
    return res.status(200).json(surveyUser);
  }
}