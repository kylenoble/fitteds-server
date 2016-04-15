var websites = require('./models/websites');
var posts = require('./models/posts');
var embedly = require('./models/embedly');

var scrapeInterval = 1000 * 10 * 60 * 12;

function scrape() {
  websites.getLinks(function() {
    setTimeout(scrape, scrapeInterval);
  });
}

function extractEmbedlyData() {
  if (websites.links && websites.links.length > 0) {
    embedly.extractData(websites.links[0], function(result) {
      websites.links.shift();
      setTimeout(extractEmbedlyData, 1000);
    });
  } else {
    setTimeout(extractEmbedlyData, 1000);
  }
}

function insertData() {
  if (embedly.dataQueue && embedly.dataQueue.length > 0) {
    var data = JSON.parse(embedly.dataQueue[0]);
    posts.addPost(data,
      function(result) {
        embedly.dataQueue.shift();
        console.log(result);
        setTimeout(insertData, 1000);
    });
  } else {
    setTimeout(insertData, 1000);
  }
}

extractEmbedlyData();
scrape();
insertData();
