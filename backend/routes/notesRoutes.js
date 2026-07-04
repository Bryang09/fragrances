const express = require("express");

const router = express.Router();

const {
  createNote,
  getAllNotes,
  getNote,
} = require("../controllers/noteController");

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", createNote);

module.exports = router;
