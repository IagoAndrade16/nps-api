import { inject, injectable } from "tsyringe";
import { Survey } from "../entities/Surveys";
import { SurveysRepository, surveysRepositoryAlias } from "../repositories/SurveysRepository";

export type CreateSurveyInput = {
  title: string;
  description: string;
}

@injectable()
export class CreateSurveyUseCase {
  constructor (
    @inject(surveysRepositoryAlias)
    private surveysRepository: SurveysRepository
  ) {}

  async execute(data: CreateSurveyInput): Promise<Survey> {
    const survey = await this.surveysRepository.create(data);

    return survey;
  }
}