const Fragrance = require("../models/fragranceModel");
const mongoose = require("mongoose");

// GET all fragrances
const getFragrances = async (req, res) => {
  const fragrances = await Fragrance.find({})
    .sort({ createdAt: -1 })
    .populate(["fragranceHouse", "notes"]);
  res.status(200).json(fragrances);
};
// GET a single fragrance
const getFragrance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const fragrance = await Fragrance.findById(id).populate([
    "fragranceHouse",
    "notes",
  ]);

  if (!fragrance) {
    return res.status(404).json({ message: "Fragrance Not Found!" });
  }
  res.status(200).json(fragrance);
};

// CREATE a fragrance
const createFragrance = async (req, res) => {
  try {
    const fragrance = await Fragrance.create({ ...req.body });
    const populated = await fragrance.populate("fragranceHouse");
    res.status(200).json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// DELETE a fragrance
const deleteFragrance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const fragrance = await Fragrance.findByIdAndDelete({ _id: id });

  if (!fragrance) {
    return res.status(404).json({ message: "Fragrance Not Found!" });
  }

  res.status(200).json(fragrance);
};

// UPDATE a fragrance
const updateFragrance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const fragrance = await Fragrance.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  ).populate(["fragranceHouse", "notes"]);
  if (!fragrance) {
    return res.status(404).json({ message: "Fragrance Not Found!" });
  }

  res.status(200).json(fragrance);
};
module.exports = {
  createFragrance,
  getFragrances,
  getFragrance,
  updateFragrance,
  deleteFragrance,
};
