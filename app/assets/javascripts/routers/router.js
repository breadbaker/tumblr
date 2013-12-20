Tumblr.Routers.Main = Backbone.Router.extend({

  routes: {
    '':'posts',
    'users': 'posts',
    'login': 'login',
    'posts': 'posts',
    'blog/:id' : 'blog'
  },


  swapDisplay: function(el, action){
    $('.top-level').addClass('hidden');
    setTimeout( function(){
      $('.top-level').addClass('hide');
      el.removeClass('hide');
      el.removeClass('hidden');
      if( action){
        action();
      }
    }, 400);
  },


  posts: function(){
    if(Tumblr.user.get('id')) {

      this.swapDisplay($('topdashview'),
       function(){
         Tumblr.topView.dash();
       });
    } else {
      this.login();
    }
  },

  login: function(){
    Tumblr.loginView.setBackground();
    this.swapDisplay($('loginview'));

  },

  blog: function(id) {
    var that = this;

    $.ajax({
      url: '/users/'+id,
      type: 'GET',
      success: function(resp){
        Tumblr.blogPosts = new Tumblr.Collections.Posts(resp.posts);
        Tumblr.blogUser = new Tumblr.Models.User(resp.user);
        Tumblr.blogView.render();
        that.swapDisplay($('blogview'));

      },
      error: function(){
        console.log('noblog');
      }
    });
  }
})