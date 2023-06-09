import request from "supertest";
import { app } from "../../infra/app";
import createConnection from "../../database";
import { getConnection } from "typeorm";

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })

  
  it("should be able to create a new Survey", async () => {
    const res = await request(app).post("/surveys")
    .send({
      title: "Iago",
      description: "useadasdasd@example.com"
    })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("id");
  })

  it("should be able to get all surveys", async() => {
    await request(app).post("/surveys")
    .send({
      title: "Iago",
      description: "useadasdasd@example.com"
    })
    const res = await request(app).get("/surveys")
    .send({
      title: "Iago",
      description: "useadasdasd@example.com"
    })

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(2)
  })
})