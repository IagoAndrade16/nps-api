import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../../../../../infra/app";
import { config } from "dotenv";

config();

const route = '/surveys';

describe("Create survey", () => {
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
    it("should not be able create survey if !title | !description", async () => {
      const res = await request(app).post(route)
      .send({
        title: "Iago"
      })
  
      expect(res.status).toBe(500)
      expect(res.body.message).toBe("Internal server error: description is a required field");
    })
  })

  it("should be able to create a new survey", async () => {
    const res = await request(app).post(route)
    .send({
      title: "titulo",
      description: "descrição"
    })

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("SURVEY_CREATED");
    expect(res.body.data).toHaveProperty("id");
  })
})