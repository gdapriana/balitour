import { dataDestination1, deleteAllDestinations } from "./utils/destination-utils.js";
import { createAdminUser, createBasicUser, deleteAllUser, loginAdminUser, loginBasicUser } from "./utils/user-utils.js";
import supertest from "supertest";
import web from "../src/application/web.js";

describe('POST /api/destinations', () => {
  beforeEach(async () => {
    await createBasicUser()
    await createAdminUser()
  })
  it("should cannot create, no auth", async () => {
    const result = await supertest(web)
      .post('/api/destinations')
      .send(dataDestination1)
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should cannot create, no admin", async () => {
    const token = await loginBasicUser()
    const result = await supertest(web)
      .post('/api/destinations')
      .send(dataDestination1)
      .set('Authorization', token)
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should cannot create, invalid request body", async () => {
    const token = await loginAdminUser()
    const result = await supertest(web)
      .post('/api/destinations')
      .send({})
      .set('Authorization', token)
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("should can create", async () => {
    const token = await loginAdminUser()
    const result = await supertest(web)
      .post('/api/destinations')
      .send(dataDestination1)
      .set('Authorization', token)
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllDestinations()
    await deleteAllUser()
  })
})
