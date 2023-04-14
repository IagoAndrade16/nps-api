import { inject, injectable } from "tsyringe";
import { SurveysUsersRepository, surveysUsersRepositoryAlias } from "../repositories/SurveysUsersRepository";
import { SurveyUser } from "../entities/SurveyUser";
import { usersRepositoryAlias } from "../../users/repositories/implementations/UsersRepositoryImpl";
import { UsersRepository } from "../../users/repositories/UsersRepository";
import { SurveysRepository, surveysRepositoryAlias } from "../../surveys/repositories/SurveysRepository";
import { AppError } from "../../../../infra/errors/AppError";
import { resolve } from "path";
import SendMailService from "../../../services/SendMailService";

type CreateSurveyUserUseCaseInput = {
  email: string;
  survey_id: string;
}

@injectable()
export class CreateSurveyUserUseCase {
  constructor(
    @inject(surveysUsersRepositoryAlias)
    private surveysUsersRepository: SurveysUsersRepository,

    @inject(usersRepositoryAlias)
    private usersRepository: UsersRepository,

    @inject(surveysRepositoryAlias)
    private surveysRepository: SurveysRepository
  ){}

  async execute({ email, survey_id }: CreateSurveyUserUseCaseInput): Promise<SurveyUser> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    const survey = await this.surveysRepository.findById(survey_id);

    if(!survey) {
      throw new AppError("SURVEY_NOT_FOUND");
    }

    const npsPath = resolve(__dirname, "..", "..", "..", "templates", "emails", "npsMail.hbs"); // get path

    const surveyUserAlreadyExists = await this.surveysUsersRepository.findByUserId(user.id);

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    if(surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return surveyUserAlreadyExists;
    }

    const surveyUser = await this.surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath)

    return surveyUser;
  }
}