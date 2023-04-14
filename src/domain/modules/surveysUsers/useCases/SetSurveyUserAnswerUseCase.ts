import { inject, injectable } from "tsyringe";
import { SetSurveyUserAnswerInput, SurveysUsersRepository, surveysUsersRepositoryAlias } from "../repositories/SurveysUsersRepository";
import { SurveyUser } from "../entities/SurveyUser";
import { AppError } from "../../../../infra/errors/AppError";

@injectable()
export class SetSurveyUserAnswerUseCase {
  constructor(
    @inject(surveysUsersRepositoryAlias)
    private readonly surveysUsersRepository: SurveysUsersRepository
  ) {}

  async execute(data: SetSurveyUserAnswerInput): Promise<SurveyUser> {
    const surveyUser = await this.surveysUsersRepository.findBySurveyId(data.id)

    if(!surveyUser) {
      throw new AppError("SURVEY_USER_NOT_FOUND");
    }

    surveyUser.value = Number(data.value);

    await this.surveysUsersRepository.create(surveyUser);

    return surveyUser;
  }
}