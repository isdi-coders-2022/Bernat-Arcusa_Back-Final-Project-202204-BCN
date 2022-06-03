const Tattoo = require("../../../db/models/Tattoo");
const { mockTattoos, mockTattoosEmpty } = require("../../mocks/mocks");
const { getTattoos } = require("./tattoosControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given the getTattoos controller", () => {
  describe("When invoked with a request", () => {
    test("Then a response with status 200, and a body containing a token should be received", async () => {
      Tattoo.find = jest.fn().mockResolvedValue(mockTattoos);
      const expectedStatus = 200;

      await getTattoos(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ tattoos: mockTattoos });
    });
  });

  describe("When invoked with a request but there's no items in the received array", () => {
    test("Then a response with status 404, and an error message ''No tattoos found'", async () => {
      Tattoo.find = jest.fn().mockReturnValue(mockTattoosEmpty);
      const next = jest.fn();

      await getTattoos(null, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
