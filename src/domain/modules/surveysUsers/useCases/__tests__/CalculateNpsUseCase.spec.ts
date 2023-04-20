import { createConnection, getConnection } from "typeorm";
import { SurveysUsersRepositoryImpl } from "../../repositories/implementations/SurveysUsersRepositoryImpl";
import { CalculateNpsUseCase } from "../CalculateNpsUseCase";
import { CreateSurveyUseCase } from "../../../surveys/useCases/CreateSurveyUseCase";
import { SurveysRepositoryImpl } from "../../../surveys/repositories/implementations/SurveysRepositoryImpl";

let surveysUsersRepo: SurveysUsersRepositoryImpl;
let surveysRepo: SurveysRepositoryImpl;
let calculateNpsUseCase: CalculateNpsUseCase;
let createSurveyUseCase: CreateSurveyUseCase;

describe("Calculate NPS", () => {
  beforeEach(async () => {
    surveysUsersRepo = new SurveysUsersRepositoryImpl();
    surveysRepo = new SurveysRepositoryImpl();
    calculateNpsUseCase = new CalculateNpsUseCase(surveysUsersRepo);
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

  it("should be able calculate nps", async () => {
    const survey = await createSurveyUseCase.execute({
      title: "pesquisa",
      description: "descrição da pesquisa"
    })

    const nps = await calculateNpsUseCase.execute({ survey_id: survey.id });

    expect(nps).toMatchObject({
      detractors: 0,
      promoters: 0,
      passive: 0,
      totalAnswers: 0,
      nps: "NaN"
    })
  })
})