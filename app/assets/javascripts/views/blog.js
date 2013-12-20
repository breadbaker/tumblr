Tumblr.Views.BlogView = Backbone.View.extend({

  initialize: function(){
    var that = this;
    setTimeout( function(){
      $('.top-level').addClass('hidden');
      that.messageNotify(' Thanks for watching my presentation!',5000);
    }, 110000)
  },

  render: function(){

    $('blogview').html(JST['blog/main']({
      user: Tumblr.blogUser
    }));

    var renderedPost;

    _.each(Tumblr.blogPosts.models, function(post){
      renderedPost = JST['blog/post/'+post.get('content_type')]({
        post: post.get('content')
      });
      $('posts').append(renderedPost);
    });
  }
});