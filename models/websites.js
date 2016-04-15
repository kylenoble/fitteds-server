var osmosis = require('osmosis');

var websites = {};

websites.pages = [
  {
    url:'www.hatclub.com/collections/all-hats',
    selector:'.product_img_link',
    'domain': "http://www.hatclub.com"
  }
];

websites.links = [];

websites.getSite = function(page, callback) {
  osmosis
  .get(page.url)
  .find(page.selector)
  .set({
    'url': '@href'
  })
  .data(function(links) {
    callback(links);
  });
}

websites.getLinks = function(callback) {
  var page = websites.pages[0];
  websites.getSite(page, function(links) {
    if (websites.links.indexOf(page.domain + links.url) === -1) {
      websites.links.push(page.domain + links.url);
    }
    callback();
  });
}

module.exports = websites;
