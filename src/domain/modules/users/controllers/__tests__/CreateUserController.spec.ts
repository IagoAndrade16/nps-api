import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../../../../../infra/app";

const route = '/users';

describe("Create User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  describe("Schema validation", () => {
    it("should not be able create user if !email | !name", async () => {
      const res = await request(app).post(route)
      .send({
        name: "Iago"
      })
  
      expect(res.status).toBe(500)
      expect(res.body.message).toBe("Internal server error: email is a required field");
    })
  })

  it("should be able to create a new user", async () => {
    const res = await request(app).post(route)
    .send({
      name: "Iago",
      email: "useadasdasd@example.com"
    })

    expect(res.status).toBe(201)
  })
})