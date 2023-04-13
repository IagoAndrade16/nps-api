import { container } from "tsyringe";
import { UsersRepositoryImpl, usersRepositoryAlias } from "../../domain/modules/users/repositories/implementations/UsersRepositoryImpl";
import { UsersRepository } from "../../domain/modules/users/repositories/UsersRepository";
import { SurveysRepository, surveysRepositoryAlias } from "../../domain/modules/surveys/repositories/SurveysRepository";
import { SurveysRepositoryImpl } from "../../domain/modules/surveys/repositories/implementations/SurveysRepositoryImpl";

container.registerSingleton<UsersRepository>(
  usersRepositoryAlias,
  UsersRepositoryImpl
);

container.registerSingleton<SurveysRepository>(
  surveysRepositoryAlias,
  SurveysRepositoryImpl
);