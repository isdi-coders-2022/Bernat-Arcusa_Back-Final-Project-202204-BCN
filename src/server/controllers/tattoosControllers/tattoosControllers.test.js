const Tattoo = require("../../../db/models/Tattoo");
const { mockTattoos, mockTattoosEmpty } = require("../../mocks/mocks");
const {
  getTattoos,
  deleteTattoo,
  editTattoo,
  createTattoo,
  getTattoosByUser,
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

describe("Given a editTattoo function", () => {
  describe("When it's invoked with a file", () => {
    test("Then it should call res methods statuscode 201 and json with the updated tattoo", async () => {
      const expectedResponse = {
        id: "1a1b1c",
        title: "Arm abstract fluid forms",
        image: "newMockImage.jpg",
        imageBackup: "newMockImage.jpg",
        creator: "natbernat",
        creationDate: "2022-06-02",
        tags: ["small", "blackwork", "b/n", "photo"],
      };
      const expectStatus = 201;
      Tattoo.findById = jest.fn().mockResolvedValue(mockTattoos[0]);
      Tattoo.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedResponse);
      const req = {
        file: {},
        image: "newMockImage.jpg",
        body: mockTattoos[0],
        params: { id: "1a1b1c" },
      };

      await editTattoo(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({
        updatedTattoo: expectedResponse,
      });
    });
  });

  describe("When it's invoked without a file", () => {
    test("Then it should call res methods statuscode 201 and a json with a the updated tattoo", async () => {
      const expectedResponse = {
        id: "1a1b1c",
        title: "Other name",
        image:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",
        creator: "natbernat",
        creationDate: "2022-06-02",
        tags: ["small", "blackwork", "b/n", "photo"],
      };
      const expectStatus = 201;
      Tattoo.findById = jest.fn().mockResolvedValue(mockTattoos[0]);
      Tattoo.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedResponse);
      const req = {
        body: expectedResponse,
        params: { id: "1a1b1c" },
      };

      await editTattoo(req, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({
        updatedTattoo: expectedResponse,
      });
    });
  });

  describe("When it's invoked and something fails", () => {
    test("Then it should call next function", async () => {
      Tattoo.findById = jest.fn().mockResolvedValue(mockTattoos[0]);
      Tattoo.findByIdAndUpdate = jest.fn().mockRejectedValue();
      const req = {
        body: {},
        params: {},
      };

      const next = jest.fn();

      await editTattoo(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
