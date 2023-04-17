import { Repository, getRepository } from "typeorm";
import { SurveyUser } from "../../entities/SurveyUser";
import { CreateSurveyUserInput, SurveysUsersRepository } from "../SurveysUsersRepository";

export class SurveysUsersRepositoryImpl implements SurveysUsersRepository {
  private readonly repository: Repository<SurveyUser>

  constructor() {
    this.repository = getRepository(SurveyUser)
  }

  async create(data: CreateSurveyUserInput): Promise<SurveyUser> {
    const surveyUser = this.repository.create(data);

    await this.repository.save(surveyUser);

    return surveyUser;
  }
  async findByUserId(user_id: string): Promise<SurveyUser> {
    const survey_user = await this.repository.findOne({
      where: { user_id,  value: null },
      relations: ["user", "survey"]
    })

    return survey_user;
  }

  async findBySurveyId(id: string): Promise<SurveyUser> {
    const survey_user = await this.repository.findOne({
      where: { id,  value: null }
    })

    return survey_user;
  }

  async  findAllSurveysById(id: string): Promise<SurveyUser[]> {
    const surveysUsers = await this.repository.find({
      survey_id: id
    })

    return surveysUsers;
  }
}