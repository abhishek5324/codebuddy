const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const postSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Post', postSchema);
