Tumblr.Views.TopView = Backbone.View.extend({

  initialize: function(){
    $('papael').html(JST['main/main']);
    this.addHandlers();
    Tumblr.publishView = new Tumblr.Views.PublishView();
    this.quickdash = new Tumblr.Views.QuickView();
    this.accountView = new Tumblr.Views.AccountView();
    //this.helpView = new Tumblr.Views.HelpView();

    this.renderPosts();
    this.dash();

    Tumblr.currentPost = new Tumblr.Models.Post();

    window.onbeforeunload = function(e) {
      Tumblr.currentPost.save([], {async: false});
    };



  },

  renderPosts: function() {
    var renderedPost;
    $('posts').html('');

    _.each(Tumblr.userPosts.models, function(post){
      renderedPost = JST['posts/'+post.attributes.content_type]({
        username: post.get('username'),
        post: post.get('content'),
        avatar: "http://www.picgifs.com/avatars/avatars/fruit/avatars-fruit-081919.jpg"
      });
      $('posts').append(renderedPost);
    });
  },

  addHandlers: function() {
    console.log('add');
    var that = this;
    $('papael').delegate('topitem','click', function(e){
      try {
        var target = $(e.target).closest('topitem');
        var action = target.attr('data-action');

        that[action].call(that,target);
      }
      catch(e) {}
    });
  },

  dash: function() {
    this.viewPortion($('dashview'));
  },

  viewPortion: function(el) {
    this.hideShow($('.top-view'),el);
  },

  help: function() {
    this.viewPortion($('helpview'));

  },

  settings: function() {
    this.viewPortion($('accountview'));
  },

  logout: function() {
    Tumblr.user.destroy();
    Tumblr.router.login();
  }
});