// import { plainToClass } from "class-transformer";
// const CustomError = require("express-handler-errors");
const User = require("./UserSchema");

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
    return newUser.save();
  } catch (error) {
    return error;
  }
}

// async function findById(id) {
//   try {
//     const user = await this.userModel.findById(id);
//     if (!user)
//       throw new CustomError({
//         code: "NOT_FOUND",
//         message: "User not found",
//         status: 404,
//       });
//     return user;
//   } catch (error) {
//     return error;
//   }
// }

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

// async update(id: string, obj: IUser): Promise<IUser> {

//   await this.userModel.update(id, obj);
//   return this.findOne(id);

// }

// async function deleteOne(id) {
//   try {
//     const user = await this.userModel.findById(id);
//     if (!user)
//       throw new CustomError({
//         code: "NOT_FOUND",
//         message: "User not found",
//         status: 404,
//       });
//     return this.userModel.findByIdAndDelete(id);
//   } catch (error) {
//     return error;
//   }
// }

module.exports = { create, list, findByUsername };
