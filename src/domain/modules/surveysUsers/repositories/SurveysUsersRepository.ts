import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../entities/SurveyUser";

export type CreateSurveyUserInput = {
  user_id: string;
  survey_id: string;
}

export type SetSurveyUserAnswerInput = {
  value: string;
  id: string;
}
export interface SurveysUsersRepository {
  create(data: CreateSurveyUserInput): Promise<SurveyUser>;
  findByUserId(user_id: string): Promise<SurveyUser>;
  findBySurveyId(id: string): Promise<SurveyUser>;
}

export const surveysUsersRepositoryAlias = "SurveysUsersRepository";