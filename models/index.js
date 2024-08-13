const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Date: {
    type: Number,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("games, gameSchema");
