const AuthService = require("./AuthService");

const login = async (req, res) => {
  const response = await AuthService.login(
    req.body.username,
    req.body.password
  );
  if (!response.error) {
    res.set("Authorization", response); // Set headers with Jwt
    return res.status(200).json({
      response: "Login succeeded! You can check your login token at headers.",
    });
  }
  return res.status(response.error.status).json({
    error: response.error,
  });
};
module.exports = { login };
