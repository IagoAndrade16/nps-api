import { AppError } from "../../../../infra/errors/AppError";
import { User } from "../entities/User";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";

export type CreateUserInput = {
  name: string;
  email: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ name, email}): Promise<User> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError("USER_ALREADY_EXISTS");
    }

    const user = this.usersRepository.create({
      name, 
      email
    })

    return user
  }
}
