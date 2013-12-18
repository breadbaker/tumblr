Tumblr.Collections.Follows = Backbone.Collection.extend({
  url: '/followers',
  model: Tumblr.Models.Follow
});