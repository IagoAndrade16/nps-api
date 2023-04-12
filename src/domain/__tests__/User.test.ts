import request from "supertest";
import { app } from "../../infra/app";
import createConnection from "../../database";
import { getConnection } from "typeorm";

describe("User", () => {
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
    const res = await request(app).post("/users")
    .send({
      name: "Iago",
      email: "useadasdasd@example.com"
    })

    expect(res.status).toBe(201)
  })

  it("should not be able to create a new user if email exists", async () => {
    const res = await request(app).post("/users")
    .send({
      name: "Iago",
      email: "useadasdasd@example.com"
    })

    expect(res.status).toBe(400)
  })
})