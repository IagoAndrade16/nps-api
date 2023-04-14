import { inject, injectable } from "tsyringe";
import { SurveysRepository, surveysRepositoryAlias } from "../repositories/SurveysRepository";
import { Survey } from "../entities/Surveys";

@injectable()
export class ListAllSurveysUseCase {
  constructor(
    @inject(surveysRepositoryAlias)
    private surveysRepository: SurveysRepository
  ) {}

  async execute(): Promise<Survey[]> {
    const surveys = await this.surveysRepository.listAllSurveys();

    return surveys;

  }
}