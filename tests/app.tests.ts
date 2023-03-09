import request from "supertest";
import app from "../src/app";

const TOKEN = process.env.TESTING_JWT;

describe("/service/github", () => {
  it("post token", async () => {
    let response = await request(app)
      .post("/service/github")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.status).toEqual("ok");
  });

  it("get token", async () => {
    let response = await request(app)
      .get("/service/github")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.status).toEqual("ok");
  });
});
