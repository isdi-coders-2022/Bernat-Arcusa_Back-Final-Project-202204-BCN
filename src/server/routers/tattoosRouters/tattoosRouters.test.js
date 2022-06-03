const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = require("../../../db/index");
const Tattoo = require("../../../db/models/Tattoo");
const app = require("../..");
const { mockTattoos } = require("../../mocks/mocks");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Tattoo.create(mockTattoos[0]);
  await Tattoo.create(mockTattoos[1]);
});

afterEach(async () => {
  await Tattoo.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET '/tattoos/list' endpoint", () => {
  describe("When it receives any request", () => {
    test("Then it should return a list of tattoos items", async () => {
      const {
        body: { tattoos },
      } = await request(app).get("/tattoos/list");
      const expectedlength = 2;

      expect(tattoos).toHaveLength(expectedlength);
    });
  });
});
