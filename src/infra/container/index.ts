import { container } from "tsyringe";
import { UsersRepository, userRepositoryAlias } from "../../domain/modules/users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../domain/modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);