const User = require("../User/UserSchema");
const jwt = require("jsonwebtoken");

async function login(username, password) {
  const user = await User.findOne({ username: username });
  if (!user)
    return {
      error: {
        code: "NOT_FOUND",
        message: "User not found",
        status: 404,
      },
    };

  const validateUser = (password == user.password);

  if (validateUser) {
    const generatedJwtToken = await generateJwtToken({ id: user._id }, process.env.JWT_SECRET)

    return generatedJwtToken;
  } else {
    return {
      error: {
        code: "BAD_REQUEST",
        message: "Username or Password incorrect.",
        status: 400,
      },
    };
  }
}
async function generateJwtToken(payload, privatekey) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      privatekey,
      async (err, token2) => {
        if (err) reject(err);
        else resolve(token2);
      }
    );
  });
}

module.exports = { login };
