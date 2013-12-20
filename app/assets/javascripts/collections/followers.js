Tumblr.Collections.Followers = Backbone.Collection.extend({
  url: '/followers',
  model: Tumblr.Models.User
});