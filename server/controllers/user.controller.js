const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateJwt } = require("../utility/generateJwt");
// const SendEmail = require("../utility/notification/sendEmail");
const randomize = require("randomatic");
const Post = require("../models/post.model");

// REGISTER
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email) throw new Error("Cannot register without an email");
    if (!req.body.username)
      throw new Error("Cannot register without a username");
    if (!req.body.password)
      throw new Error("Cannot register without a password");

    if (req.body.password.length < 6)
      throw new Error("Password must be at least 6 characters long");

    // generate hashed password
    const hash = await User.hashPassword(req.body.password);
    req.body.password = hash;

    // create new user
    const newUser = new User(req.body);

    console.log(newUser);

    const { error, token } = await generateJwt(newUser.username, newUser._id);
    if (error)
      throw new Error("Couldn't create access token. Please try again later");

    newUser.accessToken = token;

    // save new user
    await newUser.save();

    res.status(200).send({
      success: true,
      message: "Registration Success",
      accessToken: token,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ error: true, message: err.message });
      return;
    }
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please make a valid request");

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found");

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    const { error, token } = await generateJwt(user.username, user._id);
    if (error)
      throw new Error("Couldn't create access token. Please try again later.");

    user.accessToken = token;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      accessToken: token,
      user: user._id,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Please make a valid request");

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Account not found");

    if (user.active) throw new Error("Account already activated");

    user.otpToken = randomize("0", 4);
    user.otpTokenExpires = new Date(Date.now() + 60 * 1000 * 15); //15 minutes
    await user.save();
    if (user.email) {
      await SendEmail(
        `Your verification code is - ${user.otpToken}`,
        req.body.email,
        "Verification Code"
      ).catch((err) => {
        throw new Error("Couldn't send email");
      });
    }
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      codeExpiration: user.otpTokenExpires,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

exports.activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) throw new Error("Please make a valid request");

    const user = await User.findOne({
      email: email,
      otpToken: code,
      otpTokenExpires: { $gt: Date.now() },
    });

    if (!user) throw new Error("Invalid details");

    if (user.active) throw new Error("Account already activated");

    user.otpToken = "";
    user.otpTokenExpires = null;
    user.active = true;
    const { error, token } = await generateJwt(user.username, user._id);

    if (error)
      throw new Error("Couldn't create access token. Please try again later");

    user.accessToken = token;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Account activated.",
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Cannot be processed");

    const user = await User.findOne({
      email: email,
    });

    if (!user) throw new Error("Account not found");

    let code = randomize("Aa0", 60);
    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expiry;

    if (user.email) {
      await SendEmail(
        `Follow the link to reset your password - <a clicktracking="off" href="https://uaunity.com/password/reset/${code}">Reset password</a>`,
        user.email,
        "Reset Password"
      ).catch((_) => {
        throw new Error("Couldn't send email, try authorizing using phone");
      });
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "Sent notification to reset your password",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      throw new Error("Provide token and a new password");

    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Password reset token is invalid or expired.");

    const hash = await User.hashPassword(req.body.newPassword);
    user.password = hash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = "";
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password has been changed",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.setPublicInfo = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.body.userId;
    if (!userId) throw new Error("User is not authorized");

    await User.findByIdAndUpdate(userId, {
      $set: req.body.data,
    });

    res.status(200).send({
      success: true,
      message: "User info has been saved",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body.data,
      });
      res.status(200).send({
        success: true,
        message: "User has been updated",
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

// UPDATE USERNAME
exports.updateUsername = async (req, res) => {
  console.log(req.params.id);
  if (req.body.userId === req.params.id) {
    try {
      if (!req.body.data.username) throw new Error("Username field is empty");
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body.data,
      });
      res.status(200).send({
        success: true,
        message: "Username has been updated",
      });
    } catch (err) {
      res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

// CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  console.log(req.body);
  if (req.body.userId === req.params.id) {
    try {
      if (!req.body.oldPassword) throw new Error("Password field is empty");
      if (!req.body.newPassword) throw new Error("New password field is empty");
      if (!req.body.data)
        throw new Error("New password confirmed field is empty");
      const user = await User.findById(req.params.id);
      console.log(user.password);

      if (req.body.newPassword === req.body.oldPassword)
        throw new Error("New password cannot be the same as old password");

      const validPassword = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
      if (!validPassword) throw new Error("Old password is incorrect");

      if (req.body.newPassword !== req.body.data)
        throw new Error("Passwords do not match");

      const salt = await bcrypt.genSalt(10);
      req.body.data = await bcrypt.hash(req.body.data, salt);

      await User.findByIdAndUpdate(req.params.id, {
        password: req.body.data,
      });

      res.status(200).send({
        success: true,
        message: "Password has been updated",
      });
    } catch (err) {
      res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user._id.toString() === userId || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(userId);
      await Post.deleteMany({ userId: user._id.toString() });
      res.status(200).send({
        success: true,
        message: "Account has been successfully deleted",
      });
    } catch (err) {
      res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

// GET A USER
exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

// FOLLOW A USER
exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(errr);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};

exports.getProfileData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -otpToken -otpTokenExpires -resetPasswordToken -resetPasswordExpires -accessToken"
    );
    if (!user) throw new Error("Could not find user");

    res.status(200).send({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
