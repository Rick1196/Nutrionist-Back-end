import Server from "../server";
import request from "supertest";
import mongoose from 'mongoose';


describe("Authentication API", () => {
  //body request malformed
  it("Login API request must fail with 400", async (done) => {
    let res = await request(Server).post("/api/v1/auth/login")
      .send({ username: "rick11", password: "1234" })
    expect(res.status).toEqual(400);
  });
  //must return 401, unauthorized, wrong credentials
  it("Login API request must fail with 401", async (done) => {
    let res = await request(Server).post("/api/v1/auth/login")
      .send({ user_name: "rick11", password: "1234" })
    expect(res.status).toEqual(401);
    done();
  })
});
