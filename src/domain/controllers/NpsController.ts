import { Request, Response } from "express";
import { IsNull, Not, getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../modules/surveysUsers/repositories/SurveysUsersRepository";

export class NpsController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { survey_id } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractors = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6);

    const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10);

    const passive = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8);

    const totalAnswers = surveysUsers.length;

    const calculate = (((promoters.length - detractors.length) / totalAnswers) * 100).toFixed(2);
    
    return res.status(200).json({
      detractors: detractors.length,
      promoters: promoters.length,
      passive: passive.length,
      totalAnswers,
      nps: calculate
    });
  }
}