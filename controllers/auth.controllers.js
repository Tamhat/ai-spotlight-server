const jwt = require("jsonwebtoken");
const userModels = require("../models/user.models");

const createJWT = (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JSON_TOKEN, { expiresIn: "1h" });
  res.send({ token });
};

// check admin role
const checkAdmin = async (req, res) => {
  const email = req.params.email;
  if (req.decoded.email !== email) {
    res.send({ admin: false });
    return;
  }

  const user = await userModels.findOne({ userEmail: email });
  if (user && user.role === "admin") {
    res.send({ admin: true });
  } else {
    res.send({ admin: false });
  }
};

module.exports = { createJWT, checkAdmin };
