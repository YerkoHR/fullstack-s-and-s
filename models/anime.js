const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const animeSchema = new Schema(
  {
    mal_id: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Anime", animeSchema);
