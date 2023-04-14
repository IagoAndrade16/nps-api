import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSurveyUseCase } from "../useCases/CreateSurveyUseCase";

export class CreateSurveyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const createSurveyUseCase = container.resolve(CreateSurveyUseCase);

    const survey = await createSurveyUseCase.execute(data)

    return res.status(201).json({
      result: "SUCCESS",
      message: "SURVEY_CREATED",
      data: survey
    });
  }
}