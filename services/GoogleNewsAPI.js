const fetch = require('node-fetch');
const config = require('config');

exports.GoogleNewsService = async search => {
  const base_url = config.get('GOOGLE_MAPS_API_URL');
  try {
    const response = await fetch(
      `${base_url}?q=${search}&token=${config.get('GOOGLE_NEWS_API_TOKEN')}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return err.message;
  }
};
