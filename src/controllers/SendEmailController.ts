import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

export class SendEmailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const userExists = await usersRepository.findOne({email});

    if(!userExists) {
      return res.status(400).json({
        status: "ERROR",
        message: "USER_NOT_FOUND"
      })
    }

    const surveyExists = await surveysRepository.findOne({
      where: {
        id: survey_id
      }
    })

    if(!surveyExists) {
      return res.status(400).json({
        status: "ERROR",
        message: "SURVEY_NOT_FOUND"
      })
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userExists.id,
      survey_id
    })

    await surveysUsersRepository.save(surveyUser);

    return res.send(surveyUser)
  } 
}