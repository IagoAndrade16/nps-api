import { createConnection, getConnection } from "typeorm";
import { AppError } from "../../../../../infra/errors/AppError";
import { SurveysRepositoryImpl } from "../../repositories/implementations/SurveysRepositoryImpl";
import { CreateSurveyUseCase } from "../CreateSurveyUseCase";
import { ListAllSurveysUseCase } from "../ListAllSurveysUseCase";

let surveysRepo: SurveysRepositoryImpl;
let createSurveyUseCase: CreateSurveyUseCase;
let listAllSurveysUseCase: ListAllSurveysUseCase;


const mockedSurvey = {
  title: "titulo",
  description: "descrição"
}

describe("Create survey usecases", () => {
  beforeEach(async () => {
    surveysRepo = new SurveysRepositoryImpl();
    listAllSurveysUseCase = new ListAllSurveysUseCase(surveysRepo);
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

  it("should return an array with all surveys registereds", async () => {
    await createSurveyUseCase.execute(mockedSurvey);
    await createSurveyUseCase.execute(mockedSurvey);

    const listOfSurveys = await listAllSurveysUseCase.execute();
    
    expect(listOfSurveys).toHaveLength(2);
    expect(listOfSurveys[0].title).toBe("titulo");
  })
})