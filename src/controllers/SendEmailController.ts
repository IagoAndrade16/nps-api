import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
import { AppError } from "../errors/AppError";

export class SendEmailController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const user = await usersRepository.findOne({email});

    if(!user) {
      throw new AppError("USER_NOT_FOUND");
    }

    const survey = await surveysRepository.findOne({
      where: {
        id: survey_id
      }
    })

    if(!survey) {
      throw new AppError("SURVEY_NOT_FOUND");
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); // get path

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id,  value: null },
      relations: ["user", "survey"]
    })

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: surveyUserAlreadyExists.id ?? "",
      link: process.env.URL_MAIL
    }

    if(surveyUserAlreadyExists) {
      await SendMailService.execute(email, survey.title, variables, npsPath)
      return res.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath)

    return res.send(surveyUser)
  } 
}