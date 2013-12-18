Tumblr.Views.AccountView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
  },

  save: function(){
    var that = this;
    var userdata = $('accountview').find('form').serializeJSON();
    $.ajax({
      type: 'PUT',
      url: '/users/'+Tumblr.user.get('id'),
      data: userdata,
      success: function(r) {
      Tumblr.user.set(r.user)
       that.messageSuccess(r.message, 1000);
       $($('accountview').find('form')).reset();
      },
      error: function(r) {
        that.messageFail(r.responseJSON.message, 3000);
      }
    }) ;
  },

  addHandlers: function() {
    var that = this;
    $('accountview').undelegate('input','keypress');
    $('accountview').delegate('input','keypress',function(){
      $('saveaccountbutton').removeClass('dim-text');
    });
    $('accountview').undelegate('saveaccountbutton','click');
    $('accountview').delegate('saveaccountbutton','click', function(){
      if(!$(this).hasClass('dim-text')){
        that.save();
      }
    });
  }
});