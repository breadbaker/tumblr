Tumblr.Views.TextView = Backbone.View.extend({
  initialize: function(){
    this.addHandlers();
    this.displayarea = $('textpostform textarea')
    $('texttextarea').attr('contenteditable',true);

    this.converter = new Showdown.converter();

    this.currentEl = false;

    this.oldWrapper = '';
    this.wrapper = '';
    this.buffer = '';

    this.textContent = '';

    $('texttextarea').append(this.currentEl);

    console.log(this.converter.makeHtml('**hello**'));

  },

  // events: {
//     'keydown texttextarea': 'newChar',
//     'click quickitem': 'postForm'
//   },

  newChar: function(e) {


    e.preventDefault();

    console.log(e);

    if ( e.keyCode == 16 ){
      this.shift = this.shift == true ? false : true;
      return;
    }

    var realChar = this.mapKeyPressToActualCharacter(e.keyCode);
    if (!realChar) {
      return;
    }

    console.log(realChar, 'char');


    this.textContent += this.buffer +realChar;
    this.buffer = '';

    console.log(this.textContent);

    $('texttextarea').html(this.converter.makeHtml(this.textContent));

    return;

    if ( this.wrapper != '' || !this.currentEl) {
      this.createTextEl(realChar);
    } else {
      this.addToBaseChild(realChar);
    }

    //this.findFocus();
  },

  createTextEl: function(c) {
    this.currentEl = $(this.converter.makeHtml(c));
    $('texttextarea').append(this.currentEl);
  },

  addToBaseChild: function(c) {

  },

  addHandlers: function() {
    var that = this;
    $('texttextarea').on('keydown', function(e){
      that.newChar(e);
    });
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