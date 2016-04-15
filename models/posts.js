var Parse = require('parse/node');
require('dotenv').config();

Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse';

var Post = Parse.Object.extend("Posts");
var items = {};

items.addPost = function(data) {
  var post = new Post();

  post.set("title", data.title);
  post.set("url", data.url);
  post.set("images", data.images);
  post.set("description", data.description);
  post.set("siteName", data.provider_name);
  post.set("keyWords", data.keyWords);

  post.save(null, {
    success: function(post) {
      // Execute any logic that should take place after the object is saved.
      callback('New object created with objectId: ' + post.id);
    },
    error: function(post, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      callback('Failed to create new object, with error code: ' + error.message);
    }
  });
}

module.exports = items;
