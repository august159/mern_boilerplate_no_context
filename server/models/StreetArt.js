const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    pictureUrl: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

const StreetArtModel = mongoose.model("StreetArt", schema);
module.exports = StreetArtModel;
