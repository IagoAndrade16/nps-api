import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../../../../../infra/app";

const route = '/surveys';

describe("List all surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()

  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  it("should be able to list all surveys registereds", async () => {
    await request(app).post(route)
    .send({
      title: "titulo",
      description: "descrição"
    })

    const res = await request(app).get(route)
    .send({})

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("SUCCESS");
    expect(res.body.data).toHaveLength(1)
  })
})