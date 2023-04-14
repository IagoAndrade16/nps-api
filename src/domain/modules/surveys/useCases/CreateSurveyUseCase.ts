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

  async execute({ title, description }: CreateSurveyInput): Promise<Survey> {
    const survey = await this.surveysRepository.create({ title, description });

    return survey;
  }
}