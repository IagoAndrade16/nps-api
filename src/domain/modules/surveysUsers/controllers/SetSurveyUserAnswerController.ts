import { Request, Response } from "express";
import { container } from "tsyringe";
import { SetSurveyUserAnswerUseCase } from "../useCases/SetSurveyUserAnswerUseCase";

export class SetSurveyUserAnswerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { value } = req.params;
    const { id } = req.query;

    const setSurveyUserAnswerUseCase = container.resolve(SetSurveyUserAnswerUseCase)

    const surveyUser = await setSurveyUserAnswerUseCase.execute({ value, id: String(id) })

    return res.status(200).json(surveyUser);
  }
}