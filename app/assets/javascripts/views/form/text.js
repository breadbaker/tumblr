Tumblr.Views.TextView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
    Tumblr.currentPost.set('content_type','Text');
    this.displayarea = $('textpostform textarea')
    this.photoEditor = new DE.PhotoEditor({
      'overlay': $('overlay.high'),
      'mainAreaSelector': 'texttextarea',
      'postUrl': '/photos',
      'data':{
        'post_id': Tumblr.currentPost.get('id') //that.model.get('id')
      }
    });
  },

  publish: function() {
    var text = this.photoEditor.content().trim();
    var title = $('#text-post-title').val();

    Tumblr.currentPost.set({
      'content':
      {
        'text': text,
        'title': title
      }
    });

    if(text.length > 0){
      Tumblr.publishView.save();
      var that = this;
    }
  },

  addHandlers: function() {
    var that = this;
    $('posttemplate').undelegate('postbutton', 'click');
    $('posttemplate').delegate('postbutton', 'click', function(e){
      that.publish();
    });
  }
});