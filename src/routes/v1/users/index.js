const express = require("express");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const getUserInformation = async (credential) => {
  const googleClientID = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(googleClientID);

  const userInformation = await client.verifyIdToken({
    idToken: credential,
    audient: googleClientID,
  });

  return userInformation.getPayload();
};

router.post("/register", async (req, res, next) => {
  const { credential } = req.body;

  const user = await getUserInformation(credential);

  res.status(200).json({ user });
});

module.exports = router;
