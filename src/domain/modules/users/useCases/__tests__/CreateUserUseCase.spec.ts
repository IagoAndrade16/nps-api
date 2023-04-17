import { createConnection, getConnection } from "typeorm";
import { CreateUserUseCase } from "../CreateUserUseCase";
import { UsersRepositoryImpl } from "../../repositories/implementations/UsersRepositoryImpl";
import { AppError } from "../../../../../infra/errors/AppError";

let usersRepo: UsersRepositoryImpl;
let createUserUseCase: CreateUserUseCase;

const mockedUser = {
  name: "Iago",
  email: "iagoaap@gmail.com"
}

describe("Create user usecases", () => {
  beforeEach(async () => {
    usersRepo = new UsersRepositoryImpl();
    createUserUseCase = new CreateUserUseCase(usersRepo);
  })
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute(mockedUser);
    
    expect(user).toHaveProperty("id")
    expect(user.name).toEqual("Iago")
  })

  it("should return USER_ALREADY_EXISTS if user already exists", async() => {
    jest.spyOn(usersRepo, 'create').mockResolvedValue({
      id: "123",
      created_at: new Date(),
      ...mockedUser
    })

    await expect(createUserUseCase.execute(mockedUser))
    .rejects.toMatchObject(new AppError("USER_ALREADY_EXISTS"));
  })
})