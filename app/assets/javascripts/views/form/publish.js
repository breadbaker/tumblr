Tumblr.Views.PublishView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
  },

  publishOptions: function(e) {
    console.log(e);
    console.log('op');
    var that = this;
    $('publishoptions').removeClass('hide');
    $(document).not($('publishoptions')).off();
  },

  publishNow: function(li) {
    this.showPublishItem(li);
    $('postbutton span').html('Publish');
  },

  showPublishItem: function(li){
    $('publishoptions ul li i').addClass('hidden');
    li.find('i').removeClass('hidden');
  },

  privatize: function(li) {
    this.showPublishItem(li);
    $('postbutton span').html('Create Private Post');
  },

  previewNow: function(){
    console.log('pre');
  },

  save: function(){
    var that = this;
    Tumblr.currentPost.save({},
    {
      success: function(e){
        that.hide($('overlay.lowZ'));
        that.hideShow($('posttemplate'),$('quickdashbubble'),400);
        that.empty($('posttemplate'),400);
        Tumblr.postViewForm = null;
      },
      error: function(e){
        console.log(e);
        console.log('fail');
      },
    });
  },

  addHandlers: function() {
    var that = this;
    $('posttemplate').undelegate('iconbutton', 'mousup');
    $('posttemplate').delegate('iconbutton', 'mouseup', function(e){
      that.publishOptions(e);
      $(document).not($('publishoptions')).on('mousedown', function(e){
        $('publishoptions').addClass('hide');
      });

      $('publishoptions').children().off();

      $("publishoptions").children().on("mousedown", function(e) {
        try {
          var target = $(e.target)
          var action = target.attr('data-action');

          that[action].call(that,target);
        }
        catch(e) {}
        $('publishoptions').addClass('hide');
        return false;
      });
    });
  }
});