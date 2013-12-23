Tumblr.Views.LoginView = Backbone.View.extend({
  initialize: function(){
    this.subTemplate = JST['out/signup'];
    this.template = JST['out/outside'];
    this.url = '/users';
    this.addHandlers();
    this.checkSignedIn();
  },

  checkSignedIn: function() {
    var that = this;
    $.ajax({
      type: 'POST',
			data: { 'user': { 'email': 'fake1@fake.com', 'password': 'password'}},
      url: '/sessions',
      success: function(resp) {
        that.setup(resp);
      }
    });
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
    var index = Math.floor(Math.random() * (18));
    return this.background.at(index).get('url');
  },

  login: function() {


  },

  setup: function(resp){
    if( resp.user ){
      Tumblr.user.set(resp.user)
      Tumblr.followees = new Tumblr.Collections.Followees(resp.followees);
      Tumblr.followers = new Tumblr.Collections.Followers(resp.followers);
      Tumblr.userPosts = new Tumblr.Collections.Posts();
      Tumblr.userPosts.fetch({
        success: function(){
            Tumblr.user.set(resp.user);
            Tumblr.followedUsers = new Tumblr.Collections.FollowedUsers(resp.followees);
            Tumblr.topView = new Tumblr.Views.TopView();
            Tumblr.router.posts();
            $('loginview').html('');
        },
        error: function(){

          that.toggleType();
        }
      });
    }
  },

  send: function(){
    var that = this;
    var data = $('roundform').parent().serializeJSON();
    $.ajax({
      type: 'POST',
      url: that.url,
      data: data,
      success: function(resp) {
        that.setup(resp);
      },
      error: function(r) {
        console.log(r);
        that.messageFail("Invalid Login", 3000);
      }
    });
  },

  addHandlers: function(){
    var that = this;
    $('loginview').undelegate('.changeMode','click');
    $('loginview').delegate('.changeMode','click', function(){
      that.toggleType();
    });
    $('loginview').undelegate('.signup','click');
    $('loginview').delegate('.signup', 'click', function(e){
      that.send();
       e.preventDefault();
    });
    $('loginview').delegate('roundfrom input', 'keypress', function(e){
      if (e.keyCode == 13){
        e.preventDefault();
        that.send();
      }
    })
    $('loginview').undelegate('.signin','click');
    $('loginview').delegate('.signin', 'click', function(e){
      that.send();
      e.preventDefault();
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
      this.url = '/sessions';
    } else {
      this.subTemplate = JST['out/signup'];
      this.url = '/users';
    }
    var that = this;
    this.render();
  },

  render: function(){
    var that = this;
    $('loginview').html(this.template({
      subTemplate: that.subTemplate(),
      background: that.currentBackground()
    }));

  }
});
