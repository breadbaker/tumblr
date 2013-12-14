
//
// Tumblr.Views.TextView = Backbone.View.extend({
//   initialize: function(){
//     this.addHandlers();
//     this.displayarea = $('textpostform textarea')
//     $('texttextarea').attr('contenteditable',true);
//
//     this.converter = new Showdown.converter();
//
//     this.currentEl = false;
//
//     this.position = 0;
//
//     this.oldWrapper = '';
//     this.wrapper = '';
//     this.buffer = '';
//
//     this.textContent = '';
//
//     $('texttextarea').append(this.currentEl);
//
//     console.log(this.converter.makeHtml('**hello**'));
//
//   },
//
//   getCaretCharacterOffsetWithin: function(element) {
//       var caretOffset = 0;
//       if (typeof window.getSelection != "undefined") {
//           var range = window.getSelection().getRangeAt(0);
//           var preCaretRange = range.cloneRange();
//           preCaretRange.selectNodeContents(element);
//           preCaretRange.setEnd(range.endContainer, range.endOffset);
//           caretOffset = preCaretRange.toString().length;
//       } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
//           var textRange = document.selection.createRange();
//           var preCaretTextRange = document.body.createTextRange();
//           preCaretTextRange.moveToElementText(element);
//           preCaretTextRange.setEndPoint("EndToEnd", textRange);
//           caretOffset = preCaretTextRange.text.length;
//       }
//       return caretOffset;
//   },
//
//   // events: {
// //     'keydown texttextarea': 'newChar',
// //     'click quickitem': 'postForm'
// //   },
//
//   newChar: function(e) {
//
//     this.position = this.getCaretCharacterOffsetWithin(document.getElementsByTagName('texttextarea')[0]);
//     e.preventDefault();
//
//     console.log(e);
//
//     if ( e.keyCode == 16 ){
//       this.shift = this.shift == true ? false : true;
//       return;
//     }
//
//     var realChar = this.mapKeyPressToActualCharacter(e.keyCode);
//     if (!realChar) {
//       return;
//     }
//
//     console.log(realChar, 'char');
//
//
//     this.textContent = this.textContent.splice( this.position, 0 , this.buffer +realChar);
//     this.buffer = '';
//
//     console.log(this.textContent);
//
//     $('texttextarea').html(this.converter.makeHtml(this.textContent));
//
//     t = document.getElementsByTagName('texttextarea');
//     cursorManager.setEndOfContenteditable(t[0]);
//     return;
//
//     if ( this.wrapper != '' || !this.currentEl) {
//       this.createTextEl(realChar);
//     } else {
//       this.addToBaseChild(realChar);
//     }
//
//     //this.findFocus();
//   },
//
//   createTextEl: function(c) {
//     this.currentEl = $(this.converter.makeHtml(c));
//     $('texttextarea').append(this.currentEl);
//   },
//
//   addToBaseChild: function(c) {
//
//   },
//
//   addHandlers: function() {
//     var that = this;
//     $('texttextarea').on('keydown', function(e){
//       that.newChar(e);
//     });
//     $('textoptions').delegate('li','click', function(e){
//       var action = $(e.currentTarget).attr('data-action');
//       that[action]();
//     });
//   },
//
//   embolden: function() {
//     console.log(this.getSelectionHtml());
//
//   },
//
//   getSelectionHtml: function() {
//       var html = "";
//       if (typeof window.getSelection != "undefined") {
//           var sel = window.getSelection();
//           if (sel.rangeCount) {
//               var container = document.createElement("div");
//               for (var i = 0, len = sel.rangeCount; i < len; ++i) {
//                   container.appendChild(sel.getRangeAt(i).cloneContents());
//               }
//               html = container.innerHTML;
//           }
//       } else if (typeof document.selection != "undefined") {
//           if (document.selection.type == "Text") {
//               html = document.selection.createRange().htmlText;
//           }
//       }
//       console.log(html);
//   },
//
//
//
//   postForm: function(e) {
//     this.hideShow($('quickdashbubble'),$('textpostform'),1000);
//
//     console.log(e);
//   },
//
//   mapKeyPressToActualCharacter: function(characterCode) {
//       if ( characterCode === 27 || characterCode === 8 || characterCode === 9 || characterCode === 20 || characterCode === 16 || characterCode === 17 || characterCode === 91 ||  characterCode === 92 || characterCode === 18 ) {
//           return false;
//       }
//       if (characterCode === 13)
//       {
//         this.buffer = '\n';
//         this.textContent += "\n";
//         this.textContent += '';
//         return '';
//       }
//       if (typeof characterCode != "number") {
//           return false;
//       }
//       var characterMap = [];
//       characterMap[13] = '\\n\\n';
//       characterMap[192] = "~";
//       characterMap[49] = "!";
//       characterMap[50] = "@";
//       characterMap[51] = "#";
//       characterMap[52] = "$";
//       characterMap[53] = "%";
//       characterMap[54] = "^";
//       characterMap[55] = "&";
//       characterMap[56] = "*";
//       characterMap[57] = "(";
//       characterMap[48] = ")";
//       characterMap[109] = "_";
//       characterMap[107] = "+";
//       characterMap[219] = "{";
//       characterMap[221] = "}";
//       characterMap[220] = "|";
//       characterMap[59] = ":";
//       characterMap[222] = "\"";
//       characterMap[188] = "<";
//       characterMap[190] = ">";
//       characterMap[191] = "?";
//       characterMap[32] = " ";
//       var character = "";
//       if (this.shift) {
//           if ( characterCode >= 65 && characterCode <= 90 ) {
//               character = String.fromCharCode(characterCode);
//           } else {
//               character = characterMap[characterCode];
//           }
//       } else {
//           if ( characterCode >= 65 && characterCode <= 90 ) {
//               character = String.fromCharCode(characterCode).toLowerCase();
//           } else {
//               character = String.fromCharCode(characterCode);
//           }
//       }
//       return character;
//   }
// });