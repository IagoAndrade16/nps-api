import { EntityRepository, Repository, getRepository } from "typeorm";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { CreateUserInput } from "../../useCases/CreateUserUseCase";
import { singleton } from "tsyringe";

export class UsersRepository implements IUsersRepository {
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

export const userRepositoryAlias = "UsersRepository"