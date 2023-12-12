const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    websiteLink: {
      type: String,
      required: true,
    },
    toolsImage: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: false,
    },
    youtubeLink: {
      type: String,
      required: false,
    },
    discordLink: {
      type: String,
      required: false,
    },
    twitterLink: {
      type: String,
      required: false,
    },
    linkedinLink: {
      type: String,
      required: false,
    },
    videoReviewLink: {
      type: String,
      required: false,
    },
    ratings: {
      type: Number,
      default: 4.9,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
