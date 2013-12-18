Tumblr.Routers.Main = Backbone.Router.extend({

  routes: {
    '':'posts',
    'users': 'posts',
    'login': 'login',
    'posts': 'posts',
    'blog/:id' : 'blog'
  },

  posts: function(){
    if(Tumblr.user.get('id')) {
      Tumblr.topView.dash();
    } else {
      this.login();
    }
  },

  login: function(){
    Tumblr.loginView.setBackground();
  },

  blog: function(id) {
    Tumblr.blogPosts = new Tumblr.Collections.Posts();
    Tumblr.blogPosts.url = '/users/'+ id;
    Tumblr.blogPosts.fetch({
     success: function(){
        blogView.render();
      },
      error: function(e){
        console.log(e)
      }
    });
    var blogView = new Tumblr.Views.BlogView();
  }
})