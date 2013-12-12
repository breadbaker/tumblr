Tumblr.Views.MainView = Backbone.View.extend({
  initialize: function(){
    this.render();

  },

  template: JST['main/main'],

  events: {
    'loginholder .signin': 'signin',

    'loginholder .signup': 'signup'
  },

  addHandlers: function(){
    var that = this;
    $('papael').delegate('.changeMode','click', function(){
      that.toggleType();
    });
    $('papael').delegate('.signup', 'click', function(e){
      that.send(e);
    });
    $('papael').delegate('.signin', 'click', function(e){
      that.signin(e);
    });
  },

  render: function(){
    var that = this;
    Tumblr.papaEl.html(this.template({
    }));
  }
});