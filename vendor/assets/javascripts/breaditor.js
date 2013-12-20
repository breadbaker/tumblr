


(function () {
  var root = this;

  var _ = root._;
  var DE = root.DE = {};
  var Editor = DE.Editor = function(opts){
    this.initialize(opts);
  };

  _.extend(Editor.prototype, {
    initialize : function(opts){

      this.main = opts['mainAreaSelector'];

      $(this.main).attr('contenteditable', true);
      this.addHandlers();

      this.coreActions = [
        'bold',
        'italic',
        'strikethrough',
        'insertorderedlist',
        'insertunorderedlist'
      ];
      this.specActions = ['unlink','html','linkForm'];

      var that = this;
      setTimeout( function(){
        that.setCursorOnMain();
      },1000);
    },

    content: function() {
      return $(this.main).html();
    },

    addHandlers: function() {
      var that = this;
      $('textoptions ul li').off('mousedown');
      $('textoptions ul li').on('mousedown', function(e) {
        e.preventDefault();
        var item = $(e.currentTarget);
        if  ( !that.actionReady(item)){
          return;
        }
        var action = item.attr('data-action');
        if(_.include(that.coreActions, action)) {
          that.toggleCommandActive(item);
          document.execCommand(action);
        } else if(_.include(that.specActions, action)){
          that.specAction(item, action)
        }
      });
      $(this.main).off('selectstart');
      $(this.main).on('selectstart', function () {
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
      $('linkform, linkform *').on('click',function(e){
        return false;
      });

      $('linkform button').off('click');
      $('linkform button').on('click', function(e) {
        e.preventDefault();
        if( $('specbox input.url').val() != '' ) {
          that.restoreSelection();
          console.log(document.execCommand("createLink", false, $('linkform input').val()));
          $('linkform').addClass('hide');
          //range.parentElement().setAttribute("target", "_blank");
        }
        return false;
      });
    },

    actionReady: function(item) {
      if (!item.hasClass('available') || item.hasClass('tempunavailable')) {
        return false;
      }
      return true;
    },

    setCursorOnMain: function() {
      var el = document.getElementsByTagName('texttextarea')[0];
      var range = document.createRange();
      var sel = document.getSelection();
      range.setStart(el.childNodes[0], 0);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
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

    baseChild: function(parent, last) {
      var children = parent.childNodes.length;
      if (children == 0) {
        return parent;
      }
      var child = (last == true) ? children-1 : 0;

      return this.baseChild( parent.childNodes[child]);
    },

    findAndRemove: function(node) {
      while (node && node.nodeName !== 'A'){ // find closest link - might be self
        node = node.parentNode;
      }

      if (node){ // if link found
        var range = document.createRange(); //create a new range
        range.selectNodeContents(node); // set range to content of link
        this.currentSelection.addRange(range); // change the selection to the link
        document.execCommand('unlink'); // unlink it
        if ( node.previousSibling ){
          this.findAndRemove(this.baseChild(node.previousSibling, true));
        }
        if ( node.nextSibling ){
          this.findAndRemove(this.baseChild(node.nextSibling, false ));
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

    showSpecForm: function(form) {
      var that = this;
      var hideForm = function(){
        form.addClass('hide');
        $('.needstring').removeClass('available');
        $('.needstring').addClass('unavailable');
        //$('body').off('click',this);
      }
      form.removeClass('hide');
      setTimeout( function(){
        $('body').one('click', hideForm);
      },200);
    },

    specAction : function(item, action){
      var that = this;
      actions = {
        'linkForm': function(item) {
          that.showSpecForm($('linkform'));
        },
        'unlink': function(){
          that.currentSelection = document.getSelection(); // get selection
          var node = that.currentSelection.anchorNode; // get containing node

          that.findAndRemove(node);
        },
        'html': function(item, action){
          that.toggleCommandActive(item);
          if( $('#htmlEdit').hasClass('hidden') ) {
            $('li.available').addClass('tempunavailable');
            item.removeClass('tempunavailable');
            $('#htmlEdit').val($(that.main).html());
            that.hideShow($(that.main),$("#htmlEdit"));
          } else {
            $('li.tempunavailable').removeClass('tempunavailable');
            $(that.main).html($('#htmlEdit').val());
            that.hideShow($("#htmlEdit"), $(that.main));
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




}).call(this);

Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {};
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
};



//photo upload module
(function () {

  var root = this;

  var _ = root._;
  var DE = root.DE;
  var Editor = DE.Editor;

  var PhotoEditor = DE.PhotoEditor = function(opts){
    this.initialize(opts);
  };

  PhotoEditor.inherits(Editor);

  _.extend(PhotoEditor.prototype, {
    initialize: function(opts){
      this.postUrl = opts['postUrl']
      this.data = opts['data'];
      Editor.prototype.initialize.call(this, opts);
      Editor.prototype.addHandlers.call(this);
    },

    addHandlers: function(){
      var that = this;
      $('#new-photo-icon').off('click');
      $('#new-photo-icon').on('click',function(){
        if (that.actionReady($(this))){
          $('#new-photo-src').click();
        }
      });
      $('#new-photo-src').off('change');
      $('#new-photo-src').on('change',function(){
        $('imageprogressbar').removeClass('hide');
        that.newPhotoSrc(this);
      });
    },

    newPhotoSrc: function(input) {
      var that = this;
      if (input.files && input.files[0])
  		  {
          var reader = new FileReader();

          reader.onload = function (e) {

            that.data['image'] = e.target.result;
            $.ajax({
              url: that.postUrl,
              type: "POST",
              data: {photo: that.data},
              success: function(r) {
                var img = $('<img src =' + r.url + '>');
                var div = $('<div>');
                div.append(img);
                $(that.main).append(div);
                $('imageprogressbar').addClass('hide');

                $("progressmeter").width('0%');
                $("imageprogressbar p").html('Progress: 0%');
              },
              beforeSend: function(req, settings) {
                settings.xhr = function() {
                  var xhr = $.ajaxSettings.xhr();
                  if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function(event) {
                      var percent = 0;
                      var position = event.loaded || event.position; /*event.position is deprecated*/
                      var total = event.total;
                      if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                      }
                      $("progressmeter").width(percent+'%');
                      console.log(percent);
                      $("imageprogressbar p").html('Progress: '+percent+'%');
                    }, false);
                  }
                  return xhr;
                };
              },

              error: function(e){
                console.log(e);
              }
            });
          };

          reader.readAsDataURL(input.files[0]);
        }
      }
    });
}());

