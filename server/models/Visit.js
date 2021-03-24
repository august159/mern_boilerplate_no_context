const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _streetArt: {
      type: Schema.Types.ObjectId,
      ref: "StreetArt",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

const VisitModel = mongoose.model("Visit", schema);
module.exports = VisitModel;
