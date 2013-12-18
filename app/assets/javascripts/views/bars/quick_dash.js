Tumblr.Views.QuickView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
    Tumblr.currentPost = new Tumblr.Models.Post();

    window.onbeforeunload = function(e) {
      Tumblr.currentPost.save([], {async: false});
    };

    Tumblr.publishView = new Tumblr.Views.PublishView();
  },

  addHandlers: function() {
    var that = this;
    $('username').off();
    $('username').on( 'click',function(e){
      that.hideShow($('username p'),$('username input'));
    });
    $('username input').off();
    $('username input').blur(function(){
      that.nameChange();
    });
    $('quickitem').off();
    $('quickitem').on('click', function(e){
      that.postFormView($(e.currentTarget).attr('data-template'));
    });
    $('sidebar').undelegate('li.baritem','click');
    $('sidebar').delegate('.baritem','click',function(e){
      var action = $(this).attr('data-action');
      that[action].call(that);
    });
  },

  followers: function(){
    this.followers = new Tumblr.Collections.Followers();

    $()
    console.log('follo');
  },

  renderUsers: function(users) {

    $('maincontent').html('');
    var renderedUser;

    _.each(users.models, function(user){
      renderedUser = JST['user']({
        user: user
      });
      $('maincontent').append(renderedUser);
    });
  },

  members: function(){
    var that = this;

    $.ajax({
      type: 'GET',
      url: '/users',
      success: function(r) {
        that.members = new Tumblr.Collections.Members(r.users);
        that.follows = new Tumblr.Collections.Follows(r.follow_ids);
        that.renderUsers(that.members);
      },
      error: function(r) {
        that.messageFail("we have no users", 3000);
      }
    }) ;
  },

  nameChange: function(){
    var that = this;
    var name = $('username input').val().trim();
    if ( name == Tumblr.user.get('username')){
      return;
    }
    $.ajax({
      type: 'PUT',
      url: '/users/'+Tumblr.user.get('id'),
      data: { user: { name: name } },
      success: function(r) {
      Tumblr.user.set(r.user)
       that.messageSuccess(r.message, 1000);
       $('username p').html(name);
       that.hideShow($('username input'),$('username p'));
      },
      error: function(r) {
        that.messageFail(r.responseJSON.message, 3000);
      }
    }) ;
  },

  postFormView: function(template) {

    $('posttemplate').html( JST['form/'+ template ]())
    var postTypeViews = {
      'Text': function(){
        return new Tumblr.Views.TextView();
      },
      'Photo': function(){
        return new Tumblr.Views.PhotoView();
      },
      'Quote': function(){
        return new Tumblr.Views.QuoteView();
      },
      'Link': function(){
        return new Tumblr.Views.LinkView();
      }
    };
    Tumblr.postViewForm = postTypeViews[template]();

    this.unhide($('overlay.lowZ'));
    this.hideShow($('quickdashbubble'),$('posttemplate'),400);
  }
});