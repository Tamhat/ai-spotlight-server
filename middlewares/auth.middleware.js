const jwt = require("jsonwebtoken");
const userModels = require("../models/user.models");

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "Unauthorized Access" });
  }
  // bearer token authentication
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JSON_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized Access" });
    }
    req.decoded = decoded;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { userEmail: email };
  const user = await userModels.findOne(query);
  if (user?.role !== "admin")
    return res.status(403).send({ error: true, message: "Forbidden Access" });
  next();
};

module.exports = { verifyJWT, verifyAdmin };