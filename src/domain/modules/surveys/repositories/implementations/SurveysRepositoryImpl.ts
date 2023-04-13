import { Repository, getRepository } from "typeorm";
import { Survey } from "../../entities/Surveys";
import { CreateSurveyInput } from "../../useCases/CreateSurveyUseCase";
import { SurveysRepository } from "../SurveysRepository";

export class SurveysRepositoryImpl implements SurveysRepository {
  private repository: Repository<Survey>

  constructor() {
    this.repository = getRepository(Survey);
  }
  
  async create(data: CreateSurveyInput): Promise<Survey> {
    const survey = this.repository.create(data)

    await this.repository.save(survey)

    return survey;
  }
  async listAllSurveys(): Promise<Survey[]> {
    const listOfAllSurveys = await this.repository.find();

    return listOfAllSurveys;
  }

}