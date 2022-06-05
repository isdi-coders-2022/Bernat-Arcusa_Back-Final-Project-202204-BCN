const Tattoo = require("../../../db/models/Tattoo");
const { mockTattoos, mockTattoosEmpty } = require("../../mocks/mocks");
const { getTattoos, deleteTattoo } = require("./tattoosControllers");

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

describe("Given the deleteTattoo controller", () => {
  describe("When invoked with a request containing a tattoo", () => {
    test("Then a response with status 200 and message 'Tattoo has been deleted'", async () => {
      Tattoo.findByIdAndDelete = jest.fn().mockResolvedValue(true);
      const expectedStatus = 200;
      const expectedJson = { message: "Tattoo has been deleted" };
      const req = {
        params: {
          id: mockTattoos[0].id,
        },
      };

      await deleteTattoo(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When invoked with a request containing a wrong id", () => {
    test("Then next should be called", async () => {
      Tattoo.findByIdAndDelete = jest.fn().mockResolvedValue(false);
      const next = jest.fn();
      const req = {
        params: {
          id: mockTattoos[0].id,
        },
      };

      await deleteTattoo(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with an empty request", () => {
    test("Then next should be called", async () => {
      Tattoo.findByIdAndDelete = jest.fn().mockResolvedValue(false);
      const next = jest.fn();

      await deleteTattoo(null, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
