Tumblr.Models.Post = Backbone.Model.extend({
  urlRoot: '/posts',
  initialize: function() {
    if(this.isNew()){
      this.save();
    }
  },
  prettyDate: function(){
    var date = new Date(this.get('post_date'));
    var str = date.toLocaleString().split(' ');
    var time = str[1].substr(0, str[1].length-3);
    return str[0] + ' at ' + time + str[2];

  }
});