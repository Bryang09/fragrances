const Note = require("../models/noteModel");
const mongoose = require("mongoose");

// GET All Notes
const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

// GET a Not
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID!" });
  }

  const note = await Note.findById(id);

  if (!note) {
    res.status(404).json({ message: "Note not Found!" });
  }
  res.status(200).json(note);
};

// CREATE Note
const createNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNote,
};
