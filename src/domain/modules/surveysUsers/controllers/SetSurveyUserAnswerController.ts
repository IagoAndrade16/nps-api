import { Request, Response } from "express";
import { SurveysUsersRepository, surveysUsersRepositoryAlias } from "../repositories/SurveysUsersRepository";
import { AppError } from "../../../../infra/errors/AppError";
import { container, inject } from "tsyringe";
import { SetSurveyUserAnswerUseCase } from "../useCases/SetSurveyUserAnswerUseCase";

export class SetSurveyUserAnswerController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { value } = req.params;
    const { id } = req.query;

    const setSurveyUserAnswerUseCase = container.resolve(SetSurveyUserAnswerUseCase)

    const surveyUser = await setSurveyUserAnswerUseCase.execute({ value, id: String(id) })

    return res.status(200).json(surveyUser);
  }
}