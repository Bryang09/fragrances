const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fragranceHouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    upvotes: { type: Number, default: 0 },
    image_url: {
      type: String,
    },
    fragrances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fragrance" }],
    original: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("FragranceHouse", fragranceHouseSchema);
