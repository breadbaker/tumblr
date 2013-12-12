Tumblr.Views.MainView = Backbone.View.extend({
  initialize: function(){
    this.render();

  },

  render: function(){

    $('papael').html(JST['main/main']);

    var renderedPost;

    _.each(Tumblr.userPosts.models, function(post){
      renderedPost = JST['posts/'+post.attributes.content_type]({
        post: post.get('content'),
        avatar: "http://www.picgifs.com/avatars/avatars/fruit/avatars-fruit-081919.jpg"
      });
      $('maincontent').append(renderedPost);
    });
  }
});