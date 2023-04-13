import { Repository, getRepository } from "typeorm";
import { User } from "../../entities/User";
import { UsersRepository } from "../UsersRepository";
import { CreateUserInput } from "../../useCases/CreateUserUseCase";

export class UsersRepositoryImpl implements UsersRepository {
  private repository: Repository<User>;
  
  constructor() {
    this.repository = getRepository(User);
  }
  
  async create({ name, email }: CreateUserInput): Promise<User> {
    const user = this.repository.create({
      name, 
      email
    })

    await this.repository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email
      }
    })

    return user
  }
  
}

export const usersRepositoryAlias = "UsersRepository"