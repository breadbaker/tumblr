Tumblr.Models.User = Backbone.Model.extend({
  url: function() {
    return '/sessions/'+ this.get('id');
  }

});