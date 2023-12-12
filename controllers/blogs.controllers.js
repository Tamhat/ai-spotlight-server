const blogModels = require("../models/blog.models");

const createBlogs = async (req, res) => {
  const result = await blogModels.create(req.body);
  res.send(result);
};

const getAllBlogs = async (req, res) => {
  const result = await blogModels.find().sort({
    createdAt: -1
  });
  res.send(result);
};

const getSingleBlogs = async (req, res) => {
  const title = req.params.title;
  const formattedTitle = title.replace(/-/g, " ");
  const result = await blogModels.findOne({
    title: formattedTitle
  });
  res.send(result);
};

const updateBlogs = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updateBlogs = {
    $set: {
      title: body.title,
      subtitle: body.subtitle,
      tags: body.tags,
      toolsImage: body.toolsImage,
      ratings: body.ratings,
      description: body.description,
      websiteLink: body.websiteLink,
      youtubeLink: body.youtubeLink,
      facebookLink: body.facebookLink,
      discordLink: body.discordLink,
      twitterLink: body.twitterLink,
      linkedinLink: body.twitterLink,
      videoReviewLink: body.videoReviewLink,
    },
  };
  const result = await blogModels.findByIdAndUpdate(id, updateBlogs);
  res.send(result);
};

const deleteBlogs = async (req, res) => {
  const id = req.params.id;
  const result = await blogModels.findByIdAndDelete(id);
  res.send(result);
};

//seaching blogs
const searchBlogsController = async (req, res) => {
  try {

    const {
      keyword
    } = req.params;

    const results = await blogModels
      .find({
        $or: [{
            title: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            userName: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            description: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            subtitle: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            category: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            tags: {
              $regex: keyword,
              $options: "i"
            }
          },
        ],
      })
      .select("-photo");
    res.json(results);


  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Searching tools API",
      error,
    });
  }
};

module.exports = {
  createBlogs,
  getAllBlogs,
  getSingleBlogs,
  updateBlogs,
  deleteBlogs,
  searchBlogsController,
};