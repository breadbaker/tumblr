Tumblr.Models.Post = Backbone.Model.extend({
  urlRoot: '/posts',
  initialize: function() {
    if(this.isNew()){
      this.save();
    }
  }
});