const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
