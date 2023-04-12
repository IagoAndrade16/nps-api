import { container } from "tsyringe";
import { UsersRepository, userRepositoryAlias } from "../modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);