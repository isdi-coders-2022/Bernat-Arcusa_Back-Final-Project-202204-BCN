const Tattoo = require("../../../db/models/Tattoo");
const { mockTattoos, mockTattoosEmpty } = require("../../mocks/mocks");
const {
  getTattoos,
  deleteTattoo,

  createTattoo,
  getTattoosByUser,
  getTattooById,
} = require("./tattoosControllers");

const mockId = { username: "natbernat", id: "a1b2c3d4" };
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  verify: () => mockId,
}));

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

describe("Given the getTattoosByUser controller", () => {
  describe("When invoked with a request containing a token", () => {
    test("Then a response with status 200 and the list of tattoos filtered by user will be returned", async () => {
      Tattoo.find = jest.fn().mockResolvedValue(mockTattoos[0]);
      const expectedStatus = 200;
      const expectedJson = { tattoosByUser: mockTattoos[0] };
      const req = {
        headers: {
          authorization: "Bearer asdfghjk",
        },
      };

      await getTattoosByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When invoked with a request containing a token but there's no tattoos created by this user", () => {
    test("Then the next method should be called", async () => {
      Tattoo.find = jest.fn().mockResolvedValue(mockTattoosEmpty);
      const req = {
        headers: {
          authorization: "Bearer asdfghjk",
        },
      };
      const next = jest.fn();

      await getTattoosByUser(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with a request containing a wrong token but there's no tattoos created by this user", () => {
    test("Then the next method should be called", async () => {
      const req = {
        headers: {
          authorization: "vearer asdfghjk",
        },
      };
      const next = jest.fn();

      await getTattoosByUser(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with a request without authorization", () => {
    test("Then the next method should be called", async () => {
      const next = jest.fn();

      await getTattoosByUser(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the getTattooById controller", () => {
  describe("When invoked with a request containing a tattoo", () => {
    test("Then a response with status 200 and message 'Tattoo found'", async () => {
      Tattoo.findById = jest.fn().mockResolvedValue(mockTattoos[0]);
      const expectedStatus = 200;
      const expectedJson = { tattooById: mockTattoos[0] };
      const req = {
        params: {
          id: mockTattoos[0].id,
        },
      };

      await getTattooById(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When invoked with a request containing a wrong id", () => {
    test("Then next should be called", async () => {
      Tattoo.findById = jest.fn().mockResolvedValue(false);
      const next = jest.fn();
      const req = {
        params: {
          id: mockTattoos[0].id,
        },
      };

      await getTattooById(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with an empty request", () => {
    test("Then next should be called", async () => {
      Tattoo.findById = jest.fn().mockResolvedValue(false);
      const next = jest.fn();

      await getTattooById(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given the deleteTattoo controller", () => {
  describe("When invoked with a request containing a tattoo", () => {
    test("Then a response with status 200 and message 'Tattoo has been deleted' will be returned", async () => {
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

describe("Given a createTattoo function", () => {
  describe("When its receives a request with a valid new tattoo", () => {
    test("Then it should call response method statuscode 201 and a json with the created tattoo ", async () => {
      const expectedResponse = mockTattoos[0];
      const expectStatus = 201;
      Tattoo.create = jest.fn().mockResolvedValue(mockTattoos[0]);
      const req = {
        body: mockTattoos[0],
        image: "mockImage.jpg",
      };

      await createTattoo(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({
        createdTattoo: expectedResponse,
      });
    });
  });

  describe("When its invoked and something fails", () => {
    test("Then it should call next function", async () => {
      Tattoo.create = jest.fn().mockRejectedValue();
      const next = jest.fn();

      await createTattoo(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
