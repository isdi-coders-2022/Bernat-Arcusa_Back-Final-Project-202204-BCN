const bcrypt = require("bcrypt");
const User = require("../../../db/models/User");
const { userLogin } = require("./usersControllers");

const mockToken = { token: "a1b2c3d4" };
jest.mock("../../../db/models/User", () => ({
  findOne: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(true),
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: () =>
    jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockToken,
}));

const next = jest.fn();

describe("Given the userLogin controller", () => {
  const req = { body: { username: "bernat", password: "1234" } };
  describe("When invoked with a request object with a correct username and password", () => {
    test("Then a response with status 200, and a body containing a token will be received", async () => {
      const expectedStatus = 200;

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(mockToken);
    });
  });

  describe("When invoked with a request object with an username which it's not contained in the database", () => {
    test("Then it should call the next expected function", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with a request object containing an incorrect password", () => {
    test("Then it should receive the next expected function", async () => {
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
