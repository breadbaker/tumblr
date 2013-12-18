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

  empty: function(el,time){
    setTimeout(function(){
      el.html('')
    }, time);
  },

  hideShow: function(el1, el2, time){
    this.hide(el1,time);
    var that = this;
    setTimeout(
      function(){
        that.unhide(el2,time);
      }
      , time);
  },

  messageSuccess: function(m, time) {
    $('successmessenger').html(m);
    var that = this;
    this.unhide($('successmessenger'),200);
    setTimeout(
      function(){
        that.hide($('successmessenger'),200);
      }, time);
  },
  messageFail: function(m,time) {
    $('failmessenger').html(m);
    var that = this;
    this.unhide($('failmessenger'),200);
    setTimeout(
      function(){
        that.hide($('failmessenger'),200);
      }, time);
  },
  messageNotify: function(m,time) {

    $('messenger').html(m);
    var that = this;
    this.unhide($('messenger'),200);
    setTimeout(
      function(){
        that.hide($('messenger'),200);
      }, time);
  }
});