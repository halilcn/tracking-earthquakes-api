const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const { BadRequestError } = require("../../../errors");
const { isCustomError } = require("../../../utils");
const User = require("./../../../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

const handleGoogleAuth = async (credential) => {
  try {
    const googleClientID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(googleClientID);

    const googleUserInformation = (
      await client.verifyIdToken({
        idToken: credential,
        audient: googleClientID,
      })
    ).getPayload();
    const email = googleUserInformation.email;

    const isUserExists = await User.exists({ email });
    if (!isUserExists) {
      const { given_name, picture } = googleUserInformation;
      await User.create({
        email,
        name: given_name,
        photo: picture,
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_KEY);
    const user = await User.findOneAndUpdate(
      { email },
      { token },
      { new: true }
    );

    return user;
  } catch (err) {
    throw new BadRequestError("An error occurred during Google Auth");
  }
};

router.post("/auth", async (req, res, next) => {
  try {
    const { credential } = req.body;

    const user = await handleGoogleAuth(credential);

    res.status(200).json({ user });
  } catch (err) {
    const error = isCustomError(err) ? err : new BadRequestError();
    next(error);
  }
});

module.exports = router;
