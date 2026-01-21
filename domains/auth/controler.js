const authService = require("./servicess");

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await authService.signIn({ email, password });
    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { signIn };
