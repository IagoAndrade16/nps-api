import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body

    const usersRepository = getCustomRepository(UsersRepository)

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

    return res.status(201).json(user)
  }
}