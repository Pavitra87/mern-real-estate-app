const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");


//signup
const signupController = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

//sign in
const signinController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await userModel.findOne({ email});
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


//google
const google = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(35).slice(-8) +
        Math.random().toString(35).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      const newUser = new userModel({
        username:
          req.body.name.split("").join("").toLowerCase() +
          Math.random().toString(35).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


//update
const updateController = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only updates your own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//delete
const deleteUserController = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};

//signout
const signOutController = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("user has been logged out");
  } catch (error) {
    next(error);
  }
};

//getuser
const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) return next(errorHandler(404, "user not found"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  signupController,
  signinController,
  google,
  updateController,
  deleteUserController,
  signOutController,
  getUser,
};
