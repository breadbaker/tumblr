window.Tumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Tumblr.user = new Tumblr.Models.User();
    Tumblr.blogView = new Tumblr.Views.BlogView();
    Tumblr.loginView = new Tumblr.Views.LoginView();
    Tumblr.router = new Tumblr.Routers.Main();
    window.location.hash = '';
    Backbone.history.start();
    
  
  }
};

$(document).ready(function(){
  Tumblr.initialize();
});
