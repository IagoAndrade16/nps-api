import { createConnection, getConnection } from "typeorm";
import { AppError } from "../../../../../infra/errors/AppError";
import { SurveysRepositoryImpl } from "../../repositories/implementations/SurveysRepositoryImpl";
import { CreateSurveyUseCase } from "../CreateSurveyUseCase";

let surveysRepo: SurveysRepositoryImpl;
let createSurveyUseCase: CreateSurveyUseCase;

const mockedSurvey = {
  title: "titulo",
  description: "descrição"
}

describe("Create survey usecases", () => {
  beforeEach(async () => {
    surveysRepo = new SurveysRepositoryImpl();
    createSurveyUseCase = new CreateSurveyUseCase(surveysRepo);
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

  it("should be able to create a new survey", async () => {
    const survey = await createSurveyUseCase.execute(mockedSurvey);
    
    expect(survey).toHaveProperty("id")
    expect(survey.title).toEqual("titulo")
  })
})