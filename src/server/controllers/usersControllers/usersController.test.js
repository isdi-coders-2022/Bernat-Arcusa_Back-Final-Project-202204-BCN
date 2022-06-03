const bcrypt = require("bcrypt");
const User = require("../../../db/models/User");
const { mockToken, mockUser } = require("../../mocks/mocks");

const { userLogin, userRegister } = require("./usersControllers");

jest.mock("../../../db/models/User", () => ({
  findOne: jest.fn().mockReturnValueOnce(true),
}));

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: () =>
    jest.fn().mockResolvedValueOnce(true).mockRejectedValueOnce(false),
  hash: () => jest.fn().mockResolvedValueOnce(),
}));

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockToken,
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given the userLogin controller", () => {
  const next = jest.fn();
  const req = { body: { username: "bernat", password: "1234" } };
  describe("When invoked with a request object with a correct username and password", () => {
    test("Then a response with status 200, and a body containing a token will be received", async () => {
      const expectedStatus = 200;

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(mockToken);
    });
  });

  describe("When invoked with a request object with an username which it's not contained in the database", () => {
    test("Then it should call the next expected function", async () => {
      User.findOne = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with a request object containing an incorrect password", () => {
    test("Then it should receive the next expected function", async () => {
      User.findOne = jest.fn().mockResolvedValue(true);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the userRegister controller", () => {
  const req = { body: mockUser };
  describe("When invoked with a request object with all required properties", () => {
    test("Then a response with a status 201 and a body containing the username will be received", async () => {
      const expectedStatus = 201;
      const expectedJson = { user: mockUser.username };

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(mockUser);

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When invoked with a request object with an existing username", () => {
    test("Then a response with a status code 409 and error message 'Username already exists'", async () => {
      const expectedError = new Error();
      expectedError.customMessage = "Username already exists";
      expectedError.statusCode = 409;

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
