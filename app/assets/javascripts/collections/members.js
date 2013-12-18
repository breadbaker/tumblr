Tumblr.Collections.Members = Backbone.Collection.extend({
  url: '/users',
  model: Tumblr.Models.User
});