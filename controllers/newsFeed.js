const { GoogleNewsService } = require('../services/GoogleNewsAPI');

exports.getNewsFeed = async (req, res) => {
  const search = req.params.search;
  try {
    const data = await GoogleNewsService(search);
    res.status(200).json({
      data
    });
  } catch (err) {
    res.status(400).json({
      err: data
    });
  }
};
