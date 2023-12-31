const { StatusCodes } = require("http-status-codes");

const { OAuth2Client } = require("google-auth-library");
const { BadRequestError } = require("../errors");

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const MessageLimit = require("../models/messageLimit");
const messageLimitService = require("../services/messageLimitService");

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

exports.auth = async (req, res, next) => {
  const { credential } = req.body;

  const user = await handleGoogleAuth(credential);
  const { _id, email, name, photo, token } = user;

  const hasMessageLimits = await MessageLimit.exists({ user: _id });
  if (!hasMessageLimits) {
    await messageLimitService.createDefaultMessageLimits({
      user: _id,
    });
  }

  res.success({
    status: StatusCodes.CREATED,
    user: {
      _id,
      email,
      name,
      photo,
      token,
    },
  });
};

exports.logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.success();
};

exports.me = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { _id, email, name, photo, token } = user;

  res.success({
    user: {
      _id,
      email,
      name,
      photo,
      token,
    },
  });
};
