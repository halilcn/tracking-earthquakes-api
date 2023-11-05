const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { BadRequestError } = require("../../../errors");
const { isCustomError } = require("../../../utils");

const router = express.Router();

const getUserInformation = async (credential) => {
  try {
    const googleClientID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(googleClientID);

    const userInformation = await client.verifyIdToken({
      idToken: credential,
      audient: googleClientID,
    });

    return userInformation.getPayload();
  } catch (err) {
    throw new BadRequestError("An error occurred during Google Auth");
  }
};

router.post("/register", async (req, res, next) => {
  try {
    const { credential } = req.body;

    const user = await getUserInformation(credential);

    res.status(200).json({ user });
  } catch (err) {
    const error = isCustomError(err) ? err : new BadRequestError();
    next(error);
  }
});

module.exports = router;
