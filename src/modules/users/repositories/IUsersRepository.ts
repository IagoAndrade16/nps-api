import { User } from "../../../models/User"
import { CreateUserInput } from "../createUser/CreateUserUseCase"

export interface IUsersRepository {
  create(data: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>
}