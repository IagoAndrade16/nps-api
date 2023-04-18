import request from "supertest";
import { createConnection, getConnection } from "typeorm";
import { app } from "../../../../../infra/app";

const npsRoute = "/surveys-users/nps";
const surveysRoute = "/surveys"

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

  it("should be able to calculate nps", async () => {
    const { body } = await request(app).post(surveysRoute)
    .send({
      title: "titulo",
      description: "descrição"
    })

    const res = await request(app).get(`${npsRoute}/${body.data.id}`)
    .send();
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("NPS_CALCULATED");
    expect(res.body.data).toHaveProperty("nps");
  })
})