const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("../users/service");

async function signIn({ email, password }) {
  const user = await userService.findUserByEmail(email);
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
}

module.exports = { signIn };
