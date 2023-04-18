import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSurveyUseCase } from "../useCases/CreateSurveyUseCase";
import * as yup from "yup";

const bodySchema = yup.object().shape({
  title: yup.string().required("title is a required field"),
  description: yup.string().required()
})
export class CreateSurveyController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { title, description } = await bodySchema.validate(req.body, { abortEarly: false })
    
    const createSurveyUseCase = container.resolve(CreateSurveyUseCase);

    const survey = await createSurveyUseCase.execute({
      title, 
      description
    })

    return res.status(201).json({
      result: "SUCCESS",
      message: "SURVEY_CREATED",
      data: survey
    });
  }
}