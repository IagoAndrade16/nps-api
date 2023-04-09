import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";

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

    const survey = await surveysRepository.findOne({
      where: {
        id: survey_id
      }
    })

    if(!survey) {
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

    await SendMailService.execute(email, survey.title, survey.description)

    return res.send(surveyUser)
  } 
}