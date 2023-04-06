import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const usersRepository = getRepository(User)

    const userAlreadyExists = await usersRepository.findOne({
      where: {
        email
      }
    })

    if(userAlreadyExists) {
      return res.status(400).json({
        message: "USER_ALREADY_EXISTS"
      })
    }

    const user = usersRepository.create({
      name, 
      email
    })

    await usersRepository.save(user)

    return res.send(user)
  }
}