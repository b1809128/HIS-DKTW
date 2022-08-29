const Auth = require("../models/AuthModel");
const bcrypt = require("bcrypt");

/*
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, "base64").toString("ascii");
    const [username, password] = decoded.split(":");
    const match = await bcrypt.compare(password, authenticatedUser.password);
    console.log(authenticatedUser);
*/

exports.basicAuthorization = async (req, res, next) => {
  const authorization = req.headers.username;
  if (authorization) {
    const authenticatedUser = await Auth.find({
      username: req.headers.username,
      password: req.headers.password,
    });

    if (authenticatedUser) {
      req.authenticatedUser = {
        data: authenticatedUser,
        token:
          "DTDBIQ4iOV559N21kJkQIwsZhnZbsARFkC2DK6WZzEC1cDy1Y5sWGGtZryV9kiv2nxNaYbFqcNEMXh1ws6Maf97jS/gvzldE2SnsFq4cg8Tdo37D0Pq70wma9NNvwxDkbV0D8gNyHhG16cbxe7BzJZHtPMwAkIg5GAV87zNmJGI=",
      };
    } else {
      req.authenticatedUser = { data: null, token: null };
    }
    next();
  }
};
