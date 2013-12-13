Tumblr.Views.MainView = Backbone.View.extend({
  initialize: function(){
    this.render();
    this.quickdash = new Tumblr.Views.QuickView();

    $("#logout").on('click',function(){
      document.cookie = '';
      Tumblr.router.login();
    });
  },

  logout: function(){

  },

  render: function(){

    $('papael').html(JST['main/main']);

    $('#quick-dash').html(JST['main/quick']());

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