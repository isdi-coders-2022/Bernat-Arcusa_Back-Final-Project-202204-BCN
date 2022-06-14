const Tattoo = require("../../../db/models/Tattoo");
const { mockTattoos } = require("../../mocks/mocks");
const { editTattoo } = require("./tattoosControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a editTattoo function", () => {
  describe("When it's invoked with a file", () => {
    test("Then it should call res methods statuscode 201 and json with the updated tattoo", async () => {
      const expectedResponse = {
        id: "1a1b1c",
        title: "New tattoo title",
        image:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",

        imageBackup:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",
        creator: "natbernat",
        creationDate: "2022-06-02",
        tags: ["small", "blackwork", "b/n", "photo"],
      };
      const expectStatus = 201;
      Tattoo.findById = jest.fn().mockResolvedValue(mockTattoos[0]);
      Tattoo.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedResponse);
      const req = {
        file: {},
        image:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",

        imageBackup:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",
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

  describe("When it's invoked without a file", () => {
    test("Then it should call res methods statuscode 201 and a json with a the updated tattoo", async () => {
      const expectedResponse = {
        id: "1a1b1c",
        title: "New tattoo title",
        image:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",

        imageBackup:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",
        creator: "natbernat",
        creationDate: "2022-06-02",
        tags: ["small", "blackwork", "b/n", "photo"],
      };
      const expectStatus = 201;
      Tattoo.findById = jest.fn().mockResolvedValue(mockTattoos[0]);
      Tattoo.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedResponse);
      const req = {
        image:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",

        imageBackup:
          "https://i.pinimg.com/564x/e8/f7/0c/e8f70c51540684a4daf881a0cb73ed42.jpg",
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
