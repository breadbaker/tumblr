Tumblr.Views.QuickView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
    Tumblr.currentPost = new Tumblr.Models.Post();

    window.onbeforeunload = function(e) {
      Tumblr.currentPost.save([], {async: false});
    };

    Tumblr.publishView = new Tumblr.Views.PublishView();

    this.followedLinks();
    var that = this;
    this.listenTo(Tumblr.followees, 'add', function(){that.renderUsers()});
    this.listenTo(Tumblr.followees, 'remove', function(){that.renderUsers()});
    this.listenTo(Tumblr.followees, 'add', function(){that.followedLinks()});
    this.listenTo(Tumblr.followees, 'remove', function(){that.followedLinks()});
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

    $('mainwrapper').undelegate('.all-users button', 'click');
    $('mainwrapper').delegate('.all-users button', 'click',function(e){
      var action = $(this).attr('data-action');
      var id = $(this).closest('div').attr('data-id');
      that[action].call(that, id);
    });
  },

  followers: function(){
    this.renderFollowers();
  },

  followedLinks: function(){
    $('.followed-links').html('');

    var renderedLink;

    _.each(Tumblr.followees.models, function(user){
      renderedLink = JST['user/link']({
        user: user
      });
      $('.followed-links').append(renderedLink);
    });

  },

  renderUsers: function() {


    $('maincontent').html(JST['user/user-holder']({
      title: 'All Users'
    }));

    var renderedUser;

    _.each(Tumblr.members.models, function(user){
      renderedUser = JST['user/user']({
        user: user,
        following: Tumblr.followees.get(user.get('id')) ? true : false,
        follower: Tumblr.followers.get(user.get('id')) ? true : false
      });
      $('.all-users').append(renderedUser);
    });
  },

  follow: function(id) {
    $.post('/follow/'+id, function(){ Tumblr.followees.add(Tumblr.members.get(id))});
  },

  unfollow: function(id) {
    $.post('/unfollow/'+id, function(){ Tumblr.followees.remove(Tumblr.members.get(id))});
  },

  members: function(){
    var that = this;

    $.ajax({
      type: 'GET',
      url: '/users',
      success: function(r) {
        //Tumblr.follow_ids = new Tumblr.Collections.Follows(r.follow_ids);
        Tumblr.members = new Tumblr.Collections.Members(r.users);
        that.renderUsers();
      },
      error: function(r) {
        that.messageFail("we have no users", 3000);
      }
    }) ;
  },

  renderFollowers: function() {

    $('maincontent').html(JST['user/user-holder']({
      title: 'Followers'
    }));

    var renderedFollower;

    _.each(Tumblr.followers.models, function(user){
      renderedFollower = JST['user/user']({
        user: user,
        following: Tumblr.followees.get(user.get('id')) ? true : false,
        follower: Tumblr.followers.get(user.get('id')) ? true : false
      });
      $('.all-users').append(renderedFollower);
    });
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