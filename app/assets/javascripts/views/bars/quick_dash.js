Tumblr.Views.QuickView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
    Tumblr.currentPost = new Tumblr.Models.Post();

    window.onbeforeunload = function(e) {
      Tumblr.currentPost.save([], {async: false});
    };

    Tumblr.publishView = new Tumblr.Views.PublishView();
  },

  addHandlers: function() {
    var that = this;
    $('quickitem').off();
    $('quickitem').on('click', function(e){
      that.postFormView($(e.currentTarget).attr('data-template'));
    });
  },

  postFormView: function(template) {

    $('posttemplate').html( JST['form/'+ template ]())
    var postTypeViews = {
      'Text': function(){
        return new Tumblr.Views.TextView();
      },
      'Photo': function(){
        return new Tumblr.Views.PhotoView();
      },
      'Quote': function(){
        return new Tumblr.Views.QuoteView();
      },
      'Link': function(){
        return new Tumblr.Views.LinkView();
      }
    };
    Tumblr.postViewForm = postTypeViews[template]();

    this.unhide($('overlay.lowZ'));
    this.hideShow($('quickdashbubble'),$('posttemplate'),400);
  }
});