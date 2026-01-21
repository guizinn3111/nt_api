const noteService = require("./services");

async function create(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.id; // virá do auth depois

    if (!title || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const note = await noteService.createNote({
      userId,
      title,
      description,
      dueDate,
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  create,
};
