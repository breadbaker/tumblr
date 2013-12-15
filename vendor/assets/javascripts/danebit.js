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
        that.toggleCommandActive(item);
        var action = item.attr('data-action');
        if(that.specCommands[action]) {
          console.log('spec');
        } else {

          document.execCommand(action);

          that.contextExec(action);
         // document.execCommand(action);
        }
      });

      // _.each(['focus'], function(eventType){
//         $('texttextarea').on( eventType, function(e){
//           that.toggleCommands();
//         });
//       })


    },

    liveCommands: [],

    specCommands : {
      'link': function(){

      },
      'unlink': function(){

      },
      'photo': function(){

      },
      'html': function(){

      }
    },

    contextExec: function(action) {
      $('texttextarea').focus();
    },

    toggleCommands: function(){
      _.each(this.liveCommands, function(command){
        // var s = document.getSelection();
//         var n = document.getElementsByTagName('texttextarea')[0];
//         s.addRange(document.createRange().selectNode(n));
        document.execCommand(command);
        console.log('exec', command);
      });
    },

    toggleCommandActive: function(command){

      if (_.include(this.liveCommands, command))  {
        this.liveCommands = _.without(this.liveCommands, command);
      } else {
        this.liveCommands.push(command);
      }

      console.log(this.liveCommands);
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