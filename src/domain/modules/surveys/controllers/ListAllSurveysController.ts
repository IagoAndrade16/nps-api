import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllSurveysUseCase } from "../useCases/ListAllSurveysUseCase";

export class ListAllSurveysController {
  async handle(_req: Request, res: Response): Promise<Response> {
    const listAllSurveysUseCase = container.resolve(ListAllSurveysUseCase);

    const surveys = await listAllSurveysUseCase.execute();

    return res.status(200).json({
      result: "SUCESS",
      message: "SUCCESS",
      data: surveys
    })
  }
}