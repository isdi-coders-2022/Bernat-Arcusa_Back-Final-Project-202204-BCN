const mockTattoos = [
  {
    id: "1a1b1c",
    title: "Arm abstract fluid forms",
    image: "image url",
    creator: "6295aacd280fd64f7583019f",
    creationDate: "2022-06-02",
    tags: ["small", "blackwork", "b/n", "photo"],
  },
  {
    id: "2a2b2c",
    title: "Colored realistic flowers",
    image: "image url",
    creator: "6295aacd280fd64f7583019f",
    creationDate: "2022-06-02",
    tags: ["medium", "traditional", "color", "photo"],
  },
];

const mockTattoosEmpty = [];

const mockToken = { token: "a1b2c3d4" };

const mockUser = {
  username: "louis",
  password: "1234",
  fullname: "Luis de las Demos",
  email: "luis@isdi.com",
};

const mockUsers = [
  {
    username: "mariogl",
    password: "1234",
    fullname: "Mario González",
    email: "mariogl@isdi.com",
  },
  {
    username: "mibaku",
    fullname: "Mijaíl Bakunin",
    email: "mbakunin@mongoose.isObjectIdOrHexString.com",
    password: "$2a$10$L.RdFNSaIjokMJlh68ouoeyvnoBYk2cyLk2Nt0ZdlD.FFA2oznHCu",
  },
];

module.exports = {
  mockTattoos,
  mockTattoosEmpty,
  mockToken,
  mockUser,
  mockUsers,
};
