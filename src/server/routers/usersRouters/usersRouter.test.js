const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = require("../../../db/index");
const User = require("../../../db/models/User");
const app = require("../..");
const {
  mockUser,
  mockUsers,
} = require("../../controllers/usersControllers/mocks/mocks");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(mockUsers[0]);
  await User.create(mockUsers[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/users/login' endpoint", () => {
  describe("When it receives a request", () => {
    const receivedRequest = {
      username: "mibaku",
      password: "mibaku1234",
    };

    test("Then it should specify json as the content type in header", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(receivedRequest);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });
});

describe("Given a POST '/users/register' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should return the created username", async () => {
      const { body } = await request(app)
        .post("/users/register")
        .send(mockUser)
        .expect(201);

      expect(body.user).toBe(mockUser.username);
    });
  });
});
