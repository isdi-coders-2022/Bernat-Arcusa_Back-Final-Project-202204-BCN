const { mockTattoos } = require("../../mocks/mocks");
const { getTattoos } = require("./tattoosControllers");

jest.mock("../../../db/models/Tattoo", () => ({
  ...jest.requireActual("../../../db/models/Tattoo"),
  find: jest.fn().mockResolvedValue(mockTattoos),
}));

describe("Given the getTattoos controller", () => {
  describe("When invoked with a request", () => {
    test("Then a response with status 200, and a body containing a token should be received", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const expectedStatus = 200;

      await getTattoos(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ tattoos: mockTattoos });
    });
  });
});
