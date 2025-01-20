const express = require("express");
const User = require("../model/user");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

exports.signup = async (req, res, next) => {
  try {
    // Validation step
    let validateRegister = await validateRegisterRequest(req, res, next);

    if (!validateRegister.validation) {
      return validateRegister.failValidationData;
    }
    // create and save new user in the database
    const { email, password, country } = req.body;
    const newUser = new User({
      email,
      password: await bcrypt.hash(password, 12),
      country,
    });
    await newUser.save();

    res.status(200).json({
      status: true,
      message: "Account has been created successfully.",
      data: {
        newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const validateRegisterRequest = async (req, res, next) => {
  try {
    const { email, password, country } = req.body;
    // check if all mandatory fields exist and email is unique
    if (!email || !password || !country) {
      return {
        validation: false,
        failValidationData: next(
          new AppError(404, false, "Please provide mandatory data."),
          req,
          res,
          next
        ),
      };
    }
    // if email address already in use
    if (await User.findOne({ email })) {
      return {
        validation: false,
        failValidationData: next(
          new AppError(
            403,
            false,
            "Given email address belongs to another user record. Please use a different email."
          ),
          req,
          res,
          next
        ),
      };
    }
    return { validation: true };
  } catch (error) {
    next(error);
  }
};

// middleware to check authorised user by jwt
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return next(new AppError(401, "fail", "Access Denied."), req, res, next);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    next(new AppError(400, "fail", "Invalid Token"), req, res, next);
  }
};

// login 
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send("Invalid password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    res.status(200).json({
      token: token,
      user: user,
    });
  } catch (err) {
    next(err);
  }
};
