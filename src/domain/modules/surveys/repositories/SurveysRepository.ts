import { Survey } from "../entities/Surveys";
import { CreateSurveyInput } from "../useCases/CreateSurveyUseCase";

export interface SurveysRepository {
  create(data: CreateSurveyInput): Promise<Survey>;
  listAllSurveys(): Promise<Survey[]>;
  findById(survey_id: string): Promise<Survey>;
}

export const  surveysRepositoryAlias = "SurveysRepository";