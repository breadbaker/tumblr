Tumblr.Views.QuickView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
    this.textView = new Tumblr.Views.TextView();


  },

  events: {
    'click quickitem': 'postForm'
  },

  addHandlers: function() {
    var that = this;
    $('quickitem').on('click', function(e){
      that.postForm(e);
    });
  },

  postForm: function(e) {
    this.hideShow($('quickdashbubble'),$('textpostform'),400);


    // setTimeout( function(){
//       new nicEditor({fullPanel : true}).panelInstance('myArea1',{hasPanel : true});
//     },800);
//     console.log(e);
  }
});