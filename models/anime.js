const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    synopsis: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    broadcast: {
      type: String,
      required: true
    },
    format: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    episodes: Number,
    score: Number,
    genres: [String],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Anime", eventSchema);
