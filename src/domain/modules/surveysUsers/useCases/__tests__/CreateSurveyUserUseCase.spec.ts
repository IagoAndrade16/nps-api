import { createConnection, getConnection } from "typeorm";
import { SurveysUsersRepositoryImpl } from "../../repositories/implementations/SurveysUsersRepositoryImpl";
import { CalculateNpsUseCase } from "../CalculateNpsUseCase";
import { CreateSurveyUseCase } from "../../../surveys/useCases/CreateSurveyUseCase";
import { SurveysRepositoryImpl } from "../../../surveys/repositories/implementations/SurveysRepositoryImpl";
import { UsersRepositoryImpl } from "../../../users/repositories/implementations/UsersRepositoryImpl";
import { CreateUserUseCase } from "../../../users/useCases/CreateUserUseCase";
import { CreateSurveyUserUseCase } from "../CreateSurveyUserUseCase";
import { AppError } from "../../../../../infra/errors/AppError";

let surveysUsersRepo: SurveysUsersRepositoryImpl;
let surveysRepo: SurveysRepositoryImpl;
let usersRepo: UsersRepositoryImpl;
let createSurveyUserUseCase: CreateSurveyUserUseCase;
let createSurveyUseCase: CreateSurveyUseCase;
let createUserUseCase: CreateUserUseCase;


describe("Create survey user", () => {
  beforeEach(async () => {
    surveysUsersRepo = new SurveysUsersRepositoryImpl();
    surveysRepo = new SurveysRepositoryImpl();
    usersRepo = new UsersRepositoryImpl();
    createSurveyUserUseCase = new CreateSurveyUserUseCase(surveysUsersRepo, usersRepo, surveysRepo);
    createSurveyUseCase = new CreateSurveyUseCase(surveysRepo);
    createUserUseCase = new CreateUserUseCase(usersRepo);
  })

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it("should return USER_NOT_FOUND if !user", async () => {
    const survey = await createSurveyUseCase.execute({
      title: "pesquisa",
      description: "descrição da pesquisa"
    });

    await expect(createSurveyUserUseCase.execute({
      survey_id: survey.id,
      email: "iago@gmail.com"
    })).rejects.toMatchObject(new AppError("USER_NOT_FOUND"));
  })

  it("should return SURVEY_NOT_FOUND if !survey", async () => {
    const user = await createUserUseCase.execute({
      name: "iago",
      email: "iago@gmail.com"
    });

    await expect(createSurveyUserUseCase.execute({
      survey_id: "123",
      email: user.email
    })).rejects.toMatchObject(new AppError("SURVEY_NOT_FOUND"));
  })
})