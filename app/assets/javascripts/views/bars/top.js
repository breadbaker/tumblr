Tumblr.Views.TopView = Backbone.View.extend({
  initialize: function(){
    this.dash();
  },

  addHandlers: function() {
    var that = this;
    $('topitem').off();
    $('topitem').on('click', function(e){
      try {
        var target = $(e.target)
        var action = target.attr('data-action');

        that[action].call(that,target);
      }
      catch(e) {}
    });
  },

  dash: function() {
    $('papael').html(JST['main/main']);

    $('#quick-dash').html(JST['main/quick']());

    var renderedPost;

    _.each(Tumblr.userPosts.models, function(post){
      renderedPost = JST['posts/'+post.attributes.content_type]({
        username: post.get('username'),
        post: post.get('content'),
        avatar: "http://www.picgifs.com/avatars/avatars/fruit/avatars-fruit-081919.jpg"
      });
      $('posts').append(renderedPost);
    });
    this.addHandlers();


    Tumblr.currentPost = new Tumblr.Models.Post();

    window.onbeforeunload = function(e) {
      Tumblr.currentPost.save([], {async: false});
    };

    Tumblr.publishView = new Tumblr.Views.PublishView();
    this.quickdash = new Tumblr.Views.QuickView();
  },

  help: function() {
    $('mainwrapper').html(JST['top/help']());
    this.helpView = new Tumblr.Views.HelpView();
  },

  settings: function() {
    $('mainwrapper').html(JST['top/account']());
    this.accountView = new Tumblr.Views.AccountView();
  },

  logout: function() {
    document.cookie = '';
    Tumblr.router.login();
  }
});