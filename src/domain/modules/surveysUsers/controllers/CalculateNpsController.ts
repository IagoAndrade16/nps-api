import { Request, Response } from "express";
import { container } from "tsyringe";
import { CalculateNpsUseCase } from "../useCases/CalculateNpsUseCase";

export class CalculateNpsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { survey_id } = req.params;

    const calculateNpsUseCase = container.resolve(CalculateNpsUseCase);

    const nps = await calculateNpsUseCase.execute({
      survey_id
    });

    return res.status(200).json({
      result: "SUCCESS",
      message: "NPS_CALCULATED",
      data: nps
    })    
  }
}