const FragranceHouse = require("../models/fragranceHouseModel");
const mongoose = require("mongoose");

// GET all fragrance houses
const getAllFragranceHouse = async (req, res) => {
  const fragranceHouse = await FragranceHouse.find({})
    .sort({ name: +1 })
    .populate("fragrances");
  res.status(200).json(fragranceHouse);
};

// GET Single Fragrance House
const getFragranceHouse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const fragranceHouse = await FragranceHouse.findById({ _id: id }).populate(
    "fragrances"
  );

  if (!fragranceHouse) {
    return res.status(404).json({ message: "Fragrance House Not Found!" });
  }

  res.status(200).json(fragranceHouse);
};

// CREATE Fragrance house
const createFragranceHouse = async (req, res) => {
  const { name, rating } = req.body;

  try {
    const fragranceHouse = await FragranceHouse.create({ name, rating });
    res.status(200).json(fragranceHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE Fragrance House
const updateFragranceHouse = async (req, res) => {
  const { id } = req.params;

  const { name, rating, fragrances } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const fragranceHouse = await FragranceHouse.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { returnDocument: "after" }
  );
  if (!fragranceHouse) {
    return res.status(404).json({ message: "Fragrance Not Found!" });
  }

  res.status(200).json(fragranceHouse);
};
// UPDATE Fragrance House
const updateFragranceHouseFragrances = async (req, res) => {
  const { id } = req.params;

  const { name, rating, fragrances } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const fragranceHouse = await FragranceHouse.findOneAndUpdate(
    { _id: id },
    { $addToSet: { fragrances: fragrances } },
    { returnDocument: "after" }
  );
  if (!fragranceHouse) {
    return res.status(404).json({ message: "Fragrance Not Found!" });
  }

  res.status(200).json(fragranceHouse);
};

const deleteFragranceHouse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const fragranceHouse = await FragranceHouse.findByIdAndDelete({ _id: id });

  if (!fragranceHouse) {
    return res.status(404).json({ message: "Fragrance House Not Found!" });
  }

  res.status(200).json(fragranceHouse);
};

module.exports = {
  getAllFragranceHouse,
  getFragranceHouse,
  createFragranceHouse,
  updateFragranceHouse,
  updateFragranceHouseFragrances,
  deleteFragranceHouse,
};
