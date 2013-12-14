

Tumblr.Views.TextView = Backbone.View.extend({
  initialize: function(){
    //bkLib.onDomLoaded(function(){ nicEditors.allTextAreas();});
    this.addHandlers();
    this.displayarea = $('textpostform textarea')
    $('texttextarea').attr('contenteditable',true);

    this.converter = new Showdown.converter();

    this.currentEl = false;

    this.position = 0;

    this.oldWrapper = '';
    this.wrapper = '';
    this.buffer = '';

    this.textContent = '';

    $('texttextarea').append(this.currentEl);

    console.log(this.converter.makeHtml('**hello**'));

  },

  addHandlers: function() {
    var that = this;
    $('texttextarea').on('keydown', function(e){
      that.newChar(e);
    });
    $('textoptions').delegate('li','click', function(e){
      var action = $(e.currentTarget).attr('data-action');
      that[action]();
    });
  },

  photo: function() {
    console.log('photo');
    var file = $("<input type='file' class='hide' name='photo[image][]'>");

    $('textpostform form').append(file);
    file.click();
    var that = this;
    file.change( function() {
      that.previewPhoto(this);
    });
  },

  previewPhoto: function(input) {
    if (input.files && input.files[0])
    		  {
            var reader = new FileReader();

            reader.onload = function (e) {
              var img  = $('<img src =' + e.target.result + '>');
              $('texttextarea').append(img);
              var data = {
                caption: 'caption',
                link: 'link',
                post_id: '222',
                url: 'www.url.com',
                image: e.target.result
              };

              $.ajax({
                url: '/photos',
                type: "POST",
                data: {photo: data},
                success: function(r) {
                  console.log(r);
                },
                error: function(e){
                  console.log(e);
                }
              });
    					// j('body').RequestBuilder('setPreview',e.target.result);
//               j('body').RequestBuilder('goTo','reqEdit');
            };

            reader.readAsDataURL(input.files[0]);
          }
  },

  embolden: function() {
    console.log(this.getSelectionHtml());

  },

  getSelectionHtml: function() {
      var html = "";
      if (typeof window.getSelection != "undefined") {
          var sel = window.getSelection();
          if (sel.rangeCount) {
              var container = document.createElement("div");
              for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                  container.appendChild(sel.getRangeAt(i).cloneContents());
              }
              html = container.innerHTML;
          }
      } else if (typeof document.selection != "undefined") {
          if (document.selection.type == "Text") {
              html = document.selection.createRange().htmlText;
          }
      }
      console.log(html);
  },



  postForm: function(e) {
    this.hideShow($('quickdashbubble'),$('textpostform'),1000);

    console.log(e);
  },

  mapKeyPressToActualCharacter: function(characterCode) {
      if ( characterCode === 27 || characterCode === 8 || characterCode === 9 || characterCode === 20 || characterCode === 16 || characterCode === 17 || characterCode === 91 ||  characterCode === 92 || characterCode === 18 ) {
          return false;
      }
      if (characterCode === 13)
      {
        this.buffer = '\n';
        this.textContent += "\n";
        this.textContent += '';
        return '';
      }
      if (typeof characterCode != "number") {
          return false;
      }
      var characterMap = [];
      characterMap[13] = '\\n\\n';
      characterMap[192] = "~";
      characterMap[49] = "!";
      characterMap[50] = "@";
      characterMap[51] = "#";
      characterMap[52] = "$";
      characterMap[53] = "%";
      characterMap[54] = "^";
      characterMap[55] = "&";
      characterMap[56] = "*";
      characterMap[57] = "(";
      characterMap[48] = ")";
      characterMap[109] = "_";
      characterMap[107] = "+";
      characterMap[219] = "{";
      characterMap[221] = "}";
      characterMap[220] = "|";
      characterMap[59] = ":";
      characterMap[222] = "\"";
      characterMap[188] = "<";
      characterMap[190] = ">";
      characterMap[191] = "?";
      characterMap[32] = " ";
      var character = "";
      if (this.shift) {
          if ( characterCode >= 65 && characterCode <= 90 ) {
              character = String.fromCharCode(characterCode);
          } else {
              character = characterMap[characterCode];
          }
      } else {
          if ( characterCode >= 65 && characterCode <= 90 ) {
              character = String.fromCharCode(characterCode).toLowerCase();
          } else {
              character = String.fromCharCode(characterCode);
          }
      }
      return character;
  }
});