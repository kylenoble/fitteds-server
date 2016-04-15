require('dotenv').config();
var request = require('request');

var extract = {};

extract.dataQueue = [];

extract.extractData = function(url, callback) {
  console.log(url);
  url = encodeURIComponent(url);
  var embedlyUrl = 'https://api.embedly.com/1/extract?key=' + process.env.EMBEDLY_API + '&url=' + url;
  request(embedlyUrl, function(error, response, body) {
    if (!response.body.error_code) {
      extract.dataQueue.push(response.body);
      callback('success');
    } else {
      console.log(error);
      callback(error);
    }
  });
}

module.exports = extract;
