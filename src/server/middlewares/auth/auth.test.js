const jwt = require("jsonwebtoken");
const { auth } = require("./auth");

const mockId = { username: "natbernat", id: "a1b2c3d4" };

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockId,
}));

describe("Given the auth function", () => {
  describe("When it receives a request with a valid token", () => {
    const req = {
      headers: {
        authorization: "Bearer ",
      },
    };
    test("Then the 'next' function should be invoked", () => {
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });

    test("Then it should add to the received request the user id by the token", () => {
      const next = () => {};

      auth(req, null, next);

      expect(req).toHaveProperty("userId", mockId);
    });
  });

  describe("When it receives a request with an invalid token", () => {
    test("Then the 'next' function should be invoked", async () => {
      const req = {
        headers: {
          authorization: "Bearer 1234",
        },
      };
      const next = jest.fn();
      jest.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error();
      });

      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
