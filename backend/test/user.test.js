import supertest from 'supertest'
import web from "../src/application/web.js";
import {
  createAdminUser,
  createBasicUser,
  deleteAllUser,
  loginAdminUser,
  loginBasicUser,
  userTestProperties
} from "./utils/user-utils.js";

describe("POST /api/register", () => {
  afterEach(async () => {
    await deleteAllUser()
  })
  it("should cannot register, invalid request", async () => {
    const result = await supertest(web)
      .post('/api/register')
      .send({
        username: "",
        password: "",
        name: "",
      })
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("should can register", async () => {
    const result = await supertest(web)
      .post('/api/register')
      .send({
        username: userTestProperties.BASIC_USERNAME,
        password: userTestProperties.BASIC_PASSWORD,
        name: userTestProperties.BASIC_NAME,
      })
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
});
describe("GET /api/users/:username", () => {
  beforeEach(async () => {
    await createBasicUser()
  })
  it("should cannot get, wrong username", async () => {
    const result = await supertest(web)
      .get('/api/users/random')
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("should can get", async () => {
    const result = await supertest(web)
      .get(`/api/users/${userTestProperties.BASIC_USERNAME}`)
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllUser()
  })
})
describe("POST /api/login", () => {
  beforeEach(async () => {
    await createBasicUser()
  })
  it("should cannot login, invalid request", async () => {
    const result = await supertest(web)
      .post('/api/login')
      .send({
        username: "",
        password: ""
      })

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("should can login", async () => {
    const result = await supertest(web)
      .post('/api/login')
      .send({
        username: userTestProperties.BASIC_USERNAME,
        password: userTestProperties.BASIC_PASSWORD,
      })

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllUser()
  })
})
describe("PATCH /api/update", () => {
  beforeEach(async () => {
    await createBasicUser()
  })
  it("should cannot update, no auth", async () => {
    const result = await supertest(web)
      .patch('/api/update')
      .send({
        name: userTestProperties.BASIC_NAME_UPDATED
      })

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should cannot update, invalid auth", async () => {
    const result = await supertest(web)
      .patch('/api/update')
      .set('Authorization', 'random')
      .send({
        name: userTestProperties.BASIC_NAME_UPDATED
      })

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should cannot update, invalid request", async () => {
    const token = await loginBasicUser()
    const result = await supertest(web)
      .patch('/api/update')
      .set('Authorization', token)
      .send({
        name: ""
      })

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it("should can update", async () => {
    const token = await loginBasicUser()
    const result = await supertest(web)
      .patch('/api/update')
      .set('Authorization', token)
      .send({
        name: userTestProperties.BASIC_NAME_UPDATED
      })

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllUser()
  })
});
describe("DELETE /api/logout", () => {
  beforeEach(async () => {
    await createBasicUser()
  })
  it("should cannot logout, no auth", async () => {
    const result = await supertest(web)
      .delete('/api/logout')
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
  it("should can logout", async () => {
    const token = await loginBasicUser()
    const result = await supertest(web)
      .delete('/api/logout')
      .set('Authorization', token)
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllUser()
  })
})
describe("GET /api/users", () => {
  beforeEach(async () => {
    await createBasicUser()
    await createAdminUser()
  })
  it("should cannot gets, no auth", async () => {
    const result = await supertest(web)
      .get('/api/users')
    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined();
  });
  it("should cannot gets, no admin", async () => {
    const token = await loginBasicUser()
    const result = await supertest(web)
      .get('/api/users')
      .set('Authorization', token)
    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined();
  });
  it("should can gets", async () => {
    const token = await loginAdminUser()
    const result = await supertest(web)
      .get('/api/users')
      .set('Authorization', token)
    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllUser()
  })
});
describe("DELETE /api/users/:username", () => {
  beforeEach(async () => {
    await createBasicUser()
    await createAdminUser()
  })
  it("should cannot delete, no auth", async () => {
    const result = await supertest(web)
      .delete(`/api/users/${userTestProperties.BASIC_USERNAME}`)
    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined();
  });
  it("should cannot delete, no admin", async () => {
    const token = await loginBasicUser()
    const result = await supertest(web)
      .delete(`/api/users/${userTestProperties.BASIC_USERNAME}`)
      .set('Authorization', token)
    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined();
  });
  it("should can delete", async () => {
    const token = await loginAdminUser()
    const result = await supertest(web)
      .delete(`/api/users/${userTestProperties.BASIC_USERNAME}`)
      .set('Authorization', token)
    expect(result.status).toBe(200)
    expect(result.body.data).toBeDefined();
  });
  afterEach(async () => {
    await deleteAllUser()
  })
});