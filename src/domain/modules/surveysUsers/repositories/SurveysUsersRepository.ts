import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../entities/SurveyUser";

export type CreateSurveyUserInput = {
  user_id: string;
  survey_id: string;
}
export interface SurveysUsersRepository {
  create(data: CreateSurveyUserInput): Promise<SurveyUser>;
  findByUserId(user_id: string): Promise<SurveyUser>;
}

export const surveysUsersRepositoryAlias = "SurveysUsersRepository";