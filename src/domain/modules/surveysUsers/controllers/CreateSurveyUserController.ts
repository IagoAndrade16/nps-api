import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSurveyUserUseCase } from "../useCases/CreateSurveyUserUseCase";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  email: yup.string().required().max(255),
  survey_id: yup.string().required().max(255)
})

export class CreateSurveyUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const body = await bodySchema.validate(req.body, { abortEarly: false })

    const { email, survey_id } = body;

    const createSurveyUserUseCase = container.resolve(CreateSurveyUserUseCase);

    const surveyUser = await createSurveyUserUseCase.execute({ email, survey_id })

    return res.status(201).json({
      result: "SUCCESS",
      message: "EMAIL_SENDED",
      data: surveyUser
    })
  } 
}