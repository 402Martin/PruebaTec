import axios from 'axios';

const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const getQuotes = async () => {
  // const response = await axios.get(config.fixerurl, {
  //   headers: {
  //     apikey: config.fixerKey,
  //   },
  // });
  // console.log(response.data);
  // return response.data;
};

export default getQuotes;
