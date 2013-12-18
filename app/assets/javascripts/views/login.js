Tumblr.Views.LoginView = Backbone.View.extend({
  initialize: function(){
    this.subTemplate = JST['out/signup'];
    this.template = JST['out/outside'];
    this.url = '/users';
    this.url = '/sessions';
    this.addHandlers();
    this.send({});
  },

  setBackground: function(){
    var that = this;
    if (!this.background) {
      this.background = new Tumblr.Collections.Background();
      this.background.fetch({
        success: function(){

          that.render();
        }
      });
    } else {
      this.render();
    }
  },

  currentBackground: function() {
    var index = Math.floor(Math.random() * (100));
    return this.background.at(index).get('url');
  },

  login: function() {


  },

  send: function(data){
    var that = this;
    $.post(this.url, data, function(resp){
      console.log(resp);
      if( resp.user ){
        Tumblr.user.set(resp.user)
        Tumblr.userPosts = new Tumblr.Collections.Posts();
        Tumblr.userPosts.fetch({
          success: function(){
              Tumblr.user.set(resp.user);
              Tumblr.topView = new Tumblr.Views.TopView();
          },
          error: function(){
            console.log('nologin');
            that.setBackground();
          }
        });
      } else {
        that.setBackground();
      }
    });
  },

  addHandlers: function(){
    var that = this;
    $('papael').undelegate('.changeMode','click');
    $('papael').delegate('.changeMode','click', function(){
      that.toggleType();
    });
    $('papael').undelegate('.signup','click');
    $('papael').delegate('.signup', 'click', function(e){
      that.send(e);
    });
    $('papapel').undelegate('.signin','click');
    $('papael').delegate('.signin', 'click', function(e){
      that.signin(e);
    });
  },

  signin: function(e){
    e.preventDefault();
    var data = $(e.currentTarget).parent().serializeJSON();
    this.send(data);
  },

  toggleType: function(){
    if(this.subTemplate == JST['out/signup']) {
      this.subTemplate = JST['out/signin'];
    } else {
      this.subTemplate = JST['out/signup'];
    }
    var that = this;
    this.render();
  },

  render: function(){
    var that = this;
    Tumblr.papaEl.html(this.template({
      subTemplate: that.subTemplate(),
      background: that.currentBackground()
    }));

  }
});