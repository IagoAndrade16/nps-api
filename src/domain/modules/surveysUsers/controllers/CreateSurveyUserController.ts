import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSurveyUserUseCase } from "../useCases/CreateSurveyUserUseCase";

export class CreateSurveyUserController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body;

    const createSurveyUserUseCase = container.resolve(CreateSurveyUserUseCase);

    const surveyUser = await createSurveyUserUseCase.execute({ email, survey_id })

    return res.status(201).json({
      result: "SUCCESS",
      message: "EMAIL_SENDED",
      data: surveyUser
    })
  } 
}