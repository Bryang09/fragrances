const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fragranceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    fragranceHouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FragranceHouse",
    },
    notes: {
      topNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
      middleNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
      baseNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    upvotes: Number,
    comments: [
      {
        userId: {
          type: Number,
        },
        comment: {
          type: String,
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
        },
      },
    ],
    original: Boolean,
    dupeOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fragrance",
    },
    dupes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fragrance" }],
    shoppingLinks: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fragrance", fragranceSchema);
