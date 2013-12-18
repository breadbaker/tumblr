window.Tumblr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Tumblr.user = new Tumblr.Models.User();

    Tumblr.papaEl = $('papael');

    Tumblr.user = new Tumblr.Models.User();

    Tumblr.router = new Tumblr.Routers.Main();
    Tumblr.loginView = new Tumblr.Views.LoginView();



    Backbone.history.start();
  }
};

$(document).ready(function(){
  Tumblr.initialize();
});
