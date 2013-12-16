(function () {
  var root = this;

  var _ = root._;
  var DE = root.DE = {};
  var Editor = DE.Editor = function(){
    this.initialize();
  };

  _.extend(Editor.prototype, {
    initialize : function(){
      var that = this;
      $('textoptions ul li').on('mousedown', function(e) {
        e.preventDefault();
        var item = $(e.currentTarget);
        if (!item.hasClass('available')) {
          return;
        }
        that.toggleCommandActive(item);
        var action = item.attr('data-action');
        if(!that.specCommands(item, action) ) {
          document.execCommand(action);
        }
      });



      $('texttextarea').on('selectstart', function () {
          $(document).one('mouseup', function() {
            var s = this.getSelection();
            if ( s.toString().length > 0 ) {
              that.saveSelection();
              $('.needstring').addClass('available');
              $('.needstring').removeClass('unavailable');
            } else {
              $('.needstring').removeClass('available');
              $('.needstring').addClass('unavailable');
            }
          });
      });

      $('specbox button').on('click', function(e) {
        e.preventDefault();
        if( $('specbox input.url').val() != '' ) {
          that.restoreSelection();
          console.log(document.execCommand("createLink", false, $('specbox input.url').val()));
          that.toggleSpecbox();
          //range.parentElement().setAttribute("target", "_blank");
        }
      });
    },

    saveSelection: function() {
      var that = this;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                that.currentRange = sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            that.currentRange = document.selection.createRange();
        }
        return null;
    },

    restoreSelection: function() {
      var range = this.currentRange;
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    },

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
    },

    toggleSpecbox: function() {
      var that = this;

      if ($('specbox').hasClass('modal_active') ) {
        $('overlay').addClass('hidden');
        this.hide($('specbox'), 100);
        $('specbox').addClass('modal_active');
        this.toggleCommandActive($('.new-link-form'));
        $('.needstring').removeClass('available');
        $('.needstring').addClass('unavailable');

      } else {
        $('overlay').removeClass('hidden');
        that.unhide($('specbox'), 100);
        $('specbox').addClass('modal_active');
        $('overlay').on('click', function() {
          $('overlay').unbind();
          that.toggleSpecbox();
        });
      }
    },

    specCommands : function(item, action){
      var that = this;
      actions = {
        'link': function(){
          document.execCommand(action);
          that.toggleCommandActive(item);
        },
        'linkForm': function() {
          that.toggleSpecbox();
        },
        'unlink': function(){

        },
        'photo': function(){

        },
        'html': function(item, action){
          if( $('#htmlEdit').hasClass('hidden') ) {
            $('li.available').addClass('tempunavailable');
            item.removeClass('tempunavailable');
            $('#htmlEdit').html($('texttextarea').html());
            that.hideShow($('texttextarea'),$("#htmlEdit"));
          } else {
            $('li.tempunavailable').removeClass('tempunavailable');
            $('texttextarea').html($('#htmlEdit').val());
            that.hideShow($("#htmlEdit"), $('texttextarea'));
          }
        }
      };
      if( actions[action]) {
        actions[action](item, action);
        return true;
      }  else {
        return false;
      }
    },

    toggleCommandActive: function(li) {
      if (li.hasClass('activated')) {
        li.removeClass('activated');
      } else {
        li.addClass('activated');
      }
    },

  });



  var selection = document.getSelection(); // get selection
  var node = selection.anchorNode; // get containing node


  var baseChild = function(parent, last) {
    var children = parent.childNodes.length;
    if (children == 0) {
      return parent;
    }
    var child = (last == true) ? children-1 : 0;

    return baseChild( parent.childNodes(child));
  }

  var findAndRemove = function(node) {

    while (node && node.nodeName !== 'A'){ // find closest link - might be self
      node = node.parentNode;
    }

    if (node){ // if link found
      var range = document.createRange(); //create a new range
      range.selectNodeContents(node); // set range to content of link
      selection.addRange(range); // change the selection to the link
      document.execCommand('unlink'); // unlink it
      if ( node.previousSibling ){
        findAndRemove(baseChild(node.previousSibling, true));
      }
      if ( node.nextSibling ){
        findAndRemove(baseChild(node.nextSibling, false ));
      }
    }
  }
  findAndRemove(node);

  var main = DE.main = function() {

  }
  var bold = DE.bold = function() {
    console.log('bold');
  }
  // var func1 = LongLibraryName.func1 = function () {
//     // do work
//   }
//
//   var func2 = LongLibraryName.func2 = function () {
//     func1();
//     func1();
//     func1();
//   }
}).call(this);