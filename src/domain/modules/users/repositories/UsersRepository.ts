import { User } from "../entities/User"
import { CreateUserInput } from "../useCases/CreateUserUseCase"

export interface UsersRepository {
  create(data: CreateUserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>
}