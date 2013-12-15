/* NicEdit - Micro Inline WYSIWYG
 * Copyright 2007-2008 Brian Kirchoff
 *
 * NicEdit is distributed under the terms of the MIT license
 * For more information visit http://nicedit.com/
 * Do not remove this copyright message
 */
var bkExtend = function () {
    var A = arguments;
    if (A.length == 1) {
        A = [this, A[0]]
    }
    for (var B in A[1]) {
        A[0][B] = A[1][B]
    }
    return A[0]
};

function bkClass() {}
bkClass.prototype.construct = function () {};
bkClass.extend = function (C) {
    var A = function () {
        if (arguments[0] !== bkClass) {
            return this.construct.apply(this, arguments)
        }
    };
    var B = new this(bkClass);
    bkExtend(B, C);
    A.prototype = B;
    A.extend = this.extend;
    return A
};
var bkElement = bkClass.extend({
    construct: function (B, A) {
        if (typeof (B) == "string") {
            B = (A || document).createElement(B)
        }
        B = $BK(B);
        return B
    },
    appendTo: function (A) {
        A.appendChild(this);
        return this
    },
    append: function(B){
      this.appendChild(B);
      return this;
    },
    appendBefore: function (A) {
        A.parentNode.insertBefore(this, A);
        return this
    },
    addEvent: function (B, A) {
        bkLib.addEvent(this, B, A);
        return this
    },
    setContent: function (A) {
        this.innerHTML = A;
        return this
    },
    pos: function () {
        var C = curtop = 0;
        var B = obj = this;
        if (obj.offsetParent) {
            do {
                C += obj.offsetLeft;
                curtop += obj.offsetTop
            } while (obj = obj.offsetParent)
        }
        var A = (!window.opera) ? parseInt(this.getStyle("border-width") || this.style.border) || 0 : 0;
        return [C + A, curtop + A + this.offsetHeight]
    },
    noSelect: function () {
        bkLib.noSelect(this);
        return this
    },
    parentTag: function (A) {
        var B = this;
        do {
            if (B && B.nodeName && B.nodeName.toUpperCase() == A) {
                return B
            }
            B = B.parentNode
        } while (B);
        return false
    },
    hasClass: function (A) {
        return this.className.match(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"))
    },
    addClass: function (A) {
        if (!this.hasClass(A)) {
            this.className += " nicEdit-" + A
        }
        return this
    },
    removeClass: function (A) {
        if (this.hasClass(A)) {
            this.className = this.className.replace(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"), " ")
        }
        return this
    },
    setStyle: function (A) {
        var B = this.style;
        for (var C in A) {
            switch (C) {
            case "float":
                B.cssFloat = B.styleFloat = A[C];
                break;
            case "opacity":
                B.opacity = A[C];
                B.filter = "alpha(opacity=" + Math.round(A[C] * 100) + ")";
                break;
            case "className":
                this.className = A[C];
                break;
            default:
                B[C] = A[C]
            }
        }
        return this
    },
    getStyle: function (A, C) {
        var B = (!C) ? document.defaultView : C;
        if (this.nodeType == 1) {
            return (B && B.getComputedStyle) ? B.getComputedStyle(this, null).getPropertyValue(A) : this.currentStyle[bkLib.camelize(A)]
        }
    },
    remove: function () {
        this.parentNode.removeChild(this);
        return this
    },
    setAttributes: function (A) {
        for (var B in A) {
            this[B] = A[B]
        }
        return this
    }
});
var bkLib = {
    isMSIE: (navigator.appVersion.indexOf("MSIE") != -1),
    addEvent: function (C, B, A) {
        (C.addEventListener) ? C.addEventListener(B, A, false) : C.attachEvent("on" + B, A)
    },
    toArray: function (C) {
        var B = C.length,
            A = new Array(B);
        while (B--) {
            A[B] = C[B]
        }
        return A
    },
    noSelect: function (B) {
        if (B.setAttribute && B.nodeName.toLowerCase() != "input" && B.nodeName.toLowerCase() != "textarea") {
            B.setAttribute("unselectable", "on")
        }
        for (var A = 0; A < B.childNodes.length; A++) {
            bkLib.noSelect(B.childNodes[A])
        }
    },
    camelize: function (A) {
        return A.replace(/\-(.)/g, function (B, C) {
            return C.toUpperCase()
        })
    },
    inArray: function (A, B) {
        return (bkLib.search(A, B) != null)
    },
    search: function (A, C) {
        for (var B = 0; B < A.length; B++) {
            if (A[B] == C) {
                return B
            }
        }
        return null
    },
    cancelEvent: function (A) {
        A = A || window.event;
        if (A.preventDefault && A.stopPropagation) {
            A.preventDefault();
            A.stopPropagation()
        }
        return false
    },
    domLoad: [],
    domLoaded: function () {
        if (arguments.callee.done) {
            return
        }
        arguments.callee.done = true;
        for (i = 0; i < bkLib.domLoad.length; i++) {
            bkLib.domLoad[i]()
        }
    },
    onDomLoaded: function (A) {
        this.domLoad.push(A);
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", bkLib.domLoaded, null)
        } else {
            if (bkLib.isMSIE) {
                document.write("<style>.nicEdit-main p { margin: 0; }</style><script id=__ie_onload defer " + ((location.protocol == "https:") ? "src='javascript:void(0)'" : "src=//0") + "><\/script>");
                $BK("__ie_onload").onreadystatechange = function () {
                    if (this.readyState == "complete") {
                        bkLib.domLoaded()
                    }
                }
            }
        }
        window.onload = bkLib.domLoaded
    }
};

function $BK(A) {
    if (typeof (A) == "string") {
        A = document.getElementById(A)
    }
    return (A && !A.appendTo) ? bkExtend(A, bkElement.prototype) : A
}
var bkEvent = {
    addEvent: function (A, B) {
        if (B) {
            this.eventList = this.eventList || {};
            this.eventList[A] = this.eventList[A] || [];
            this.eventList[A].push(B)
        }
        return this
    },
    fireEvent: function () {
        var A = bkLib.toArray(arguments),
            C = A.shift();
        if (this.eventList && this.eventList[C]) {
            for (var B = 0; B < this.eventList[C].length; B++) {
                this.eventList[C][B].apply(this, A)
            }
        }
    }
};

function __(A) {
    return A
}
Function.prototype.closure = function () {
    var A = this,
        B = bkLib.toArray(arguments),
        C = B.shift();
    return function () {
        if (typeof (bkLib) != "undefined") {
            return A.apply(C, B.concat(bkLib.toArray(arguments)))
        }
    }
};
Function.prototype.closureListener = function () {
    var A = this,
        C = bkLib.toArray(arguments),
        B = C.shift();
    return function (E) {
        E = E || window.event;
        if (E.target) {
            var D = E.target
        } else {
            var D = E.srcElement
        }
        return A.apply(B, [E, D].concat(C))
    }
};

var nicEditorConfig = bkClass.extend({
    buttons: {
        'bold': {
            name: __('Click to Bold'),
            command: 'Bold',
            tags: ['B', 'STRONG'],
            css: {
                'font-weight': 'bold'
            },
            key: 'b'
        },
        'italic': {
            name: __('Click to Italic'),
            command: 'Italic',
            tags: ['EM', 'I'],
            css: {
                'font-style': 'italic'
            },
            key: 'i'
        },
        'strikethrough': {
            name: __('Click to Strike Through'),
            command: 'strikeThrough',
            css: {
                'text-decoration': 'line-through'
            }
        },
        'ol': {
            name: __('Insert Ordered List'),
            command: 'insertorderedlist',
            tags: ['OL']
        }
    },
    iconsPath: 'http://js.nicedit.com/nicEditIcons-latest.gif',
    buttonList: ['bold', 'italic', 'ol', 'link', 'unlink', ''],
    iconList: {
        "bold": "fa-bold",
        "italic": "fa-italic",
        "ol": "fa-list-ol",
        "strikethrough": "fa-strikethrough",
        "link": "fa-link",
        "unlink": "fa-unlick",
        "upload": "fa-camera"
    }

});;
var nicEditors = {
    nicPlugins: [],
    editors: [],
    registerPlugin: function (B, A) {
        this.nicPlugins.push({
            p: B,
            o: A
        })
    },
    findEditor: function (C) {
        var B = nicEditors.editors;
        for (var A = 0; A < B.length; A++) {
            if (B[A].instanceById(C)) {
                return B[A].instanceById(C)
            }
        }
    }
};
var nicEditor = bkClass.extend({
    construct: function (C) {
        this.options = new nicEditorConfig();
        bkExtend(this.options, C);
        this.nicInstances = new Array();
        this.loadedPlugins = new Array();
        var A = nicEditors.nicPlugins;
        for (var B = 0; B < A.length; B++) {
            this.loadedPlugins.push(new A[B].p(this, A[B].o))
        }
        nicEditors.editors.push(this);
        bkLib.addEvent(document.body, "mousedown", this.selectCheck.closureListener(this))
    },
    panelInstance: function (B, C) {
        B = this.checkReplace($BK(B));
        var A = new bkElement("DIV").setStyle({
            width: (parseInt(B.getStyle("width")) || B.clientWidth) + "px"
        }).appendBefore(B);
        this.setPanel(A);
        return this.addInstance(B, C)
    },
    checkReplace: function (B) {
        var A = nicEditors.findEditor(B);
        if (A) {
            A.removeInstance(B);
            A.removePanel()
        }
        return B
    },
    addInstance: function (B, C) {
        B = this.checkReplace($BK(B));
        if (B.contentEditable || !! window.opera) {
            var A = new nicEditorInstance(B, C, this)
        } else {
            var A = new nicEditorIFrameInstance(B, C, this)
        }
        this.nicInstances.push(A);
        return this
    },
    removeInstance: function (C) {
        C = $BK(C);
        var B = this.nicInstances;
        for (var A = 0; A < B.length; A++) {
            if (B[A].e == C) {
                B[A].remove();
                this.nicInstances.splice(A, 1)
            }
        }
    },
    removePanel: function (A) {
        if (this.nicPanel) {
            this.nicPanel.remove();
            this.nicPanel = null
        }
    },
    instanceById: function (C) {
        C = $BK(C);
        var B = this.nicInstances;
        for (var A = 0; A < B.length; A++) {
            if (B[A].e == C) {
                return B[A]
            }
        }
    },
    setPanel: function (A) {
        this.nicPanel = new nicEditorPanel($BK(A), this.options, this);
        this.fireEvent("panel", this.nicPanel);
        return this
    },
    nicCommand: function (B, A) {
        if (this.selectedInstance) {
            this.selectedInstance.nicCommand(B, A)
        }
    },
    getIcon: function (item) {
      return  "fa " + this.options.iconList[item];
    },
    selectCheck: function (C, A) {
        var B = false;
        do {
            if (A.className && A.className.indexOf("nicEdit") != -1) {
                return false
            }
        } while (A = A.parentNode);
        this.fireEvent("blur", this.selectedInstance, A);
        this.lastSelectedInstance = this.selectedInstance;
        this.selectedInstance = null;
        return false
    }
});
nicEditor = nicEditor.extend(bkEvent);
var nicEditorInstance = bkClass.extend({
    isSelected: false,
    construct: function (G, D, C) {
        this.ne = C;
        this.elm = this.e = G;
        this.options = D || {};
        newX = parseInt(G.getStyle("width")) || G.clientWidth;
        newY = parseInt(G.getStyle("height")) || G.clientHeight;
        this.initialHeight = newY - 8;
        var H = (G.nodeName.toLowerCase() == "textarea");
        if (H || this.options.hasPanel) {
            var B = (bkLib.isMSIE && !((typeof document.body.style.maxHeight != "undefined") && document.compatMode == "CSS1Compat"));
            var E = {
                width: newX + "px",
                border: "1px solid #ccc",
                borderTop: 0,
                overflowY: "auto",
                overflowX: "hidden"
            };
            E[(B) ? "height" : "maxHeight"] = (this.ne.options.maxHeight) ? this.ne.options.maxHeight + "px" : null;
            this.editorContain = new bkElement("DIV").setStyle(E).appendBefore(G);
            var A = new bkElement("DIV").setStyle({
                width: (newX - 8) + "px",
                margin: "4px",
                minHeight: newY + "px"
            }).addClass("main").appendTo(this.editorContain);
            G.setStyle({
                display: "none"
            });
            A.innerHTML = G.innerHTML;
            if (H) {
                A.setContent(G.value);
                this.copyElm = G;
                var F = G.parentTag("FORM");
                if (F) {
                    bkLib.addEvent(F, "submit", this.saveContent.closure(this))
                }
            }
            A.setStyle((B) ? {
                height: newY + "px"
            } : {
                overflow: "hidden"
            });
            this.elm = A
        }
        this.ne.addEvent("blur", this.blur.closure(this));
        this.init();
        this.blur()
    },
    init: function () {
        this.elm.setAttribute("contentEditable", "true");
        if (this.getContent() == "") {
            this.setContent("<br />")
        }
        this.instanceDoc = document.defaultView;
        this.elm.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keypress", this.keyDown.closureListener(this)).addEvent("focus", this.selected.closure(this)).addEvent("blur", this.blur.closure(this)).addEvent("keyup", this.selected.closure(this));
        this.ne.fireEvent("add", this)
    },
    remove: function () {
        this.saveContent();
        if (this.copyElm || this.options.hasPanel) {
            this.editorContain.remove();
            this.e.setStyle({
                display: "block"
            });
            this.ne.removePanel()
        }
        this.disable();
        this.ne.fireEvent("remove", this)
    },
    disable: function () {
        this.elm.setAttribute("contentEditable", "false")
    },
    getSel: function () {
        return (window.getSelection) ? window.getSelection() : document.selection
    },
    getRng: function () {
        var A = this.getSel();
        if (!A || A.rangeCount === 0) {
            return
        }
        return (A.rangeCount > 0) ? A.getRangeAt(0) : A.createRange()
    },
    selRng: function (A, B) {
        if (window.getSelection) {
            B.removeAllRanges();
            B.addRange(A)
        } else {
            A.select()
        }
    },
    selElm: function () {
        var C = this.getRng();
        if (!C) {
            return
        }
        if (C.startContainer) {
            var D = C.startContainer;
            if (C.cloneContents().childNodes.length == 1) {
                for (var B = 0; B < D.childNodes.length; B++) {
                    var A = D.childNodes[B].ownerDocument.createRange();
                    A.selectNode(D.childNodes[B]);
                    if (C.compareBoundaryPoints(Range.START_TO_START, A) != 1 && C.compareBoundaryPoints(Range.END_TO_END, A) != -1) {
                        return $BK(D.childNodes[B])
                    }
                }
            }
            return $BK(D)
        } else {
            return $BK((this.getSel().type == "Control") ? C.item(0) : C.parentElement())
        }
    },
    saveRng: function () {
        this.savedRange = this.getRng();
        this.savedSel = this.getSel()
    },
    restoreRng: function () {
        if (this.savedRange) {
            this.selRng(this.savedRange, this.savedSel)
        }
    },
    keyDown: function (B, A) {
        if (B.ctrlKey) {
            this.ne.fireEvent("key", this, B)
        }
    },
    selected: function (C, A) {
        if (!A && !(A = this.selElm)) {
            A = this.selElm()
        }
        if (!C.ctrlKey) {
            var B = this.ne.selectedInstance;
            if (B != this) {
                if (B) {
                    this.ne.fireEvent("blur", B, A)
                }
                this.ne.selectedInstance = this;
                this.ne.fireEvent("focus", B, A)
            }
            this.ne.fireEvent("selected", B, A);
            this.isFocused = true;
            this.elm.addClass("selected")
        }
        return false
    },
    blur: function () {
        this.isFocused = false;
        this.elm.removeClass("selected")
    },
    saveContent: function () {
        if (this.copyElm || this.options.hasPanel) {
            this.ne.fireEvent("save", this);
            (this.copyElm) ? this.copyElm.value = this.getContent() : this.e.innerHTML = this.getContent()
        }
    },
    getElm: function () {
        return this.elm
    },
    getContent: function () {
        this.content = this.getElm().innerHTML;
        this.ne.fireEvent("get", this);
        return this.content
    },
    setContent: function (A) {
        this.content = A;
        this.ne.fireEvent("set", this);
        this.elm.innerHTML = this.content
    },
    nicCommand: function (B, A) {
        document.execCommand(B, false, A)
    }
});

var nicEditorPanel = bkClass.extend({
    construct: function (E, B, A) {
        this.elm = E;
        this.options = B;
        this.ne = A;
        this.panelButtons = new Array();
        this.buttonList = bkExtend([], this.ne.options.buttonList);
        this.panelContain = new bkElement("DIV").setStyle({
          className: ' group '
        }).addClass("panelContain");
        this.panelElm = new bkElement("ul").setStyle({
           className: 'editoptions'
        }).addClass("panel").appendTo(this.panelContain);
        this.panelContain.appendTo(E);
        var C = this.ne.options;
        var D = C.buttons;
        for (button in D) {
            this.addButton(button, C, true)
        }
        this.reorder();
        E.noSelect()
    },
    addButton: function (buttonName, options, noOrder) {
        var button = options.buttons[buttonName];
        var type = (button.type) ? eval("(typeof(" + button.type + ') == "undefined") ? null : ' + button.type + ";") : nicEditorButton;
        var hasButton = bkLib.inArray(this.buttonList, buttonName);
        if (type && (hasButton || this.ne.options.fullPanel)) {
            this.panelButtons.push(new type(this.panelElm, buttonName, options, this.ne));
            if (!hasButton) {
                this.buttonList.push(buttonName)
            }
        }
    },
    findButton: function (B) {
        for (var A = 0; A < this.panelButtons.length; A++) {
            if (this.panelButtons[A].name == B) {
                return this.panelButtons[A]
            }
        }
    },
    reorder: function () {
        var C = this.buttonList;
        for (var B = 0; B < C.length; B++) {
            var A = this.findButton(C[B]);
            if (A) {
                this.panelElm.appendChild(A.li)
            }
        }
    },
    remove: function () {
        this.elm.remove()
    }
});
var nicEditorButton = bkClass.extend({
    construct: function (D, A, C, B) {
        this.options = C.buttons[A];
        this.name = A;
        this.ne = B;
        this.elm = D;
        this.li = new bkElement("li").appendTo(D);
        this.icon = new bkElement('i').setStyle({
          "className": this.ne.getIcon(A)
        }).appendTo(this.li);
        this.li.addClass('button');
        this.li.addEvent("mousedown", this.mouseClick.closure(this)).noSelect();
        if (!window.opera) {
            this.li.onmousedown = this.li.onclick = bkLib.cancelEvent
        }
        B.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this)).addEvent("key", this.key.closure(this));
        this.disable();
        this.init()
    },
    init: function () {},
    checkNodes: function (A) {
        var B = A;
        do {
            if (this.options.tags && bkLib.inArray(this.options.tags, B.nodeName)) {
                this.activate();
                return true
            }
        } while (B = B.parentNode && B.className != "nicEdit");
        B = $BK(A);
        while (B.nodeType == 3) {
            B = $BK(B.parentNode)
        }
        if (this.options.css) {
            for (itm in this.options.css) {
                if (B.getStyle(itm, this.ne.selectedInstance.instanceDoc) == this.options.css[itm]) {
                    this.activate();
                    return true
                }
            }
        }
        this.deactivate();
        return false
    },
    activate: function () {
        if (!this.isDisabled) {
            this.isActive = true;
            this.li.addClass('buttonActivate');
            this.ne.fireEvent("buttonActivate", this)
        }
    },
    deactivate: function () {
        this.isActive = false;
        this.li.removeClass('buttonActivate');
        if (!this.isDisabled) {
            this.ne.fireEvent("buttonDeactivate", this)
        }
    },
    enable: function (A, B) {
        this.isDisabled = false;
        this.li.addClass("buttonEnabled");
        this.checkNodes(B)
    },
    disable: function (A, B) {
        this.isDisabled = true;
        this.li.removeClass("buttonEnabled");
    },
    toggleActive: function () {
        (this.isActive) ? this.deactivate() : this.activate()
    },
    mouseClick: function () {
        if (this.options.command) {
            this.ne.nicCommand(this.options.command, this.options.commandArgs);
            if (!this.options.noActive) {

            }
            this.toggleActive();
        }
        //this.ne.fireEvent("buttonClick", this)
    },
    key: function (A, B) {
        if (this.options.key && B.ctrlKey && String.fromCharCode(B.keyCode || B.charCode).toLowerCase() == this.options.key) {
            this.mouseClick();
            if (B.preventDefault) {
                B.preventDefault()
            }
        }
    }
});

// var nicButtonTips = bkClass.extend({
//     construct: function (A) {
//         this.ne = A;
//         A.addEvent("buttonOver", this.show.closure(this)).addEvent("buttonOut", this.hide.closure(this))
//     },
//     show: function (A) {
//         this.timer = setTimeout(this.create.closure(this, A), 400)
//     },
//     create: function (A) {
//         this.timer = null;
//         if (!this.pane) {
//             this.pane = new nicEditorPane(A.button, this.ne, {
//                 fontSize: "12px",
//                 marginTop: "5px"
//             });
//             this.pane.setContent(A.options.name)
//         }
//     },
//     hide: function (A) {
//         if (this.timer) {
//             clearTimeout(this.timer)
//         }
//         if (this.pane) {
//             this.pane = this.pane.remove()
//         }
//     }
// });
// nicEditors.registerPlugin(nicButtonTips);
//
// var nicBBCode = bkClass.extend({
//     construct: function (A) {
//         this.ne = A;
//         if (this.ne.options.bbCode) {
//             A.addEvent("get", this.bbGet.closure(this));
//             A.addEvent("set", this.bbSet.closure(this));
//             var B = this.ne.loadedPlugins;
//             for (itm in B) {
//                 if (B[itm].toXHTML) {
//                     this.xhtml = B[itm]
//                 }
//             }
//         }
//     },
//     bbGet: function (A) {
//         var B = this.xhtml.toXHTML(A.getElm());
//         A.content = this.toBBCode(B)
//     },
//     bbSet: function (A) {
//         A.content = this.fromBBCode(A.content)
//     },
//     toBBCode: function (B) {
//         function A(D, C) {
//             B = B.replace(D, C)
//         }
//         A(/\n/gi, "");
//         A(/<strong>(.*?)<\/strong>/gi, "[b]$1[/b]");
//         A(/<em>(.*?)<\/em>/gi, "[i]$1[/i]");
//         A(/<span.*?style="text-decoration:underline;">(.*?)<\/span>/gi, "[u]$1[/u]");
//         A(/<ul>(.*?)<\/ul>/gi, "[list]$1[/list]");
//         A(/<li>(.*?)<\/li>/gi, "[*]$1[]");
//         A(/<ol>(.*?)<\/ol>/gi, "[list=1]$1[/list]");
//         A(/<img.*?src="(.*?)".*?>/gi, "[img]$1[/img]");
//         A(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi, "[url=$1]$2[/url]");
//         A(/<br.*?>/gi, "\n");
//         A(/<.*?>.*?<\/.*?>/gi, "");
//         return B
//     },
//     fromBBCode: function (A) {
//         function B(D, C) {
//             A = A.replace(D, C)
//         }
//         B(/\[b\](.*?)\[\/b\]/gi, "<strong>$1</strong>");
//         B(/\[i\](.*?)\[\/i\]/gi, "<em>$1</em>");
//         B(/\[u\](.*?)\[\/u\]/gi, '<span style="text-decoration:underline;">$1</span>');
//         B(/\[list\](.*?)\[\/list\]/gi, "<ul>$1</ul>");
//         B(/\[list=1\](.*?)\[\/list\]/gi, "<ol>$1</ol>");
//         B(/\[\*\](.*?)\[\/\*\]/gi, "<li>$1</li>");
//         B(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" />');
//         B(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>');
//         B(/\n/gi, "<br />");
//         return A
//     }
// });
// nicEditors.registerPlugin(nicBBCode);
