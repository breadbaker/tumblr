Tumblr.Routers.Main = Backbone.Router.extend({

  routes: {
    'login': 'login',
    'posts': 'posts'
  },

  posts: function(){
    var mainView = new Tumblr.Views.MainView();
  },

  login: function(){
    var loginView = new Tumblr.Views.LoginView();
  }
})