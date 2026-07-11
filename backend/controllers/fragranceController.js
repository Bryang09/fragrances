const Fragrance = require("../models/fragranceModel");
const FragranceHouse = require("../models/fragranceHouseModel");
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
  console.log("Inside createFragrance");
  try {
    if (req.body.fragranceHouse === "other") {
      console.log("INSIDE OTHER");
      console.log("CREATE NEW HOUSE");

      const name = req.body.fragranceHouse;

      try {
        const fragranceHouse = await FragranceHouse.create({ name });
        res.status(200).json(fragranceHouse);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
    const fragrance = await Fragrance.create({ ...req.body });
    console.log("Inside try");
    // Check If fragrance house exists
    if (FragranceHouse.exists({ _id: req.body.fragranceHouse })) {
      const fragranceHouse = await FragranceHouse.findOneAndUpdate(
        { _id: req.body.fragranceHouse },
        { $addToSet: { fragrances: fragrance.id } },
        { returnDocument: "after" }
      );

      fragranceHouse.populate("fragrances");
    } else {
      console.log("CREATE NEW HOUSE");

      const name = req.body.fragranceHouse;

      try {
        const fragranceHouse = await FragranceHouse.create({ name });
        res.status(200).json(fragranceHouse);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
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

// UPDATE Fragrance Image
const updateFragranceImages = async (req, res) => {
  const { id } = req.params;
  const { image_url } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }
  const fragrance = await Fragrance.findOneAndUpdate(
    { _id: id },
    { $addToSet: { images: image_url } },
    { returnDocument: "after" }
  );
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
  updateFragranceImages,
  deleteFragrance,
};
