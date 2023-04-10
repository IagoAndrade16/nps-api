import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";

export class SendEmailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const user = await usersRepository.findOne({email});

    if(!user) {
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

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); // get path

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{ user_id: user.id}, { value: null }],
      relations: ["user", "survey"]
    })

    if(surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return res.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUsersRepository.save(surveyUser);

    await SendMailService.execute(email, survey.title, variables, npsPath)

    return res.send(surveyUser)
  } 
}