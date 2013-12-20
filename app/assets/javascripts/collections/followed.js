Tumblr.Collections.FollowedUsers = Backbone.Collection.extend({
  url: '/followers',
  model: Tumblr.Models.User
});