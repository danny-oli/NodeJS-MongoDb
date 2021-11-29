const User = require("./UserSchema");
const bcrypt = require('bcrypt');

async function list() {
  try {
    const users = await User.find();
    if (!users.length) {
      throw {
        error: {
          code: "NOT_FOUND",
          message: "User not found.",
          status: 404,
        },
      };
    }
    return users;
  } catch (error) {
    return error;
  }
}

async function create(requestBody) {
  try {
    const user = await User.findOne({ username: requestBody.username });
    if (user) {
      throw {
        error: {
          code: "CONFLICT",
          message: "Username must be unique.",
          status: 409,
        },
      };
    }
    const newUser = new User(requestBody);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(requestBody.password, salt);
    newUser.password = hashedPassword;
    return newUser.save();
  } catch (error) {
    return error;
  }
}

async function findById(id) {
  try {
    const user = await User.findById(id)
    if (!user)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "User not found",
          status: 404,
        },
      };
    return user;
  } catch (error) {
    return error;
  }
}

async function findByUsername(username) {
  try {
    const user = await User.findOne({ username });
    if (!user)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "User not found",
          status: 404,
        },
      };
    return user;
  } catch (error) {
    return error;
  }
}

async function update(userId, requestBody) {
  try {
    const user = await User.findById(userId);
    if (!user)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "User not found",
          status: 404,
        },
      };
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: requestBody },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
}

async function deleteOne(userId, requestBody) {
  try {
    const user = User.findById(userId);
    if (!user)
      throw {
        error: {
          code: "NOT_FOUND",
          message: "User not found",
          status: 404,
        },
      };
    return User.findByIdAndDelete(userId);
  } catch (error) {
    return error;
  }
}

module.exports = { create, list, findById, findByUsername, update, deleteOne };
