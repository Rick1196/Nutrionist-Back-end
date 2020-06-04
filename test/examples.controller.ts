import "mocha";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import request from "supertest";
import Server from "../server";
chai.use(chaiHttp);
const expect = chai.expect;
describe("Examples", () => {

  it("should add a new example", async (done) => {
    const result = await  request(Server).post("/api/v1/examples")
    .send({name:"test"});
    expect(result.status).equals(201);
  });

});
