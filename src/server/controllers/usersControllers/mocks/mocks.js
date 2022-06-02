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

module.exports = { mockUser, mockUsers, mockToken };
