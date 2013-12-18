Tumblr.Views.BlogView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){

    $('papael').html(JST['blog/main']);

    var renderedPost;

    _.each(Tumblr.userPosts.models, function(post){
      renderedPost = JST['blog/post/'+post.attributes.content_type]({
        post: post.get('content')
      });
      $('posts').append(renderedPost);
    });
  }
});