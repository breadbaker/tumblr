Tumblr.Views.LoginView = Backbone.View.extend({
  initialize: function(){
    this.subTemplate = JST['out/signup'];
    this.template = JST['out/outside'];
    this.background = new Tumblr.Collections.Background();
    this.url = '/users';


    var that = this;
    this.background.fetch({
      success: function(){
        that.render();
        that.addHandlers();
      }
    });

  },

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

  signin: function(e){
    this.url = '/sessions'
    this.send(e);
  },

  send: function(e){
    e.preventDefault();
    var data = $(e.currentTarget).parent().serializeJSON();
    console.log('posting');
    $.post(this.url, data, function(resp){
      Tumblr.user.set(resp.user)
      Tumblr.userPosts.fetch({
        success: function(){
          Tumblr.router.posts();
        }
      });
    });
  },

  toggleType: function(){
    if(this.subTemplate == JST['out/signup']) {
      this.subTemplate = JST['out/signin'];
    } else {
      this.subTemplate = JST['out/signup'];
    }
    var that = this;
    this.background.fetch({
      success: function(){
        that.render();
      }
    });
  },

  render: function(){
    var that = this;
    Tumblr.papaEl.html(this.template({
      subTemplate: that.subTemplate(),
      background: that.background.at(0).get('url')
    }));
  }
});