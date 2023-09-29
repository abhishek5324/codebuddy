const User = require("../schema/user.schema");

module.exports.getUsersWithPostCount = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const userCount = await User.countDocuments();
    const pageCount = Math.ceil(userCount / limit);

    const users = await User.aggregate()
      .lookup({
        from: "posts",
        localField: "_id",
        foreignField: "userId",
        as: "posts",
      })
      .project({
        name: 1,
        posts: { $size: "$posts" },
      })
      .skip(skip)
      .limit(limit);

    const pagination = {
      totalDocs: userCount,
      limit: limit,
      page: page,
      totalPages: pageCount,
      pagingCounter: ((page-1)*limit)+1,
      hasPrevPage: page > 1 ? true : false,
      hasNextPage: page < pageCount ? true : false,
      prevPage: page <= 1 ? null : page - 1,
      nextPage: page >= pageCount ? null : page + 1,
    };

    const data = {
      users,
      pagination,
    };
    
    res.status(200).json({ data });
  } catch (error) {
    res.send({ error: error.message });
  }
};
