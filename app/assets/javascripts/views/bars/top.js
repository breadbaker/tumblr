Tumblr.Views.TopView = Backbone.View.extend({
  initialize: function(){
    $('topdashview').html(JST['main/main']);
    this.addHandlers();
    Tumblr.publishView = new Tumblr.Views.PublishView();

    this.accountView = new Tumblr.Views.AccountView();
    //this.helpView = new Tumblr.Views.HelpView();

    this.renderPosts();
    Tumblr.currentPost = new Tumblr.Models.Post();
    window.onbeforeunload = function(e) {
      Tumblr.currentPost.save([], {async: false});
    };
  },

  renderPosts: function() {
    var renderedPost;
    $('posts').html('');
    var avatar;
    _.each(Tumblr.userPosts.models, function(post){
      if (Tumblr.followedUsers.get(post.get('user_id'))){
        avatar = Tumblr.followedUsers.get(post.get('user_id')).get('avatar');
      } else {
        avatar = Tumblr.user.get('avatar');
      }
      renderedPost = JST['posts/'+post.attributes.content_type]({
        username: post.get('username'),
        post: post.get('content'),
        date: post.get('post_date'),
        avatar: avatar
      });
      $('posts').append(renderedPost);
    });
  },

  addHandlers: function() {
    var that = this;
    $('topdashview').delegate('topitem','click', function(e){
      try {
        var target = $(e.target).closest('topitem');
        $('topitem').removeClass('active');
        target.addClass('active');
        var action = target.attr('data-action');

        that[action].call(that,target);
      }
      catch(e) {}
    });
  },

  dash: function() {
    $('maincontent').html( JST['main/quick']());
    this.quickdash = new Tumblr.Views.QuickView();
    this.renderPosts();
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