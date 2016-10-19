/* mousetrap v1.6.0 craig.is/killing/mice */
(function(r,t,g){function u(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function y(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return k[a.which]?k[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function v(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function z(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],A[c]&&(c=A[c]),b&&"keypress"!=b&&B[c]&&(c=B[c],g.push("shift")),v(c)&&g.push(c);h=c;e=b;if(!e){if(!n){n={};for(var l in k)95<l&&112>l||k.hasOwnProperty(l)&&(n[k[l]]=l)}e=n[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function C(a,b){return null===a||a===t?!1:a===b?!0:C(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,m;for(m in n)a[m]?b=!0:n[m]=0;b||(w=!1)}function h(a,b,m,f,c,h){var g,e,k=[],l=m.type;if(!d._callbacks[a])return[];"keyup"==l&&v(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||n[e.seq]==e.level)&&l==e.action){var q;(q="keypress"==l&&!m.metaKey&&!m.ctrlKey)||(q=e.modifiers,q=b.sort().join(",")===q.sort().join(","));q&&(q=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||q)&&d._callbacks[a].splice(g,1),k.push(e))}return k}function g(a,b,m,f){d.stopCallback(b,
b.target||b.srcElement,m,f)||!1!==a(b,m)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=y(a);b&&("keyup"==a.type&&x===b?x=!1:d.handleKey(b,D(a),a))}function k(a,c,m,f){function e(c){return function(){w=c;++n[a];clearTimeout(r);r=setTimeout(b,1E3)}}function h(c){g(m,c,a);"keyup"!==f&&(x=y(c));setTimeout(b,10)}for(var d=n[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
z(c[d+1]).action);l(c[d],p,f,a,d)}}function l(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?k(a,g,b,c):(c=z(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||t;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var n={},r,x=!1,p=!1,w=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=w||v(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)l(a[d],b,c)};u(a,"keypress",e);u(a,"keydown",e);u(a,"keyup",e)}if(r){var k={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",
18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},B={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},A={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},n;for(g=1;20>g;++g)k[111+g]="f"+g;for(g=0;9>=g;++g)k[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||C(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.addKeycodes=function(a){for(var b in a)a.hasOwnProperty(b)&&(k[b]=a[b]);n=null};c.init=function(){var a=c(t),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};
c.init();r.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=c);"function"===typeof define&&define.amd&&define(function(){return c})}})("undefined"!==typeof window?window:null,"undefined"!==typeof window?document:null);


// Modern Editor
// An event-based editor for the modern web
var Editor = function(selector, options){

  // The instance's editor element (it is required)
  this.element = u(selector).first();

  // Editor options
  this.options = this.defaults(options, {

    // Delay for each of the text selections checks (there's no event onselect)
    delay: 200,

    // Default active status
    active: true,

    // The valid blocks
    blocks: []
  });

  // Start each of the parts of the library
  this.menu(this.options.menu);

  this.selection();

  this.shortcuts();

  this.clean();

  this.default();

  var editor = this;
  window.setInterval(this.trigger.bind(this, 'refresh'), this.options.delay);
  this.element.addEventListener("blur", function(e){ editor.trigger('refresh', e); });

  // These are just good moments to refresh
  document.addEventListener("keydown", function(e){ editor.trigger('refresh', e); });
  document.addEventListener("mousedown", function(e){ editor.trigger('refresh', e); });
  document.addEventListener("touchstart", function(e){ editor.trigger('refresh', e); });
  document.addEventListener("click", function(e){ editor.trigger('refresh', e); });

  this.trigger('init');
};


Editor.prototype.defaults = function(options, def, wrap){

  // Based on defaults ( https://github.com/tmpvar/defaults )
  options = typeof options === 'object' ? options : {};

  Object.keys(def).forEach(function(key) {
    if (typeof options[key] === 'undefined') {
      options[key] = def[key];
    }
  });

  return options;
};


Editor.prototype.command = function(command, text){
  document.execCommand(command, false, text);
  this.trigger('refresh');
};

// Initialization
u.prototype.editor = function(options){
  return new Editor(this.first(), options);
};


// Register a new full action
Editor.prototype.add = function(name, options){

  // Default options (empty functions)
  var fn = function(){};
  options = this.defaults(options, { init: fn, action: fn, destroy: fn });

  // Call the init action inmediately
  options.init.call(this, this);

  // Add the action to the action event list like action:save
  this.on('action:' + name, options.action.bind(this, this));

  this.on('destroy', options.destroy.bind(this, this));


  // Add the shortcut only if there is one
  this.trigger('shortcut:add', { shortcut: options.shortcut, action: name });

  // Add the menu item only if there's one
  if (options.menu) {

    // Default options for the menu
    options.menu = this.defaults(options.menu, {
      html: options.menu,
      title: (options.shortcut ? '[' + options.shortcut + '] ' : '') + name,
      action: name
    });

    this.trigger('menu:add', options.menu);
  }
};


Editor.prototype.clean = function(){
  var editor = this;
  this.clean.editor = this;

  this.on('refresh', function(){
    editor.trigger('clean');
  });

  // Clean up the html
  this.on('clean', function(){
    // Call the single elements
    u(this).children().singles(function(node){
      editor.trigger('clean:single', node);
    });

    u(this).children().empty(function(node){
      editor.trigger('clean:empty', node);
    });
  });

  // Last defense for cleanup
  // Make sure all top-level elements are valid blocks or wrap them in <p>
  this.on('clean:after', function(){

    var ed = u(editor.element);

    // Wrap any of the invalid blocks
    if (editor.clean.blocks) {
      ed.children().filter(editor.clean.filter).each(editor.clean.wrap);
    }

    if (!ed.children().nodes.length && ed.html() !== "") {
      ed.html('<p>' + ed.html() + '</p>');
    }
  });
}

Editor.prototype.clean.blocks = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'img', 'ul', 'ol'];

Editor.prototype.clean.filter = function(node){
  return Editor.prototype.clean.blocks.indexOf(node.nodeName.toLowerCase()) === -1;
};

Editor.prototype.clean.wrap = function(node){
  var p = document.createElement('p');
  p.innerHTML = node.outerHTML;
  node.parentNode.replaceChild(p, node);
};



// Retrieve all the nodes with only one child, whatever the type
u.prototype.singles = function(callback){
  return this.filter(function(block){
    return u(block).content().nodes.length == 1;
  }).each(callback);
};

// Retrieve all the nodes with no content
u.prototype.empty = function(callback){
  return this.filter(function(block){
    return !block.textContent.replace(/\s/, '').length;
  }).each(callback);
};

u.prototype.replace = function(el){
  this.each(function(node){
    node.parentNode.replaceChild(u('<p>').html(u(node).html()).first(), node);
  });
};

u.prototype.content = function(){
  return this.map(function(node){
    return this.slice(node.childNodes);
  });
};






Editor.prototype.default = function(){
  var self = this;

  this.on('action:default:italic', function(){
    self.command("italic");
  });

  this.on('action:default:bold', function(){
    self.command("bold");
  });

  this.on('action:default:link', function(){
    var link = u(self.selection.element).attr('href');
    var address = prompt("Link address", link || "");
    self.command(address ? 'createLink' : 'unlink', address);
  });

  this.on('action:default:code', function(){
    self.tag("code");
  });

  this.on('action:default:info', function(){
    window.open("https://github.com/franciscop/modern-editor", "_blank");
  });

};

// Events
// All of the current events
Editor.prototype.events = {};

// Transparently redirect events to Umbrella
Editor.prototype.on = function(name, callback){
  u(this.element).on('editor:' + name, function(e) {
    return callback.call(this, e, e.detail);
  });
};

// Handle event triggering with :before and :after
Editor.prototype.trigger = function(name, data){
  u(this.element).trigger('editor:' + name + ':before', data);
  u(this.element).trigger('editor:' + name, data);
  u(this.element).trigger('editor:' + name + ':after', data);
};



Editor.prototype.menu = function(name){
  this.menu.editor = this;
  this.menu.visible = false;

  // Class that will be added to the menu
  name = name || 'menu';

  // Add the menu to the DOM
  u('body').append('<ul class="' + name + '"></ul>');
  this.menu.element = u('.' + name).first();

  this.menu.events();
};



// Add an element to the menu
Editor.prototype.menu.add = function(element){
  var editor = this.editor;
  if (element instanceof Array) {
    element = element[0];
  }
  var li = u(document.createElement('li')).attr({
    'title': element.title,
    'data-action': element.action
  }).addClass('action').on('click', function(e){
    if (!element.defaults) {
      console.log("Prevented shortcut on menu.add");
      e.preventDefault();
    }
    editor.trigger('action');
    editor.trigger('action:' + element.action);
  }).html(element.html).first();
  this.element.appendChild(li);
}

// Add a separator between two elements from the menu
Editor.prototype.menu.separator = function(){
  u(this.element).append('<li class="separator">');
};


// Show the menu
Editor.prototype.menu.show = function(){

  if (this.editor.options.active) {
    this.element.style.display = 'block';
    this.element.visible = true;
    this.element.classList.add('visible');
  }
};

// Hide the menu
Editor.prototype.menu.hide = function(){
  this.element.style.display = "none";
  this.element.visible = false;
  this.element.classList.remove('visible');
};


// Calculate the position for the selection and move the menu to it
Editor.prototype.menu.move = function() {

  var selection = this.editor.selection.position;
  var doc = u('html').first().getBoundingClientRect();
  var menu = this.element.getBoundingClientRect();

  var top = selection.top - doc.top;
  if (top < 0 ) top = 0;
  var left = selection.left + selection.width / 2 - menu.width / 2;
  if (left < 0) left = 0;
  this.position = {
    top: top + "px",
    left: left + "px"
  };
  this.element.style.left = this.position.left;
  this.element.style.top = this.position.top;
};


Editor.prototype.menu.events = function(){

  var editor = this.editor;
  var menu = this;

  // Add a separator between two elements from the menu
  editor.on("menu:add", function(e, element){
    menu.add(element);
  });

  // Add a separator between two elements from the menu
  editor.on("menu:separator", function(){
    menu.separator();
  });

  // Show the menu
  editor.on('menu:show', function(){
    menu.show();
  });

  // Hide the menu
  editor.on('menu:hide', function(){
    menu.hide();
  });

  // Position the menu correctly
  editor.on('menu:move', function(){
    menu.move();
  });

  // Avoid deselecting text when clicking on the menu
  u(menu.element).on('mousedown', function(e){
    // Only if it was not a select
    if (u(e.target).closest('select').length === 0) {
      e.preventDefault();
    }
  });

  // On mousedown check whether or not we click on the menu
  u('body').on("click", function (e) {

    // Don't unselect text when clicking on the menu
    if (menu.element && menu.element.contains(e.currentTarget)) {
      console.log("Prevented shortcut on click");
      e.preventDefault();
    }
  });
}




// SELECTION
Editor.prototype.selection = function(){
  var editor = this;
  this.selection.element = false;
  this.selection.text = "";


  // Format nicely the code (if needed)
  this.on('refresh', function(){

    u(this).children('br').remove();
    if (u(this).html().match(/^\s*$/)) {
      editor.command("insertParagraph");
    }
  });

  // Display/hide the menu
  this.on('refresh', function(){

    var prev = editor.selection.text;
    editor.trigger('select:check');
    var post = editor.selection.text;

    // If the selections has changed
    if (prev != post) {
      editor.trigger('select');
    }
  });

  this.on('select', function(){
    editor.selection.position = editor.selection.range.getBoundingClientRect();
  });

  // When the selection changes, check its value
  this.on('select', function(){

    var selected = editor.selection.text;
    var hidden = editor.menu.element.style.display !== 'block';

    if (selected && hidden) {
      editor.trigger('menu:show');
    }

    if (selected) {
      editor.trigger('menu:move');
    }

    if (!selected && !hidden) {
      editor.trigger('menu:hide');
    }
  });

  this.on('select:check', function(){

    // The selection from the current window
    var selection = window.getSelection();

    // Selected text
    editor.selection.text = selection.toString();


    // Store the *right* element
    var node = selection.anchorNode;
    if (!editor.selection.text || !node) {
      return false;
    }

    editor.selection.element = node.nodeType == 1 ? node : node.parentElement;
    editor.selection.range = selection.getRangeAt(0);
  });
};

// SHORTCUTS
Editor.prototype.shortcuts = function(){
  var editor = this;

  // Make it local and overwrite defaults
  var mousetrap = new Mousetrap();
  mousetrap.stopCallback = function(){ return false; };

  this.on('shortcut:add', function(e, data){
    if (!data) return false;
    var b = data[0];
    data = b;
    if (!data || !data.shortcut) return false;
    mousetrap.bind(data.shortcut, function(e){
      e.preventDefault();
      console.log("Prevented shortcut");
      editor.trigger('shortcut', data.action);
    });
  });

  this.on("shortcut", function(e, data){
    editor.trigger('action:' + data);
  });

  u(this.element).on("key", function(e){
    editor.trigger('refresh');
  });
};



// Tag
Editor.prototype.tag = function(name, attr){

  name = name.toLowerCase();

  var sel = this.selection.element;
  var selTag = sel.tagName.toLowerCase();

  // If the one we want to add is already added AND there're no attributes
  // if there's attributes we can assume that we want to change it, not delete it
  if (selTag === name && !attr) {

    // Don't allow including one tag into itself
    if (sel.textContent === this.selection.text) {
      this.selection.element.outerHTML = this.selection.text;
    } else {
      // Here it'd be nice to close previous tag and reopen it afterwards
    }
  } else {
    var className = "rggntymsdvshmuiersds";
    attr = attr || {};
    attr.class = attr.class ? attr.class + " " + className : className;
    var tag = "<" + name;
    for (var key in attr) {
      tag += " " + key + '="' + (attr[key] || "") + '"';
    }
    tag += ">" + this.selection.text + "</" + name + ">";
    this.command("insertHtml", tag);

    var el = u('.' + className).first();
    el.classList.remove(className);
    if (el.classList.length === 0)
      el.removeAttribute('class');

    range = document.createRange();
    range.selectNodeContents(el);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  this.trigger('refresh');
};
