import { inject, injectable } from "tsyringe";
import { IsNull, Not } from "typeorm";
import { SurveysUsersRepository, surveysUsersRepositoryAlias } from "../repositories/SurveysUsersRepository";

export type CalculateNpsInput = {
  survey_id: string;
}

export type CalculateNpsOutput = {
  detractors: number,
  promoters: number,
  passive: number,
  totalAnswers: number,
  nps: string
}

@injectable()
export class CalculateNpsUseCase {
  constructor(
    @inject(surveysUsersRepositoryAlias)
    private readonly surveysUsersRepository: SurveysUsersRepository
  ) {}
  async execute({ survey_id }: CalculateNpsInput): Promise<CalculateNpsOutput> {

    const surveysUsers = await this.surveysUsersRepository.findAllSurveysById(survey_id);

    const detractors = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6);

    const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10);

    const passive = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8);

    const totalAnswers = surveysUsers.length;

    const calculate = (((promoters.length - detractors.length) / totalAnswers) * 100).toFixed(2);
    
    return {
      detractors: detractors.length,
      promoters: promoters.length,
      passive: passive.length,
      totalAnswers,
      nps: calculate
    };
  }
}