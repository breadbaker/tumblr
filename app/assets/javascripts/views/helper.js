_.extend(Backbone.View.prototype, {
  hide: function(el, time) {
    el.addClass('hidden');
    setTimeout(
      function(){
        el.addClass('hide');
      }
      , time);
  },
  unhide: function(el, time) {
    el.removeClass('hide');
    setTimeout(
      function(){
        el.removeClass('hidden');
      }
      , time);
  },

  hideShow: function(el1, el2, time){
    this.hide(el1,time);
    var that = this;
    setTimeout(
      function(){
        that.unhide(el2,time);
      }
      , time);
  }
});