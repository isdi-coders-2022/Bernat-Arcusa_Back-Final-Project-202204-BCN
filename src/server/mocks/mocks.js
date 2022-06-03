const mockTattoos = [
  {
    id: "1a1b1c",
    image: "image url",
    creator: "6295aacd280fd64f7583019f",
    creationDate: "2022-06-02",
    tags: ["small", "blackwork", "b/n", "photo"],
  },
  {
    id: "2a2b2c",
    image: "image url",
    creator: "6295aacd280fd64f7583019f",
    creationDate: "2022-06-02",
    tags: ["medium", "traditional", "color", "photo"],
  },
];

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

const mockToken = { token: "a1b2c3d4" };

module.exports = { mockTattoos, mockUser, mockUsers, mockToken };
