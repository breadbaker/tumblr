Tumblr.Collections.Followees = Backbone.Collection.extend({
  url: '/followees',
  model: Tumblr.Models.User
});