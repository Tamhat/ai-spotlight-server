const userModels = require("../models/user.models");

const getAllUsers = async (req, res) => {
  const result = await userModels.find().sort({ createdAt: -1 });
  res.send(result);
};

const creatUsers = async (req, res) => {
  const newUser = req.body;
  const query = { userEmail: newUser.userEmail };
  const existingUser = await userModels.findOne(query);
  if (existingUser) {
    return res.send({ message: "User already exists" });
  }
  const result = await userModels.create(newUser);
  res.send(result);
};

const makeAdmin = async (req, res) => {
  const id = req.params.id;
  const result = await userModels.findByIdAndUpdate(id, {
    $set: {
      role: "admin",
    },
  });
  res.send(result);
};

const makeUser = async (req, res) => {
  const id = req.params.id;
  const result = await userModels.findByIdAndUpdate(id, {
    $set: {
      role: "user",
    },
  });
  res.send(result);
};

module.exports = { creatUsers, getAllUsers, makeAdmin, makeUser };
