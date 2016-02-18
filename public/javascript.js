(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.katex=e()}})(function(){var e,t,i;return function h(e,t,i){function a(l,s){if(!t[l]){if(!e[l]){var p=typeof require=="function"&&require;if(!s&&p)return p(l,!0);if(r)return r(l,!0);var n=new Error("Cannot find module '"+l+"'");throw n.code="MODULE_NOT_FOUND",n}var o=t[l]={exports:{}};e[l][0].call(o.exports,function(t){var i=e[l][1][t];return a(i?i:t)},o,o.exports,h,e,t,i)}return t[l].exports}var r=typeof require=="function"&&require;for(var l=0;l<i.length;l++)a(i[l]);return a}({1:[function(e,t,i){var h=e("./src/ParseError");var a=e("./src/Settings");var r=e("./src/buildTree");var l=e("./src/parseTree");var s=e("./src/utils");var p=function(e,t,i){s.clearNode(t);var h=new a(i);var p=l(e,h);var n=r(p,e,h).toNode();t.appendChild(n)};if(typeof document!=="undefined"){if(document.compatMode!=="CSS1Compat"){typeof console!=="undefined"&&console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your "+"website has a suitable doctype.");p=function(){throw new h("KaTeX doesn't work in quirks mode.")}}}var n=function(e,t){var i=new a(t);var h=l(e,i);return r(h,e,i).toMarkup()};var o=function(e,t){var i=new a(t);return l(e,i)};t.exports={render:p,renderToString:n,__parse:o,ParseError:h}},{"./src/ParseError":5,"./src/Settings":7,"./src/buildTree":12,"./src/parseTree":21,"./src/utils":23}],2:[function(e,t,i){"use strict";function h(e){if(!e.__matchAtRelocatable){var t=e.source+"|()";var i="g"+(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"");e.__matchAtRelocatable=new RegExp(t,i)}return e.__matchAtRelocatable}function a(e,t,i){if(e.global||e.sticky){throw new Error("matchAt(...): Only non-global regexes are supported")}var a=h(e);a.lastIndex=i;var r=a.exec(t);if(r[r.length-1]==null){r.length=r.length-1;return r}else{return null}}t.exports=a},{}],3:[function(e,t,i){var h=e("match-at");var a=e("./ParseError");function r(e){this._input=e}function l(e,t,i){this.text=e;this.data=t;this.position=i}var s=[/[/|@.""`0-9a-zA-Z]/,/[*+-]/,/[=<>:]/,/[,;]/,/['\^_{}]/,/[(\[]/,/[)\]?!]/,/~/,/&/,/\\\\/];var p=[/[a-zA-Z0-9`!@*()-=+\[\]'";:?\/.,]/,/[{}]/,/~/,/&/,/\\\\/];var n=/\s*/;var o=/ +|\\  +/;var c=/\\(?:[a-zA-Z]+|.)/;r.prototype._innerLex=function(e,t,i){var r=this._input;var s;if(i){s=h(n,r,e)[0];e+=s.length}else{s=h(o,r,e);if(s!==null){return new l(" ",null,e+s[0].length)}}if(e===r.length){return new l("EOF",null,e)}var p;if(p=h(c,r,e)){return new l(p[0],null,e+p[0].length)}else{for(var g=0;g<t.length;g++){var d=t[g];if(p=h(d,r,e)){return new l(p[0],null,e+p[0].length)}}}throw new a("Unexpected character: '"+r[e]+"'",this,e)};var g=/#[a-z0-9]+|[a-z]+/i;r.prototype._innerLexColor=function(e){var t=this._input;var i=h(n,t,e)[0];e+=i.length;var r;if(r=h(g,t,e)){return new l(r[0],null,e+r[0].length)}else{throw new a("Invalid color",this,e)}};var d=/(-?)\s*(\d+(?:\.\d*)?|\.\d+)\s*([a-z]{2})/;r.prototype._innerLexSize=function(e){var t=this._input;var i=h(n,t,e)[0];e+=i.length;var r;if(r=h(d,t,e)){var s=r[3];if(s!=="em"&&s!=="ex"){throw new a("Invalid unit: '"+s+"'",this,e)}return new l(r[0],{number:+(r[1]+r[2]),unit:s},e+r[0].length)}throw new a("Invalid size",this,e)};r.prototype._innerLexWhitespace=function(e){var t=this._input;var i=h(n,t,e)[0];e+=i.length;return new l(i[0],null,e)};r.prototype.lex=function(e,t){if(t==="math"){return this._innerLex(e,s,true)}else if(t==="text"){return this._innerLex(e,p,false)}else if(t==="color"){return this._innerLexColor(e)}else if(t==="size"){return this._innerLexSize(e)}else if(t==="whitespace"){return this._innerLexWhitespace(e)}};t.exports=r},{"./ParseError":5,"match-at":2}],4:[function(e,t,i){function h(e){this.style=e.style;this.color=e.color;this.size=e.size;this.phantom=e.phantom;if(e.parentStyle===undefined){this.parentStyle=e.style}else{this.parentStyle=e.parentStyle}if(e.parentSize===undefined){this.parentSize=e.size}else{this.parentSize=e.parentSize}}h.prototype.extend=function(e){var t={style:this.style,size:this.size,color:this.color,parentStyle:this.style,parentSize:this.size,phantom:this.phantom};for(var i in e){if(e.hasOwnProperty(i)){t[i]=e[i]}}return new h(t)};h.prototype.withStyle=function(e){return this.extend({style:e})};h.prototype.withSize=function(e){return this.extend({size:e})};h.prototype.withColor=function(e){return this.extend({color:e})};h.prototype.withPhantom=function(){return this.extend({phantom:true})};h.prototype.reset=function(){return this.extend({})};var a={"katex-blue":"#6495ed","katex-orange":"#ffa500","katex-pink":"#ff00af","katex-red":"#df0030","katex-green":"#28ae7b","katex-gray":"gray","katex-purple":"#9d38bd","katex-blueA":"#c7e9f1","katex-blueB":"#9cdceb","katex-blueC":"#58c4dd","katex-blueD":"#29abca","katex-blueE":"#1c758a","katex-tealA":"#acead7","katex-tealB":"#76ddc0","katex-tealC":"#5cd0b3","katex-tealD":"#55c1a7","katex-tealE":"#49a88f","katex-greenA":"#c9e2ae","katex-greenB":"#a6cf8c","katex-greenC":"#83c167","katex-greenD":"#77b05d","katex-greenE":"#699c52","katex-goldA":"#f7c797","katex-goldB":"#f9b775","katex-goldC":"#f0ac5f","katex-goldD":"#e1a158","katex-goldE":"#c78d46","katex-redA":"#f7a1a3","katex-redB":"#ff8080","katex-redC":"#fc6255","katex-redD":"#e65a4c","katex-redE":"#cf5044","katex-maroonA":"#ecabc1","katex-maroonB":"#ec92ab","katex-maroonC":"#c55f73","katex-maroonD":"#a24d61","katex-maroonE":"#94424f","katex-purpleA":"#caa3e8","katex-purpleB":"#b189c6","katex-purpleC":"#9a72ac","katex-purpleD":"#715582","katex-purpleE":"#644172","katex-mintA":"#f5f9e8","katex-mintB":"#edf2df","katex-mintC":"#e0e5cc","katex-grayA":"#fdfdfd","katex-grayB":"#f7f7f7","katex-grayC":"#eeeeee","katex-grayD":"#dddddd","katex-grayE":"#cccccc","katex-grayF":"#aaaaaa","katex-grayG":"#999999","katex-grayH":"#555555","katex-grayI":"#333333","katex-kaBlue":"#314453","katex-kaGreen":"#639b24"};h.prototype.getColor=function(){if(this.phantom){return"transparent"}else{return a[this.color]||this.color}};t.exports=h},{}],5:[function(e,t,i){function h(e,t,i){var a="KaTeX parse error: "+e;if(t!==undefined&&i!==undefined){a+=" at position "+i+": ";var r=t._input;r=r.slice(0,i)+"\u0332"+r.slice(i);var l=Math.max(0,i-15);var s=i+15;a+=r.slice(l,s)}var p=new Error(a);p.name="ParseError";p.__proto__=h.prototype;p.position=i;return p}h.prototype.__proto__=Error.prototype;t.exports=h},{}],6:[function(e,t,i){var h=e("./functions");var a=e("./environments");var r=e("./Lexer");var l=e("./symbols");var s=e("./utils");var p=e("./parseData");var n=e("./ParseError");function o(e,t){this.lexer=new r(e);this.settings=t}var c=p.ParseNode;var g=p.ParseResult;function d(e,t){this.result=e;this.isFunction=t}o.prototype.expect=function(e,t){if(e.text!==t){throw new n("Expected '"+t+"', got '"+e.text+"'",this.lexer,e.position)}};o.prototype.parse=function(e){var t=this.parseInput(0,"math");return t.result};o.prototype.parseInput=function(e,t){var i=this.parseExpression(e,t,false);this.expect(i.peek,"EOF");return i};var u=["}","\\end","\\right","&","\\\\","\\cr"];o.prototype.parseExpression=function(e,t,i,h){var a=[];var r=null;while(true){r=this.lexer.lex(e,t);if(u.indexOf(r.text)!==-1){break}if(h&&r.text===h){break}var l=this.parseAtom(e,t);if(!l){break}if(i&&l.result.type==="infix"){break}a.push(l.result);e=l.position}var s=new g(this.handleInfixNodes(a,t),e);s.peek=r;return s};o.prototype.handleInfixNodes=function(e,t){var i=-1;var a;var r;for(var l=0;l<e.length;l++){var s=e[l];if(s.type==="infix"){if(i!==-1){throw new n("only one infix operator per group",this.lexer,-1)}i=l;r=s.value.replaceWith;a=h.funcs[r]}}if(i!==-1){var p,o;var g=e.slice(0,i);var d=e.slice(i+1);if(g.length===1&&g[0].type==="ordgroup"){p=g[0]}else{p=new c("ordgroup",g,t)}if(d.length===1&&d[0].type==="ordgroup"){o=d[0]}else{o=new c("ordgroup",d,t)}var u=a.handler(r,p,o);return[new c(u.type,u,t)]}else{return e}};var w=1;o.prototype.handleSupSubscript=function(e,t,i,a){var r=this.parseGroup(e,t);if(!r){throw new n("Expected group after '"+i+"'",this.lexer,e)}else if(r.isFunction){var l=h.funcs[r.result.result].greediness;if(l>w){return this.parseFunction(e,t)}else{throw new n("Got function '"+r.result.result+"' with no arguments "+"as "+a,this.lexer,e)}}else{return r.result}};o.prototype.parseAtom=function(e,t){var i=this.parseImplicitGroup(e,t);if(t==="text"){return i}var h;if(!i){h=e;i=undefined}else{h=i.position}var a;var r;var l;while(true){var s=this.lexer.lex(h,t);if(s.text==="^"){if(a){throw new n("Double superscript",this.lexer,h)}l=this.handleSupSubscript(s.position,t,s.text,"superscript");h=l.position;a=l.result}else if(s.text==="_"){if(r){throw new n("Double subscript",this.lexer,h)}l=this.handleSupSubscript(s.position,t,s.text,"subscript");h=l.position;r=l.result}else if(s.text==="'"){var p=new c("textord","\\prime",t);var o=[p];h=s.position;while((s=this.lexer.lex(h,t)).text==="'"){o.push(p);h=s.position}a=new c("ordgroup",o,t)}else{break}}if(a||r){return new g(new c("supsub",{base:i&&i.result,sup:a,sub:r},t),h)}else{return i}};var k=["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"];var m=["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"];o.prototype.parseImplicitGroup=function(e,t){var i=this.parseSymbol(e,t);if(!i||!i.result){return this.parseFunction(e,t)}var h=i.result.result;var r;if(h==="\\left"){var l=this.parseFunction(e,t);r=this.parseExpression(l.position,t,false);this.expect(r.peek,"\\right");var p=this.parseFunction(r.position,t);return new g(new c("leftright",{body:r.result,left:l.result.value.value,right:p.result.value.value},t),p.position)}else if(h==="\\begin"){var o=this.parseFunction(e,t);var d=o.result.value.name;if(!a.hasOwnProperty(d)){throw new n("No such environment: "+d,this.lexer,o.result.value.namepos)}var u=a[d];var w=[null,t,d];var f=this.parseArguments(o.position,t,"\\begin{"+d+"}",u,w);w[0]=f;var v=u.handler.apply(this,w);var y=this.lexer.lex(v.position,t);this.expect(y,"\\end");var x=this.parseFunction(v.position,t);if(x.result.value.name!==d){throw new n("Mismatch: \\begin{"+d+"} matched "+"by \\end{"+x.result.value.name+"}",this.lexer,x.namepos)}v.position=x.position;return v}else if(s.contains(k,h)){r=this.parseExpression(i.result.position,t,false);return new g(new c("sizing",{size:"size"+(s.indexOf(k,h)+1),value:r.result},t),r.position)}else if(s.contains(m,h)){r=this.parseExpression(i.result.position,t,true);return new g(new c("styling",{style:h.slice(1,h.length-5),value:r.result},t),r.position)}else{return this.parseFunction(e,t)}};o.prototype.parseFunction=function(e,t){var i=this.parseGroup(e,t);if(i){if(i.isFunction){var a=i.result.result;var r=h.funcs[a];if(t==="text"&&!r.allowedInText){throw new n("Can't use function '"+a+"' in text mode",this.lexer,i.position)}var l=[a];var s=this.parseArguments(i.result.position,t,a,r,l);var p=h.funcs[a].handler.apply(this,l);return new g(new c(p.type,p,t),s)}else{return i.result}}else{return null}};o.prototype.parseArguments=function(e,t,i,a,r){var l=a.numArgs+a.numOptionalArgs;if(l===0){return e}var s=e;var p=a.greediness;var o=[s];for(var c=0;c<l;c++){var g=a.argTypes&&a.argTypes[c];var d;if(c<a.numOptionalArgs){if(g){d=this.parseSpecialGroup(s,g,t,true)}else{d=this.parseOptionalGroup(s,t)}if(!d){r.push(null);o.push(s);continue}}else{if(g){d=this.parseSpecialGroup(s,g,t)}else{d=this.parseGroup(s,t)}if(!d){throw new n("Expected group after '"+i+"'",this.lexer,s)}}var u;if(d.isFunction){var w=h.funcs[d.result.result].greediness;if(w>p){u=this.parseFunction(s,t)}else{throw new n("Got function '"+d.result.result+"' as "+"argument to '"+i+"'",this.lexer,d.result.position-1)}}else{u=d.result}r.push(u.result);o.push(u.position);s=u.position}r.push(o);return s};o.prototype.parseSpecialGroup=function(e,t,i,h){if(t==="original"){t=i}if(t==="color"||t==="size"){var a=this.lexer.lex(e,i);if(h&&a.text!=="["){return null}this.expect(a,h?"[":"{");var r=this.lexer.lex(a.position,t);var l;if(t==="color"){l=r.text}else{l=r.data}var s=this.lexer.lex(r.position,i);this.expect(s,h?"]":"}");return new d(new g(new c(t,l,i),s.position),false)}else if(t==="text"){var p=this.lexer.lex(e,"whitespace");e=p.position}if(h){return this.parseOptionalGroup(e,t)}else{return this.parseGroup(e,t)}};o.prototype.parseGroup=function(e,t){var i=this.lexer.lex(e,t);if(i.text==="{"){var h=this.parseExpression(i.position,t,false);var a=this.lexer.lex(h.position,t);this.expect(a,"}");return new d(new g(new c("ordgroup",h.result,t),a.position),false)}else{return this.parseSymbol(e,t)}};o.prototype.parseOptionalGroup=function(e,t){var i=this.lexer.lex(e,t);if(i.text==="["){var h=this.parseExpression(i.position,t,false,"]");var a=this.lexer.lex(h.position,t);this.expect(a,"]");return new d(new g(new c("ordgroup",h.result,t),a.position),false)}else{return null}};o.prototype.parseSymbol=function(e,t){var i=this.lexer.lex(e,t);if(h.funcs[i.text]){return new d(new g(i.text,i.position),true)}else if(l[t][i.text]){return new d(new g(new c(l[t][i.text].group,i.text,t),i.position),false)}else{return null}};o.prototype.ParseNode=c;t.exports=o},{"./Lexer":3,"./ParseError":5,"./environments":15,"./functions":18,"./parseData":20,"./symbols":22,"./utils":23}],7:[function(e,t,i){function h(e,t){return e===undefined?t:e}function a(e){e=e||{};this.displayMode=h(e.displayMode,false)}t.exports=a},{}],8:[function(e,t,i){function h(e,t,i,h){this.id=e;this.size=t;this.cramped=h;this.sizeMultiplier=i}h.prototype.sup=function(){return u[w[this.id]]};h.prototype.sub=function(){return u[k[this.id]]};h.prototype.fracNum=function(){return u[m[this.id]]};h.prototype.fracDen=function(){return u[f[this.id]]};h.prototype.cramp=function(){return u[v[this.id]]};h.prototype.cls=function(){return g[this.size]+(this.cramped?" cramped":" uncramped")};h.prototype.reset=function(){return d[this.size]};var a=0;var r=1;var l=2;var s=3;var p=4;var n=5;var o=6;var c=7;var g=["displaystyle textstyle","textstyle","scriptstyle","scriptscriptstyle"];var d=["reset-textstyle","reset-textstyle","reset-scriptstyle","reset-scriptscriptstyle"];var u=[new h(a,0,1,false),new h(r,0,1,true),new h(l,1,1,false),new h(s,1,1,true),new h(p,2,.7,false),new h(n,2,.7,true),new h(o,3,.5,false),new h(c,3,.5,true)];var w=[p,n,p,n,o,c,o,c];var k=[n,n,n,n,c,c,c,c];var m=[l,s,p,n,o,c,o,c];var f=[s,s,n,n,c,c,c,c];var v=[r,r,s,s,n,n,c,c];t.exports={DISPLAY:u[a],TEXT:u[l],SCRIPT:u[p],SCRIPTSCRIPT:u[o]}},{}],9:[function(e,t,i){var h=e("./domTree");var a=e("./fontMetrics");var r=e("./symbols");var l=function(e,t,i,l,s){if(r[i][e]&&r[i][e].replace){e=r[i][e].replace}var p=a.getCharacterMetrics(e,t);var n;if(p){n=new h.symbolNode(e,p.height,p.depth,p.italic,p.skew,s)}else{typeof console!=="undefined"&&console.warn("No character metrics for '"+e+"' in style '"+t+"'");n=new h.symbolNode(e,0,0,0,0,s)}if(l){n.style.color=l}return n};var s=function(e,t,i,h){return l(e,"Math-Italic",t,i,h.concat(["mathit"]))};var p=function(e,t,i,h){if(r[t][e].font==="main"){return l(e,"Main-Regular",t,i,h)}else{return l(e,"AMS-Regular",t,i,h.concat(["amsrm"]))}};var n=function(e){var t=0;var i=0;var h=0;if(e.children){for(var a=0;a<e.children.length;a++){if(e.children[a].height>t){t=e.children[a].height}if(e.children[a].depth>i){i=e.children[a].depth}if(e.children[a].maxFontSize>h){h=e.children[a].maxFontSize}}}e.height=t;e.depth=i;e.maxFontSize=h};var o=function(e,t,i){var a=new h.span(e,t);n(a);if(i){a.style.color=i}return a};var c=function(e){var t=new h.documentFragment(e);n(t);return t};var g=function(e,t){var i=o([],[new h.symbolNode("\u200b")]);i.style.fontSize=t/e.style.sizeMultiplier+"em";var a=o(["fontsize-ensurer","reset-"+e.size,"size5"],[i]);return a};var d=function(e,t,i,a){var r;var l;var s;if(t==="individualShift"){var p=e;e=[p[0]];r=-p[0].shift-p[0].elem.depth;l=r;for(s=1;s<p.length;s++){var n=-p[s].shift-l-p[s].elem.depth;var c=n-(p[s-1].elem.height+p[s-1].elem.depth);l=l+n;e.push({type:"kern",size:c});e.push(p[s])}}else if(t==="top"){var d=i;for(s=0;s<e.length;s++){if(e[s].type==="kern"){d-=e[s].size}else{d-=e[s].elem.height+e[s].elem.depth}}r=d}else if(t==="bottom"){r=-i}else if(t==="shift"){r=-e[0].elem.depth-i}else if(t==="firstBaseline"){r=-e[0].elem.depth}else{r=0}var u=0;for(s=0;s<e.length;s++){if(e[s].type==="elem"){u=Math.max(u,e[s].elem.maxFontSize)}}var w=g(a,u);var k=[];l=r;for(s=0;s<e.length;s++){if(e[s].type==="kern"){l+=e[s].size}else{var m=e[s].elem;var f=-m.depth-l;l+=m.height+m.depth;var v=o([],[w,m]);v.height-=f;v.depth+=f;v.style.top=f+"em";k.push(v)}}var y=o(["baseline-fix"],[w,new h.symbolNode("\u200b")]);k.push(y);var x=o(["vlist"],k);x.height=Math.max(l,x.height);x.depth=Math.max(-r,x.depth);return x};var u={size1:.5,size2:.7,size3:.8,size4:.9,size5:1,size6:1.2,size7:1.44,size8:1.73,size9:2.07,size10:2.49};var w={"\\qquad":{size:"2em",className:"qquad"},"\\quad":{size:"1em",className:"quad"},"\\enspace":{size:"0.5em",className:"enspace"},"\\;":{size:"0.277778em",className:"thickspace"},"\\:":{size:"0.22222em",className:"mediumspace"},"\\,":{size:"0.16667em",className:"thinspace"},"\\!":{size:"-0.16667em",className:"negativethinspace"}};t.exports={makeSymbol:l,mathit:s,mathrm:p,makeSpan:o,makeFragment:c,makeVList:d,sizingMultiplier:u,spacingFunctions:w}},{"./domTree":14,"./fontMetrics":16,"./symbols":22}],10:[function(e,t,i){var h=e("./Options");var a=e("./ParseError");var r=e("./Style");var l=e("./buildCommon");var s=e("./delimiter");var p=e("./domTree");var n=e("./fontMetrics");var o=e("./utils");var c=l.makeSpan;var g=function(e,t,i){var h=[];for(var a=0;a<e.length;a++){var r=e[a];h.push(y(r,t,i));i=r}return h};var d={mathord:"mord",textord:"mord",bin:"mbin",rel:"mrel",text:"mord",open:"mopen",close:"mclose",inner:"minner",genfrac:"mord",array:"mord",spacing:"mord",punct:"mpunct",ordgroup:"mord",op:"mop",katex:"mord",overline:"mord",rule:"mord",leftright:"minner",sqrt:"mord",accent:"mord"};var u=function(e){if(e==null){return d.mathord}else if(e.type==="supsub"){return u(e.value.base)}else if(e.type==="llap"||e.type==="rlap"){return u(e.value)}else if(e.type==="color"){return u(e.value.value)}else if(e.type==="sizing"){return u(e.value.value)}else if(e.type==="styling"){return u(e.value.value)}else if(e.type==="delimsizing"){return d[e.value.delimType]}else{return d[e.type]}};var w=function(e,t){if(!e){return false}else if(e.type==="op"){return e.value.limits&&t.style.size===r.DISPLAY.size}else if(e.type==="accent"){return m(e.value.base)}else{return null}};var k=function(e){if(!e){return false}else if(e.type==="ordgroup"){if(e.value.length===1){return k(e.value[0])}else{return e}}else if(e.type==="color"){if(e.value.value.length===1){return k(e.value.value[0])}else{return e}}else{return e}};var m=function(e){var t=k(e);return t.type==="mathord"||t.type==="textord"||t.type==="bin"||t.type==="rel"||t.type==="inner"||t.type==="open"||t.type==="close"||t.type==="punct"};var f=function(e){return c(["sizing","reset-"+e.size,"size5",e.style.reset(),r.TEXT.cls(),"nulldelimiter"])};var v={mathord:function(e,t,i){return l.mathit(e.value,e.mode,t.getColor(),["mord"])},textord:function(e,t,i){return l.mathrm(e.value,e.mode,t.getColor(),["mord"])},bin:function(e,t,i){var h="mbin";var a=i;while(a&&a.type==="color"){var r=a.value.value;a=r[r.length-1]}if(!i||o.contains(["mbin","mopen","mrel","mop","mpunct"],u(a))){e.type="textord";h="mord"}return l.mathrm(e.value,e.mode,t.getColor(),[h])},rel:function(e,t,i){return l.mathrm(e.value,e.mode,t.getColor(),["mrel"])},open:function(e,t,i){return l.mathrm(e.value,e.mode,t.getColor(),["mopen"])},close:function(e,t,i){return l.mathrm(e.value,e.mode,t.getColor(),["mclose"])},inner:function(e,t,i){return l.mathrm(e.value,e.mode,t.getColor(),["minner"])},punct:function(e,t,i){return l.mathrm(e.value,e.mode,t.getColor(),["mpunct"])},ordgroup:function(e,t,i){return c(["mord",t.style.cls()],g(e.value,t.reset()))},text:function(e,t,i){return c(["text","mord",t.style.cls()],g(e.value.body,t.reset()))},color:function(e,t,i){var h=g(e.value.value,t.withColor(e.value.color),i);return new l.makeFragment(h)},supsub:function(e,t,i){if(w(e.value.base,t)){return v[e.value.base.type](e,t,i)}var h=y(e.value.base,t.reset());var a,s,o,g;if(e.value.sup){o=y(e.value.sup,t.withStyle(t.style.sup()));a=c([t.style.reset(),t.style.sup().cls()],[o])}if(e.value.sub){g=y(e.value.sub,t.withStyle(t.style.sub()));s=c([t.style.reset(),t.style.sub().cls()],[g])}var d,k;if(m(e.value.base)){d=0;k=0}else{d=h.height-n.metrics.supDrop;k=h.depth+n.metrics.subDrop}var f;if(t.style===r.DISPLAY){f=n.metrics.sup1}else if(t.style.cramped){f=n.metrics.sup3}else{f=n.metrics.sup2}var x=r.TEXT.sizeMultiplier*t.style.sizeMultiplier;var b=.5/n.metrics.ptPerEm/x+"em";var z;if(!e.value.sup){k=Math.max(k,n.metrics.sub1,g.height-.8*n.metrics.xHeight);z=l.makeVList([{type:"elem",elem:s}],"shift",k,t);z.children[0].style.marginRight=b;if(h instanceof p.symbolNode){z.children[0].style.marginLeft=-h.italic+"em"}}else if(!e.value.sub){d=Math.max(d,f,o.depth+.25*n.metrics.xHeight);z=l.makeVList([{type:"elem",elem:a}],"shift",-d,t);z.children[0].style.marginRight=b}else{d=Math.max(d,f,o.depth+.25*n.metrics.xHeight);k=Math.max(k,n.metrics.sub2);var S=n.metrics.defaultRuleThickness;if(d-o.depth-(g.height-k)<4*S){k=4*S-(d-o.depth)+g.height;var M=.8*n.metrics.xHeight-(d-o.depth);if(M>0){d+=M;k-=M}}z=l.makeVList([{type:"elem",elem:s,shift:k},{type:"elem",elem:a,shift:-d}],"individualShift",null,t);if(h instanceof p.symbolNode){z.children[0].style.marginLeft=-h.italic+"em"}z.children[0].style.marginRight=b;z.children[1].style.marginRight=b}return c([u(e.value.base)],[h,z])},genfrac:function(e,t,i){var h=t.style;if(e.value.size==="display"){h=r.DISPLAY}else if(e.value.size==="text"){h=r.TEXT}var a=h.fracNum();var p=h.fracDen();var o=y(e.value.numer,t.withStyle(a));var g=c([h.reset(),a.cls()],[o]);var d=y(e.value.denom,t.withStyle(p));var u=c([h.reset(),p.cls()],[d]);var w;if(e.value.hasBarLine){w=n.metrics.defaultRuleThickness/t.style.sizeMultiplier}else{w=0}var k;var m;var v;if(h.size===r.DISPLAY.size){k=n.metrics.num1;if(w>0){m=3*w}else{m=7*n.metrics.defaultRuleThickness}v=n.metrics.denom1}else{if(w>0){k=n.metrics.num2;m=w}else{k=n.metrics.num3;m=3*n.metrics.defaultRuleThickness}v=n.metrics.denom2}var x;if(w===0){var b=k-o.depth-(d.height-v);if(b<m){k+=.5*(m-b);v+=.5*(m-b)}x=l.makeVList([{type:"elem",elem:u,shift:v},{type:"elem",elem:g,shift:-k}],"individualShift",null,t)}else{var z=n.metrics.axisHeight;if(k-o.depth-(z+.5*w)<m){k+=m-(k-o.depth-(z+.5*w))}if(z-.5*w-(d.height-v)<m){v+=m-(z-.5*w-(d.height-v))}var S=c([t.style.reset(),r.TEXT.cls(),"frac-line"]);S.height=w;var M=-(z-.5*w);x=l.makeVList([{type:"elem",elem:u,shift:v},{type:"elem",elem:S,shift:M},{type:"elem",elem:g,shift:-k}],"individualShift",null,t)}x.height*=h.sizeMultiplier/t.style.sizeMultiplier;x.depth*=h.sizeMultiplier/t.style.sizeMultiplier;var q;if(h.size===r.DISPLAY.size){q=n.metrics.delim1}else{q=n.metrics.getDelim2(h)}var A,T;if(e.value.leftDelim==null){A=f(t)}else{A=s.customSizedDelim(e.value.leftDelim,q,true,t.withStyle(h),e.mode)}if(e.value.rightDelim==null){T=f(t)}else{T=s.customSizedDelim(e.value.rightDelim,q,true,t.withStyle(h),e.mode)}return c(["mord",t.style.reset(),h.cls()],[A,c(["mfrac"],[x]),T],t.getColor())},array:function(e,t,i){var h,a;var r=e.value.body.length;var s=0;var p=new Array(r);var g=1/n.metrics.ptPerEm;var d=5*g;var u=12*g;var w=o.deflt(e.value.arraystretch,1);var k=w*u;var m=.7*k;var f=.3*k;var v=0;for(h=0;h<e.value.body.length;++h){var x=e.value.body[h];var b=m;var z=f;if(s<x.length){s=x.length}var S=new Array(x.length);for(a=0;a<x.length;++a){var M=y(x[a],t);if(z<M.depth){z=M.depth}if(b<M.height){b=M.height}S[a]=M}var q=0;if(e.value.rowGaps[h]){q=e.value.rowGaps[h].value;switch(q.unit){case"em":q=q.number;break;case"ex":q=q.number*n.metrics.emPerEx;break;default:console.error("Can't handle unit "+q.unit);q=0}if(q>0){q+=f;if(z<q){z=q}q=0}}S.height=b;S.depth=z;v+=b;S.pos=v;v+=z+q;p[h]=S}var A=v/2+n.metrics.axisHeight;var T=e.value.cols||[];var N=[];var C;for(a=0;a<s;++a){var E=T[a]||{};var R;if(a>0||e.value.hskipBeforeAndAfter){R=o.deflt(E.pregap,d);if(R!==0){C=c(["arraycolsep"],[]);C.style.width=R+"em";N.push(C)}}var P=[];for(h=0;h<r;++h){var D=p[h];var L=D[a];if(!L){continue}var O=D.pos-A;L.depth=D.depth;L.height=D.height;P.push({type:"elem",elem:L,shift:O})}P=l.makeVList(P,"individualShift",null,t);P=c(["col-align-"+(E.align||"c")],[P]);N.push(P);if(a<s-1||e.value.hskipBeforeAndAfter){R=o.deflt(E.postgap,d);if(R!==0){C=c(["arraycolsep"],[]);C.style.width=R+"em";N.push(C)}}}p=c(["mtable"],N);return c(["mord"],[p],t.getColor())},spacing:function(e,t,i){if(e.value==="\\ "||e.value==="\\space"||e.value===" "||e.value==="~"){return c(["mord","mspace"],[l.mathrm(e.value,e.mode)])}else{return c(["mord","mspace",l.spacingFunctions[e.value].className])}},llap:function(e,t,i){var h=c(["inner"],[y(e.value.body,t.reset())]);var a=c(["fix"],[]);return c(["llap",t.style.cls()],[h,a])},rlap:function(e,t,i){var h=c(["inner"],[y(e.value.body,t.reset())]);var a=c(["fix"],[]);return c(["rlap",t.style.cls()],[h,a])},op:function(e,t,i){var h;var a;var s=false;if(e.type==="supsub"){h=e.value.sup;a=e.value.sub;e=e.value.base;s=true}var p=["\\smallint"];var g=false;if(t.style.size===r.DISPLAY.size&&e.value.symbol&&!o.contains(p,e.value.body)){g=true}var d;var u=0;var w=0;if(e.value.symbol){var k=g?"Size2-Regular":"Size1-Regular";d=l.makeSymbol(e.value.body,k,"math",t.getColor(),["op-symbol",g?"large-op":"small-op","mop"]);u=(d.height-d.depth)/2-n.metrics.axisHeight*t.style.sizeMultiplier;w=d.italic}else{var m=[];for(var f=1;f<e.value.body.length;f++){m.push(l.mathrm(e.value.body[f],e.mode))}d=c(["mop"],m,t.getColor())}if(s){d=c([],[d]);var v,x,b,z;if(h){var S=y(h,t.withStyle(t.style.sup()));v=c([t.style.reset(),t.style.sup().cls()],[S]);x=Math.max(n.metrics.bigOpSpacing1,n.metrics.bigOpSpacing3-S.depth)}if(a){var M=y(a,t.withStyle(t.style.sub()));b=c([t.style.reset(),t.style.sub().cls()],[M]);z=Math.max(n.metrics.bigOpSpacing2,n.metrics.bigOpSpacing4-M.height)}var q,A,T;if(!h){A=d.height-u;q=l.makeVList([{type:"kern",size:n.metrics.bigOpSpacing5},{type:"elem",elem:b},{type:"kern",size:z},{type:"elem",elem:d}],"top",A,t);q.children[0].style.marginLeft=-w+"em"}else if(!a){T=d.depth+u;q=l.makeVList([{type:"elem",elem:d},{type:"kern",size:x},{type:"elem",elem:v},{type:"kern",size:n.metrics.bigOpSpacing5}],"bottom",T,t);q.children[1].style.marginLeft=w+"em"}else if(!h&&!a){return d}else{T=n.metrics.bigOpSpacing5+b.height+b.depth+z+d.depth+u;q=l.makeVList([{type:"kern",size:n.metrics.bigOpSpacing5},{type:"elem",elem:b},{type:"kern",size:z},{type:"elem",elem:d},{type:"kern",size:x},{type:"elem",elem:v},{type:"kern",size:n.metrics.bigOpSpacing5}],"bottom",T,t);q.children[0].style.marginLeft=-w+"em";q.children[2].style.marginLeft=w+"em"}return c(["mop","op-limits"],[q])}else{if(e.value.symbol){d.style.top=u+"em"}return d}},katex:function(e,t,i){var h=c(["k"],[l.mathrm("K",e.mode)]);var a=c(["a"],[l.mathrm("A",e.mode)]);a.height=(a.height+.2)*.75;a.depth=(a.height-.2)*.75;var r=c(["t"],[l.mathrm("T",e.mode)]);var s=c(["e"],[l.mathrm("E",e.mode)]);s.height=s.height-.2155;s.depth=s.depth+.2155;var p=c(["x"],[l.mathrm("X",e.mode)]);return c(["katex-logo"],[h,a,r,s,p],t.getColor())},overline:function(e,t,i){var h=y(e.value.body,t.withStyle(t.style.cramp()));var a=n.metrics.defaultRuleThickness/t.style.sizeMultiplier;var s=c([t.style.reset(),r.TEXT.cls(),"overline-line"]);s.height=a;s.maxFontSize=1;var p=l.makeVList([{type:"elem",elem:h},{type:"kern",size:3*a},{type:"elem",elem:s},{type:"kern",size:a}],"firstBaseline",null,t);return c(["overline","mord"],[p],t.getColor())},sqrt:function(e,t,i){var h=y(e.value.body,t.withStyle(t.style.cramp()));var a=n.metrics.defaultRuleThickness/t.style.sizeMultiplier;var p=c([t.style.reset(),r.TEXT.cls(),"sqrt-line"],[],t.getColor());p.height=a;p.maxFontSize=1;var o=a;if(t.style.id<r.TEXT.id){o=n.metrics.xHeight}var g=a+o/4;var d=(h.height+h.depth)*t.style.sizeMultiplier;var u=d+g+a;var w=c(["sqrt-sign"],[s.customSizedDelim("\\surd",u,false,t,e.mode)],t.getColor());var k=w.height+w.depth-a;if(k>h.height+h.depth+g){g=(g+k-h.height-h.depth)/2}var m=-(h.height+g+a)+w.height;w.style.top=m+"em";w.height-=m;w.depth+=m;var f;if(h.height===0&&h.depth===0){f=c()}else{f=l.makeVList([{type:"elem",elem:h},{type:"kern",size:g},{type:"elem",elem:p},{type:"kern",size:a}],"firstBaseline",null,t)}if(!e.value.index){return c(["sqrt","mord"],[w,f])}else{var v=y(e.value.index,t.withStyle(r.SCRIPTSCRIPT));var x=c([t.style.reset(),r.SCRIPTSCRIPT.cls()],[v]);var b=Math.max(w.height,f.height);var z=Math.max(w.depth,f.depth);var S=.6*(b-z);var M=l.makeVList([{type:"elem",elem:x}],"shift",-S,t);var q=c(["root"],[M]);return c(["sqrt","mord"],[q,w,f])}},sizing:function(e,t,i){var h=g(e.value.value,t.withSize(e.value.size),i);var a=c(["mord"],[c(["sizing","reset-"+t.size,e.value.size,t.style.cls()],h)]);var r=l.sizingMultiplier[e.value.size];a.maxFontSize=r*t.style.sizeMultiplier;return a},styling:function(e,t,i){var h={display:r.DISPLAY,text:r.TEXT,script:r.SCRIPT,scriptscript:r.SCRIPTSCRIPT};var a=h[e.value.style];var l=g(e.value.value,t.withStyle(a),i);return c([t.style.reset(),a.cls()],l)},delimsizing:function(e,t,i){var h=e.value.value;if(h==="."){return c([d[e.value.delimType]])}return c([d[e.value.delimType]],[s.sizedDelim(h,e.value.size,t,e.mode)])},leftright:function(e,t,i){var h=g(e.value.body,t.reset());var a=0;var r=0;for(var l=0;l<h.length;l++){a=Math.max(h[l].height,a);r=Math.max(h[l].depth,r)}a*=t.style.sizeMultiplier;r*=t.style.sizeMultiplier;var p;if(e.value.left==="."){p=f(t)}else{p=s.leftRightDelim(e.value.left,a,r,t,e.mode)}h.unshift(p);var n;if(e.value.right==="."){n=f(t)}else{n=s.leftRightDelim(e.value.right,a,r,t,e.mode)}h.push(n);return c(["minner",t.style.cls()],h,t.getColor())},rule:function(e,t,i){var h=c(["mord","rule"],[],t.getColor());var a=0;if(e.value.shift){a=e.value.shift.number;if(e.value.shift.unit==="ex"){a*=n.metrics.xHeight}}var r=e.value.width.number;if(e.value.width.unit==="ex"){r*=n.metrics.xHeight}var l=e.value.height.number;if(e.value.height.unit==="ex"){l*=n.metrics.xHeight}a/=t.style.sizeMultiplier;r/=t.style.sizeMultiplier;l/=t.style.sizeMultiplier;h.style.borderRightWidth=r+"em";h.style.borderTopWidth=l+"em";h.style.bottom=a+"em";h.width=r;h.height=l+a;h.depth=-a;return h},accent:function(e,t,i){var h=e.value.base;var a;if(e.type==="supsub"){var r=e;e=r.value.base;h=e.value.base;r.value.base=h;a=y(r,t.reset(),i)}var s=y(h,t.withStyle(t.style.cramp()));var p;if(m(h)){var o=k(h);var g=y(o,t.withStyle(t.style.cramp()));p=g.skew}else{p=0}var d=Math.min(s.height,n.metrics.xHeight);var u=l.makeSymbol(e.value.accent,"Main-Regular","math",t.getColor());u.italic=0;var w=e.value.accent==="\\vec"?"accent-vec":null;var f=c(["accent-body",w],[c([],[u])]);f=l.makeVList([{type:"elem",elem:s},{type:"kern",size:-d},{type:"elem",elem:f}],"firstBaseline",null,t);f.children[1].style.marginLeft=2*p+"em";var v=c(["mord","accent"],[f]);if(a){a.children[0]=v;a.height=Math.max(v.height,a.height);a.classes[0]="mord";return a}else{return v}},phantom:function(e,t,i){var h=g(e.value.value,t.withPhantom(),i);return new l.makeFragment(h)}};var y=function(e,t,i){if(!e){return c()}if(v[e.type]){var h=v[e.type](e,t,i);var r;if(t.style!==t.parentStyle){r=t.style.sizeMultiplier/t.parentStyle.sizeMultiplier;h.height*=r;h.depth*=r}if(t.size!==t.parentSize){r=l.sizingMultiplier[t.size]/l.sizingMultiplier[t.parentSize];h.height*=r;h.depth*=r}return h}else{throw new a("Got group of unknown type: '"+e.type+"'")}};var x=function(e,t){e=JSON.parse(JSON.stringify(e));var i=r.TEXT;if(t.displayMode){i=r.DISPLAY}var a=new h({style:i,size:"size5"});var l=g(e,a);
var s=c(["base",a.style.cls()],l);var p=c(["strut"]);var n=c(["strut","bottom"]);p.style.height=s.height+"em";n.style.height=s.height+s.depth+"em";n.style.verticalAlign=-s.depth+"em";var o=c(["katex-html"],[p,n,s]);o.setAttribute("aria-hidden","true");return o};t.exports=x},{"./Options":4,"./ParseError":5,"./Style":8,"./buildCommon":9,"./delimiter":13,"./domTree":14,"./fontMetrics":16,"./utils":23}],11:[function(e,t,i){var h=e("./buildCommon");var a=e("./mathMLTree");var r=e("./ParseError");var l=e("./symbols");var s=h.makeSpan;var p=function(e,t){if(l[t][e]&&l[t][e].replace){e=l[t][e].replace}return new a.TextNode(e)};var n={mathord:function(e){var t=new a.MathNode("mi",[p(e.value,e.mode)]);return t},textord:function(e){var t=p(e.value,e.mode);var i;if(/[0-9]/.test(e.value)){i=new a.MathNode("mn",[t])}else{i=new a.MathNode("mi",[t]);i.setAttribute("mathvariant","normal")}return i},bin:function(e){var t=new a.MathNode("mo",[p(e.value,e.mode)]);return t},rel:function(e){var t=new a.MathNode("mo",[p(e.value,e.mode)]);return t},open:function(e){var t=new a.MathNode("mo",[p(e.value,e.mode)]);return t},close:function(e){var t=new a.MathNode("mo",[p(e.value,e.mode)]);return t},inner:function(e){var t=new a.MathNode("mo",[p(e.value,e.mode)]);return t},punct:function(e){var t=new a.MathNode("mo",[p(e.value,e.mode)]);t.setAttribute("separator","true");return t},ordgroup:function(e){var t=o(e.value);var i=new a.MathNode("mrow",t);return i},text:function(e){var t=o(e.value.body);var i=new a.MathNode("mtext",t);return i},color:function(e){var t=o(e.value.value);var i=new a.MathNode("mstyle",t);i.setAttribute("mathcolor",e.value.color);return i},supsub:function(e){var t=[c(e.value.base)];if(e.value.sub){t.push(c(e.value.sub))}if(e.value.sup){t.push(c(e.value.sup))}var i;if(!e.value.sub){i="msup"}else if(!e.value.sup){i="msub"}else{i="msubsup"}var h=new a.MathNode(i,t);return h},genfrac:function(e){var t=new a.MathNode("mfrac",[c(e.value.numer),c(e.value.denom)]);if(!e.value.hasBarLine){t.setAttribute("linethickness","0px")}if(e.value.leftDelim!=null||e.value.rightDelim!=null){var i=[];if(e.value.leftDelim!=null){var h=new a.MathNode("mo",[new a.TextNode(e.value.leftDelim)]);h.setAttribute("fence","true");i.push(h)}i.push(t);if(e.value.rightDelim!=null){var r=new a.MathNode("mo",[new a.TextNode(e.value.rightDelim)]);r.setAttribute("fence","true");i.push(r)}var l=new a.MathNode("mrow",i);return l}return t},array:function(e){return new a.MathNode("mtable",e.value.body.map(function(e){return new a.MathNode("mtr",e.map(function(e){return new a.MathNode("mtd",[c(e)])}))}))},sqrt:function(e){var t;if(e.value.index){t=new a.MathNode("mroot",[c(e.value.body),c(e.value.index)])}else{t=new a.MathNode("msqrt",[c(e.value.body)])}return t},leftright:function(e){var t=o(e.value.body);if(e.value.left!=="."){var i=new a.MathNode("mo",[p(e.value.left,e.mode)]);i.setAttribute("fence","true");t.unshift(i)}if(e.value.right!=="."){var h=new a.MathNode("mo",[p(e.value.right,e.mode)]);h.setAttribute("fence","true");t.push(h)}var r=new a.MathNode("mrow",t);return r},accent:function(e){var t=new a.MathNode("mo",[p(e.value.accent,e.mode)]);var i=new a.MathNode("mover",[c(e.value.base),t]);i.setAttribute("accent","true");return i},spacing:function(e){var t;if(e.value==="\\ "||e.value==="\\space"||e.value===" "||e.value==="~"){t=new a.MathNode("mtext",[new a.TextNode("\xa0")])}else{t=new a.MathNode("mspace");t.setAttribute("width",h.spacingFunctions[e.value].size)}return t},op:function(e){var t;if(e.value.symbol){t=new a.MathNode("mo",[p(e.value.body,e.mode)])}else{t=new a.MathNode("mi",[new a.TextNode(e.value.body.slice(1))])}return t},katex:function(e){var t=new a.MathNode("mtext",[new a.TextNode("KaTeX")]);return t},delimsizing:function(e){var t=[];if(e.value.value!=="."){t.push(p(e.value.value,e.mode))}var i=new a.MathNode("mo",t);if(e.value.delimType==="open"||e.value.delimType==="close"){i.setAttribute("fence","true")}else{i.setAttribute("fence","false")}return i},styling:function(e){var t=o(e.value.value,t);var i=new a.MathNode("mstyle",t);var h={display:["0","true"],text:["0","false"],script:["1","false"],scriptscript:["2","false"]};var r=h[e.value.style];i.setAttribute("scriptlevel",r[0]);i.setAttribute("displaystyle",r[1]);return i},sizing:function(e){var t=o(e.value.value);var i=new a.MathNode("mstyle",t);i.setAttribute("mathsize",h.sizingMultiplier[e.value.size]+"em");return i},overline:function(e){var t=new a.MathNode("mo",[new a.TextNode("\u203e")]);t.setAttribute("stretchy","true");var i=new a.MathNode("mover",[c(e.value.body),t]);i.setAttribute("accent","true");return i},rule:function(e){var t=new a.MathNode("mrow");return t},llap:function(e){var t=new a.MathNode("mpadded",[c(e.value.body)]);t.setAttribute("lspace","-1width");t.setAttribute("width","0px");return t},rlap:function(e){var t=new a.MathNode("mpadded",[c(e.value.body)]);t.setAttribute("width","0px");return t},phantom:function(e,t,i){var h=o(e.value.value);return new a.MathNode("mphantom",h)}};var o=function(e){var t=[];for(var i=0;i<e.length;i++){var h=e[i];t.push(c(h))}return t};var c=function(e){if(!e){return new a.MathNode("mrow")}if(n[e.type]){return n[e.type](e)}else{throw new r("Got group of unknown type: '"+e.type+"'")}};var g=function(e,t,i){var h=o(e);var r=new a.MathNode("mrow",h);var l=new a.MathNode("annotation",[new a.TextNode(t)]);l.setAttribute("encoding","application/x-tex");var p=new a.MathNode("semantics",[r,l]);var n=new a.MathNode("math",[p]);return s(["katex-mathml"],[n])};t.exports=g},{"./ParseError":5,"./buildCommon":9,"./mathMLTree":19,"./symbols":22}],12:[function(e,t,i){var h=e("./buildHTML");var a=e("./buildMathML");var r=e("./buildCommon");var l=r.makeSpan;var s=function(e,t,i){var r=a(e,t,i);var s=h(e,i);var p=l(["katex"],[r,s]);if(i.displayMode){return l(["katex-display"],[p])}else{return p}};t.exports=s},{"./buildCommon":9,"./buildHTML":10,"./buildMathML":11}],13:[function(e,t,i){var h=e("./ParseError");var a=e("./Style");var r=e("./buildCommon");var l=e("./fontMetrics");var s=e("./symbols");var p=e("./utils");var n=r.makeSpan;var o=function(e,t){if(s.math[e]&&s.math[e].replace){return l.getCharacterMetrics(s.math[e].replace,t)}else{return l.getCharacterMetrics(e,t)}};var c=function(e,t,i){return r.makeSymbol(e,"Size"+t+"-Regular",i)};var g=function(e,t,i){var h=n(["style-wrap",i.style.reset(),t.cls()],[e]);var a=t.sizeMultiplier/i.style.sizeMultiplier;h.height*=a;h.depth*=a;h.maxFontSize=t.sizeMultiplier;return h};var d=function(e,t,i,h,a){var s=r.makeSymbol(e,"Main-Regular",a);var p=g(s,t,h);if(i){var n=(1-h.style.sizeMultiplier/t.sizeMultiplier)*l.metrics.axisHeight;p.style.top=n+"em";p.height-=n;p.depth+=n}return p};var u=function(e,t,i,h,r){var s=c(e,t,r);var p=g(n(["delimsizing","size"+t],[s],h.getColor()),a.TEXT,h);if(i){var o=(1-h.style.sizeMultiplier)*l.metrics.axisHeight;p.style.top=o+"em";p.height-=o;p.depth+=o}return p};var w=function(e,t,i){var h;if(t==="Size1-Regular"){h="delim-size1"}else if(t==="Size4-Regular"){h="delim-size4"}var a=n(["delimsizinginner",h],[n([],[r.makeSymbol(e,t,i)])]);return{type:"elem",elem:a}};var k=function(e,t,i,h,s){var p,c,d,u;p=d=u=e;c=null;var k="Size1-Regular";if(e==="\\uparrow"){d=u="\u23d0"}else if(e==="\\Uparrow"){d=u="\u2016"}else if(e==="\\downarrow"){p=d="\u23d0"}else if(e==="\\Downarrow"){p=d="\u2016"}else if(e==="\\updownarrow"){p="\\uparrow";d="\u23d0";u="\\downarrow"}else if(e==="\\Updownarrow"){p="\\Uparrow";d="\u2016";u="\\Downarrow"}else if(e==="["||e==="\\lbrack"){p="\u23a1";d="\u23a2";u="\u23a3";k="Size4-Regular"}else if(e==="]"||e==="\\rbrack"){p="\u23a4";d="\u23a5";u="\u23a6";k="Size4-Regular"}else if(e==="\\lfloor"){d=p="\u23a2";u="\u23a3";k="Size4-Regular"}else if(e==="\\lceil"){p="\u23a1";d=u="\u23a2";k="Size4-Regular"}else if(e==="\\rfloor"){d=p="\u23a5";u="\u23a6";k="Size4-Regular"}else if(e==="\\rceil"){p="\u23a4";d=u="\u23a5";k="Size4-Regular"}else if(e==="("){p="\u239b";d="\u239c";u="\u239d";k="Size4-Regular"}else if(e===")"){p="\u239e";d="\u239f";u="\u23a0";k="Size4-Regular"}else if(e==="\\{"||e==="\\lbrace"){p="\u23a7";c="\u23a8";u="\u23a9";d="\u23aa";k="Size4-Regular"}else if(e==="\\}"||e==="\\rbrace"){p="\u23ab";c="\u23ac";u="\u23ad";d="\u23aa";k="Size4-Regular"}else if(e==="\\surd"){p="\ue001";u="\u23b7";d="\ue000";k="Size4-Regular"}var m=o(p,k);var f=m.height+m.depth;var v=o(d,k);var y=v.height+v.depth;var x=o(u,k);var b=x.height+x.depth;var z=0;var S=1;if(c!==null){var M=o(c,k);z=M.height+M.depth;S=2}var q=f+b+z;var A=Math.ceil((t-q)/(S*y));var T=q+A*S*y;var N=l.metrics.axisHeight;if(i){N*=h.style.sizeMultiplier}var C=T/2-N;var E=[];E.push(w(u,k,s));var R;if(c===null){for(R=0;R<A;R++){E.push(w(d,k,s))}}else{for(R=0;R<A;R++){E.push(w(d,k,s))}E.push(w(c,k,s));for(R=0;R<A;R++){E.push(w(d,k,s))}}E.push(w(p,k,s));var P=r.makeVList(E,"bottom",C,h);return g(n(["delimsizing","mult"],[P],h.getColor()),a.TEXT,h)};var m=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","\\surd"];var f=["\\uparrow","\\downarrow","\\updownarrow","\\Uparrow","\\Downarrow","\\Updownarrow","|","\\|","\\vert","\\Vert"];var v=["<",">","\\langle","\\rangle","/","\\backslash"];var y=[0,1.2,1.8,2.4,3];var x=function(e,t,i,a){if(e==="<"){e="\\langle"}else if(e===">"){e="\\rangle"}if(p.contains(m,e)||p.contains(v,e)){return u(e,t,false,i,a)}else if(p.contains(f,e)){return k(e,y[t],false,i,a)}else{throw new h("Illegal delimiter: '"+e+"'")}};var b=[{type:"small",style:a.SCRIPTSCRIPT},{type:"small",style:a.SCRIPT},{type:"small",style:a.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4}];var z=[{type:"small",style:a.SCRIPTSCRIPT},{type:"small",style:a.SCRIPT},{type:"small",style:a.TEXT},{type:"stack"}];var S=[{type:"small",style:a.SCRIPTSCRIPT},{type:"small",style:a.SCRIPT},{type:"small",style:a.TEXT},{type:"large",size:1},{type:"large",size:2},{type:"large",size:3},{type:"large",size:4},{type:"stack"}];var M=function(e){if(e.type==="small"){return"Main-Regular"}else if(e.type==="large"){return"Size"+e.size+"-Regular"}else if(e.type==="stack"){return"Size4-Regular"}};var q=function(e,t,i,h){var a=Math.min(2,3-h.style.size);for(var r=a;r<i.length;r++){if(i[r].type==="stack"){break}var l=o(e,M(i[r]));var s=l.height+l.depth;if(i[r].type==="small"){s*=i[r].style.sizeMultiplier}if(s>t){return i[r]}}return i[i.length-1]};var A=function(e,t,i,h,a){if(e==="<"){e="\\langle"}else if(e===">"){e="\\rangle"}var r;if(p.contains(v,e)){r=b}else if(p.contains(m,e)){r=S}else{r=z}var l=q(e,t,r,h);if(l.type==="small"){return d(e,l.style,i,h,a)}else if(l.type==="large"){return u(e,l.size,i,h,a)}else if(l.type==="stack"){return k(e,t,i,h,a)}};var T=function(e,t,i,h,a){var r=l.metrics.axisHeight*h.style.sizeMultiplier;var s=901;var p=5/l.metrics.ptPerEm;var n=Math.max(t-r,i+r);var o=Math.max(n/500*s,2*n-p);return A(e,o,true,h,a)};t.exports={sizedDelim:x,customSizedDelim:A,leftRightDelim:T}},{"./ParseError":5,"./Style":8,"./buildCommon":9,"./fontMetrics":16,"./symbols":22,"./utils":23}],14:[function(e,t,i){var h=e("./utils");var a=function(e){e=e.slice();for(var t=e.length-1;t>=0;t--){if(!e[t]){e.splice(t,1)}}return e.join(" ")};function r(e,t,i,h,a,r){this.classes=e||[];this.children=t||[];this.height=i||0;this.depth=h||0;this.maxFontSize=a||0;this.style=r||{};this.attributes={}}r.prototype.setAttribute=function(e,t){this.attributes[e]=t};r.prototype.toNode=function(){var e=document.createElement("span");e.className=a(this.classes);for(var t in this.style){if(Object.prototype.hasOwnProperty.call(this.style,t)){e.style[t]=this.style[t]}}for(var i in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,i)){e.setAttribute(i,this.attributes[i])}}for(var h=0;h<this.children.length;h++){e.appendChild(this.children[h].toNode())}return e};r.prototype.toMarkup=function(){var e="<span";if(this.classes.length){e+=' class="';e+=h.escape(a(this.classes));e+='"'}var t="";for(var i in this.style){if(this.style.hasOwnProperty(i)){t+=h.hyphenate(i)+":"+this.style[i]+";"}}if(t){e+=' style="'+h.escape(t)+'"'}for(var r in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,r)){e+=" "+r+'="';e+=h.escape(this.attributes[r]);e+='"'}}e+=">";for(var l=0;l<this.children.length;l++){e+=this.children[l].toMarkup()}e+="</span>";return e};function l(e,t,i,h){this.children=e||[];this.height=t||0;this.depth=i||0;this.maxFontSize=h||0}l.prototype.toNode=function(){var e=document.createDocumentFragment();for(var t=0;t<this.children.length;t++){e.appendChild(this.children[t].toNode())}return e};l.prototype.toMarkup=function(){var e="";for(var t=0;t<this.children.length;t++){e+=this.children[t].toMarkup()}return e};function s(e,t,i,h,a,r,l){this.value=e||"";this.height=t||0;this.depth=i||0;this.italic=h||0;this.skew=a||0;this.classes=r||[];this.style=l||{};this.maxFontSize=0}s.prototype.toNode=function(){var e=document.createTextNode(this.value);var t=null;if(this.italic>0){t=document.createElement("span");t.style.marginRight=this.italic+"em"}if(this.classes.length>0){t=t||document.createElement("span");t.className=a(this.classes)}for(var i in this.style){if(this.style.hasOwnProperty(i)){t=t||document.createElement("span");t.style[i]=this.style[i]}}if(t){t.appendChild(e);return t}else{return e}};s.prototype.toMarkup=function(){var e=false;var t="<span";if(this.classes.length){e=true;t+=' class="';t+=h.escape(a(this.classes));t+='"'}var i="";if(this.italic>0){i+="margin-right:"+this.italic+"em;"}for(var r in this.style){if(this.style.hasOwnProperty(r)){i+=h.hyphenate(r)+":"+this.style[r]+";"}}if(i){e=true;t+=' style="'+h.escape(i)+'"'}var l=h.escape(this.value);if(e){t+=">";t+=l;t+="</span>";return t}else{return l}};t.exports={span:r,documentFragment:l,symbolNode:s}},{"./utils":23}],15:[function(e,t,i){var h=e("./fontMetrics");var a=e("./parseData");var r=e("./ParseError");var l=a.ParseNode;var s=a.ParseResult;function p(e,t,i,h){var a=[],p=[a],n=[];while(true){var o=e.parseExpression(t,i,false,null);a.push(new l("ordgroup",o.result,i));t=o.position;var c=o.peek.text;if(c==="&"){t=o.peek.position}else if(c==="\\end"){break}else if(c==="\\\\"||c==="\\cr"){var g=e.parseFunction(t,i);n.push(g.result.value.size);t=g.position;a=[];p.push(a)}else{throw new r("Expected & or \\\\ or \\end",e.lexer,o.peek.position)}}h.body=p;h.rowGaps=n;return new s(new l(h.type,h,i),t)}var n=[{names:["array"],numArgs:1,handler:function(e,t,i,h,a){var l=this;h=h.value.map?h.value:[h];var s=h.map(function(e){var t=e.value;if("lcr".indexOf(t)!==-1){return{align:t}}throw new r("Unknown column alignment: "+e.value,l.lexer,a[1])});var n={type:"array",cols:s,hskipBeforeAndAfter:true};n=p(l,e,t,n);return n}},{names:["matrix","pmatrix","bmatrix","Bmatrix","vmatrix","Vmatrix"],handler:function(e,t,i){var h={matrix:null,pmatrix:["(",")"],bmatrix:["[","]"],Bmatrix:["\\{","\\}"],vmatrix:["|","|"],Vmatrix:["\\Vert","\\Vert"]}[i];var a={type:"array",hskipBeforeAndAfter:false};a=p(this,e,t,a);if(h){a.result=new l("leftright",{body:[a.result],left:h[0],right:h[1]},t)}return a}},{names:["cases"],handler:function(e,t,i){var a={type:"array",arraystretch:1.2,cols:[{align:"l",pregap:0,postgap:h.metrics.quad},{align:"l",pregap:0,postgap:0}]};a=p(this,e,t,a);a.result=new l("leftright",{body:[a.result],left:"\\{",right:"."},t);return a}}];t.exports=function(){var e={};for(var t=0;t<n.length;++t){var i=n[t];i.greediness=1;i.allowedInText=!!i.allowedInText;i.numArgs=i.numArgs||0;i.numOptionalArgs=i.numOptionalArgs||0;for(var h=0;h<i.names.length;++h){e[i.names[h]]=i}}return e}()},{"./ParseError":5,"./fontMetrics":16,"./parseData":20}],16:[function(e,t,i){var h=e("./Style");var a=.025;var r=0;var l=0;var s=0;var p=.431;var n=1;var o=0;var c=.677;var g=.394;var d=.444;var u=.686;var w=.345;var k=.413;var m=.363;var f=.289;var v=.15;var y=.247;var x=.386;var b=.05;var z=2.39;var S=1.01;var M=.81;var q=.71;var A=.25;var T=0;var N=0;var C=0;var E=0;var R=.431;var P=1;var D=0;var L=.04;var O=.111;var I=.166;var B=.2;var F=.6;var _=.1;var G=10;var V={xHeight:p,quad:n,num1:c,num2:g,num3:d,denom1:u,denom2:w,sup1:k,sup2:m,sup3:f,sub1:v,sub2:y,supDrop:x,subDrop:b,axisHeight:A,defaultRuleThickness:L,bigOpSpacing1:O,bigOpSpacing2:I,bigOpSpacing3:B,bigOpSpacing4:F,bigOpSpacing5:_,ptPerEm:G,emPerEx:p/n,delim1:z,getDelim2:function(e){if(e.size===h.TEXT.size){return S}else if(e.size===h.SCRIPT.size){return M}else if(e.size===h.SCRIPTSCRIPT.size){return q}throw new Error("Unexpected style size: "+e.size)}};var H=e("./fontMetricsData");var X=function(e,t){return H[t][e.charCodeAt(0)]};t.exports={metrics:V,getCharacterMetrics:X}},{"./Style":8,"./fontMetricsData":17}],17:[function(e,t,i){t.exports={"AMS-Regular":{65:{depth:0,height:.68889,italic:0,skew:0},66:{depth:0,height:.68889,italic:0,skew:0},67:{depth:0,height:.68889,italic:0,skew:0},68:{depth:0,height:.68889,italic:0,skew:0},69:{depth:0,height:.68889,italic:0,skew:0},70:{depth:0,height:.68889,italic:0,skew:0},71:{depth:0,height:.68889,italic:0,skew:0},72:{depth:0,height:.68889,italic:0,skew:0},73:{depth:0,height:.68889,italic:0,skew:0},74:{depth:.16667,height:.68889,italic:0,skew:0},75:{depth:0,height:.68889,italic:0,skew:0},76:{depth:0,height:.68889,italic:0,skew:0},77:{depth:0,height:.68889,italic:0,skew:0},78:{depth:0,height:.68889,italic:0,skew:0},79:{depth:.16667,height:.68889,italic:0,skew:0},80:{depth:0,height:.68889,italic:0,skew:0},81:{depth:.16667,height:.68889,italic:0,skew:0},82:{depth:0,height:.68889,italic:0,skew:0},83:{depth:0,height:.68889,italic:0,skew:0},84:{depth:0,height:.68889,italic:0,skew:0},85:{depth:0,height:.68889,italic:0,skew:0},86:{depth:0,height:.68889,italic:0,skew:0},87:{depth:0,height:.68889,italic:0,skew:0},88:{depth:0,height:.68889,italic:0,skew:0},89:{depth:0,height:.68889,italic:0,skew:0},90:{depth:0,height:.68889,italic:0,skew:0},107:{depth:0,height:.68889,italic:0,skew:0},165:{depth:0,height:.675,italic:.025,skew:0},174:{depth:.15559,height:.69224,italic:0,skew:0},240:{depth:0,height:.68889,italic:0,skew:0},295:{depth:0,height:.68889,italic:0,skew:0},710:{depth:0,height:.825,italic:0,skew:0},732:{depth:0,height:.9,italic:0,skew:0},770:{depth:0,height:.825,italic:0,skew:0},771:{depth:0,height:.9,italic:0,skew:0},989:{depth:.08167,height:.58167,italic:0,skew:0},1008:{depth:0,height:.43056,italic:.04028,skew:0},8245:{depth:0,height:.54986,italic:0,skew:0},8463:{depth:0,height:.68889,italic:0,skew:0},8487:{depth:0,height:.68889,italic:0,skew:0},8498:{depth:0,height:.68889,italic:0,skew:0},8502:{depth:0,height:.68889,italic:0,skew:0},8503:{depth:0,height:.68889,italic:0,skew:0},8504:{depth:0,height:.68889,italic:0,skew:0},8513:{depth:0,height:.68889,italic:0,skew:0},8592:{depth:-.03598,height:.46402,italic:0,skew:0},8594:{depth:-.03598,height:.46402,italic:0,skew:0},8602:{depth:-.13313,height:.36687,italic:0,skew:0},8603:{depth:-.13313,height:.36687,italic:0,skew:0},8606:{depth:.01354,height:.52239,italic:0,skew:0},8608:{depth:.01354,height:.52239,italic:0,skew:0},8610:{depth:.01354,height:.52239,italic:0,skew:0},8611:{depth:.01354,height:.52239,italic:0,skew:0},8619:{depth:0,height:.54986,italic:0,skew:0},8620:{depth:0,height:.54986,italic:0,skew:0},8621:{depth:-.13313,height:.37788,italic:0,skew:0},8622:{depth:-.13313,height:.36687,italic:0,skew:0},8624:{depth:0,height:.69224,italic:0,skew:0},8625:{depth:0,height:.69224,italic:0,skew:0},8630:{depth:0,height:.43056,italic:0,skew:0},8631:{depth:0,height:.43056,italic:0,skew:0},8634:{depth:.08198,height:.58198,italic:0,skew:0},8635:{depth:.08198,height:.58198,italic:0,skew:0},8638:{depth:.19444,height:.69224,italic:0,skew:0},8639:{depth:.19444,height:.69224,italic:0,skew:0},8642:{depth:.19444,height:.69224,italic:0,skew:0},8643:{depth:.19444,height:.69224,italic:0,skew:0},8644:{depth:.1808,height:.675,italic:0,skew:0},8646:{depth:.1808,height:.675,italic:0,skew:0},8647:{depth:.1808,height:.675,italic:0,skew:0},8648:{depth:.19444,height:.69224,italic:0,skew:0},8649:{depth:.1808,height:.675,italic:0,skew:0},8650:{depth:.19444,height:.69224,italic:0,skew:0},8651:{depth:.01354,height:.52239,italic:0,skew:0},8652:{depth:.01354,height:.52239,italic:0,skew:0},8653:{depth:-.13313,height:.36687,italic:0,skew:0},8654:{depth:-.13313,height:.36687,italic:0,skew:0},8655:{depth:-.13313,height:.36687,italic:0,skew:0},8666:{depth:.13667,height:.63667,italic:0,skew:0},8667:{depth:.13667,height:.63667,italic:0,skew:0},8669:{depth:-.13313,height:.37788,italic:0,skew:0},8672:{depth:-.064,height:.437,italic:0,skew:0},8674:{depth:-.064,height:.437,italic:0,skew:0},8705:{depth:0,height:.825,italic:0,skew:0},8708:{depth:0,height:.68889,italic:0,skew:0},8709:{depth:.08167,height:.58167,italic:0,skew:0},8717:{depth:0,height:.43056,italic:0,skew:0},8722:{depth:-.03598,height:.46402,italic:0,skew:0},8724:{depth:.08198,height:.69224,italic:0,skew:0},8726:{depth:.08167,height:.58167,italic:0,skew:0},8733:{depth:0,height:.69224,italic:0,skew:0},8736:{depth:0,height:.69224,italic:0,skew:0},8737:{depth:0,height:.69224,italic:0,skew:0},8738:{depth:.03517,height:.52239,italic:0,skew:0},8739:{depth:.08167,height:.58167,italic:0,skew:0},8740:{depth:.25142,height:.74111,italic:0,skew:0},8741:{depth:.08167,height:.58167,italic:0,skew:0},8742:{depth:.25142,height:.74111,italic:0,skew:0},8756:{depth:0,height:.69224,italic:0,skew:0},8757:{depth:0,height:.69224,italic:0,skew:0},8764:{depth:-.13313,height:.36687,italic:0,skew:0},8765:{depth:-.13313,height:.37788,italic:0,skew:0},8769:{depth:-.13313,height:.36687,italic:0,skew:0},8770:{depth:-.03625,height:.46375,italic:0,skew:0},8774:{depth:.30274,height:.79383,italic:0,skew:0},8776:{depth:-.01688,height:.48312,italic:0,skew:0},8778:{depth:.08167,height:.58167,italic:0,skew:0},8782:{depth:.06062,height:.54986,italic:0,skew:0},8783:{depth:.06062,height:.54986,italic:0,skew:0},8785:{depth:.08198,height:.58198,italic:0,skew:0},8786:{depth:.08198,height:.58198,italic:0,skew:0},8787:{depth:.08198,height:.58198,italic:0,skew:0},8790:{depth:0,height:.69224,italic:0,skew:0},8791:{depth:.22958,height:.72958,italic:0,skew:0},8796:{depth:.08198,height:.91667,italic:0,skew:0},8806:{depth:.25583,height:.75583,italic:0,skew:0},8807:{depth:.25583,height:.75583,italic:0,skew:0},8808:{depth:.25142,height:.75726,italic:0,skew:0},8809:{depth:.25142,height:.75726,italic:0,skew:0},8812:{depth:.25583,height:.75583,italic:0,skew:0},8814:{depth:.20576,height:.70576,italic:0,skew:0},8815:{depth:.20576,height:.70576,italic:0,skew:0},8816:{depth:.30274,height:.79383,italic:0,skew:0},8817:{depth:.30274,height:.79383,italic:0,skew:0},8818:{depth:.22958,height:.72958,italic:0,skew:0},8819:{depth:.22958,height:.72958,italic:0,skew:0},8822:{depth:.1808,height:.675,italic:0,skew:0},8823:{depth:.1808,height:.675,italic:0,skew:0},8828:{depth:.13667,height:.63667,italic:0,skew:0},8829:{depth:.13667,height:.63667,italic:0,skew:0},8830:{depth:.22958,height:.72958,italic:0,skew:0},8831:{depth:.22958,height:.72958,italic:0,skew:0},8832:{depth:.20576,height:.70576,italic:0,skew:0},8833:{depth:.20576,height:.70576,italic:0,skew:0},8840:{depth:.30274,height:.79383,italic:0,skew:0},8841:{depth:.30274,height:.79383,italic:0,skew:0},8842:{depth:.13597,height:.63597,italic:0,skew:0},8843:{depth:.13597,height:.63597,italic:0,skew:0},8847:{depth:.03517,height:.54986,italic:0,skew:0},8848:{depth:.03517,height:.54986,italic:0,skew:0},8858:{depth:.08198,height:.58198,italic:0,skew:0},8859:{depth:.08198,height:.58198,italic:0,skew:0},8861:{depth:.08198,height:.58198,italic:0,skew:0},8862:{depth:0,height:.675,italic:0,skew:0},8863:{depth:0,height:.675,italic:0,skew:0},8864:{depth:0,height:.675,italic:0,skew:0},8865:{depth:0,height:.675,italic:0,skew:0},8872:{depth:0,height:.69224,italic:0,skew:0},8873:{depth:0,height:.69224,italic:0,skew:0},8874:{depth:0,height:.69224,italic:0,skew:0},8876:{depth:0,height:.68889,italic:0,skew:0},8877:{depth:0,height:.68889,italic:0,skew:0},8878:{depth:0,height:.68889,italic:0,skew:0},8879:{depth:0,height:.68889,italic:0,skew:0},8882:{depth:.03517,height:.54986,italic:0,skew:0},8883:{depth:.03517,height:.54986,italic:0,skew:0},8884:{depth:.13667,height:.63667,italic:0,skew:0},8885:{depth:.13667,height:.63667,italic:0,skew:0},8888:{depth:0,height:.54986,italic:0,skew:0},8890:{depth:.19444,height:.43056,italic:0,skew:0},8891:{depth:.19444,height:.69224,italic:0,skew:0},8892:{depth:.19444,height:.69224,italic:0,skew:0},8901:{depth:0,height:.54986,italic:0,skew:0},8903:{depth:.08167,height:.58167,italic:0,skew:0},8905:{depth:.08167,height:.58167,italic:0,skew:0},8906:{depth:.08167,height:.58167,italic:0,skew:0},8907:{depth:0,height:.69224,italic:0,skew:0},8908:{depth:0,height:.69224,italic:0,skew:0},8909:{depth:-.03598,height:.46402,italic:0,skew:0},8910:{depth:0,height:.54986,italic:0,skew:0},8911:{depth:0,height:.54986,italic:0,skew:0},8912:{depth:.03517,height:.54986,italic:0,skew:0},8913:{depth:.03517,height:.54986,italic:0,skew:0},8914:{depth:0,height:.54986,italic:0,skew:0},8915:{depth:0,height:.54986,italic:0,skew:0},8916:{depth:0,height:.69224,italic:0,skew:0},8918:{depth:.0391,height:.5391,italic:0,skew:0},8919:{depth:.0391,height:.5391,italic:0,skew:0},8920:{depth:.03517,height:.54986,italic:0,skew:0},8921:{depth:.03517,height:.54986,italic:0,skew:0},8922:{depth:.38569,height:.88569,italic:0,skew:0},8923:{depth:.38569,height:.88569,italic:0,skew:0},8926:{depth:.13667,height:.63667,italic:0,skew:0},8927:{depth:.13667,height:.63667,italic:0,skew:0},8928:{depth:.30274,height:.79383,italic:0,skew:0},8929:{depth:.30274,height:.79383,italic:0,skew:0},8934:{depth:.23222,height:.74111,italic:0,skew:0},8935:{depth:.23222,height:.74111,italic:0,skew:0},8936:{depth:.23222,height:.74111,italic:0,skew:0},8937:{depth:.23222,height:.74111,italic:0,skew:0},8938:{depth:.20576,height:.70576,italic:0,skew:0},8939:{depth:.20576,height:.70576,italic:0,skew:0},8940:{depth:.30274,height:.79383,italic:0,skew:0},8941:{depth:.30274,height:.79383,italic:0,skew:0},8994:{depth:.19444,height:.69224,italic:0,skew:0},8995:{depth:.19444,height:.69224,italic:0,skew:0},9416:{depth:.15559,height:.69224,italic:0,skew:0},9484:{depth:0,height:.69224,italic:0,skew:0},9488:{depth:0,height:.69224,italic:0,skew:0},9492:{depth:0,height:.37788,italic:0,skew:0},9496:{depth:0,height:.37788,italic:0,skew:0},9585:{depth:.19444,height:.68889,italic:0,skew:0},9586:{depth:.19444,height:.74111,italic:0,skew:0},9632:{depth:0,height:.675,italic:0,skew:0},9633:{depth:0,height:.675,italic:0,skew:0},9650:{depth:0,height:.54986,italic:0,skew:0},9651:{depth:0,height:.54986,italic:0,skew:0},9654:{depth:.03517,height:.54986,italic:0,skew:0},9660:{depth:0,height:.54986,italic:0,skew:0},9661:{depth:0,height:.54986,italic:0,skew:0},9664:{depth:.03517,height:.54986,italic:0,skew:0},9674:{depth:.11111,height:.69224,italic:0,skew:0},9733:{depth:.19444,height:.69224,italic:0,skew:0},10003:{depth:0,height:.69224,italic:0,skew:0},10016:{depth:0,height:.69224,italic:0,skew:0},10731:{depth:.11111,height:.69224,italic:0,skew:0},10846:{depth:.19444,height:.75583,italic:0,skew:0},10877:{depth:.13667,height:.63667,italic:0,skew:0},10878:{depth:.13667,height:.63667,italic:0,skew:0},10885:{depth:.25583,height:.75583,italic:0,skew:0},10886:{depth:.25583,height:.75583,italic:0,skew:0},10887:{depth:.13597,height:.63597,italic:0,skew:0},10888:{depth:.13597,height:.63597,italic:0,skew:0},10889:{depth:.26167,height:.75726,italic:0,skew:0},10890:{depth:.26167,height:.75726,italic:0,skew:0},10891:{depth:.48256,height:.98256,italic:0,skew:0},10892:{depth:.48256,height:.98256,italic:0,skew:0},10901:{depth:.13667,height:.63667,italic:0,skew:0},10902:{depth:.13667,height:.63667,italic:0,skew:0},10933:{depth:.25142,height:.75726,italic:0,skew:0},10934:{depth:.25142,height:.75726,italic:0,skew:0},10935:{depth:.26167,height:.75726,italic:0,skew:0},10936:{depth:.26167,height:.75726,italic:0,skew:0},10937:{depth:.26167,height:.75726,italic:0,skew:0},10938:{depth:.26167,height:.75726,italic:0,skew:0},10949:{depth:.25583,height:.75583,italic:0,skew:0},10950:{depth:.25583,height:.75583,italic:0,skew:0},10955:{depth:.28481,height:.79383,italic:0,skew:0},10956:{depth:.28481,height:.79383,italic:0,skew:0},57350:{depth:.08167,height:.58167,italic:0,skew:0},57351:{depth:.08167,height:.58167,italic:0,skew:0},57352:{depth:.08167,height:.58167,italic:0,skew:0},57353:{depth:0,height:.43056,italic:.04028,skew:0},57356:{depth:.25142,height:.75726,italic:0,skew:0},57357:{depth:.25142,height:.75726,italic:0,skew:0},57358:{depth:.41951,height:.91951,italic:0,skew:0},57359:{depth:.30274,height:.79383,italic:0,skew:0},57360:{depth:.30274,height:.79383,italic:0,skew:0},57361:{depth:.41951,height:.91951,italic:0,skew:0},57366:{depth:.25142,height:.75726,italic:0,skew:0},57367:{depth:.25142,height:.75726,italic:0,skew:0},57368:{depth:.25142,height:.75726,italic:0,skew:0},57369:{depth:.25142,height:.75726,italic:0,skew:0},57370:{depth:.13597,height:.63597,italic:0,skew:0},57371:{depth:.13597,height:.63597,italic:0,skew:0}},"Main-Bold":{33:{depth:0,height:.69444,italic:0,skew:0},34:{depth:0,height:.69444,italic:0,skew:0},35:{depth:.19444,height:.69444,italic:0,skew:0},36:{depth:.05556,height:.75,italic:0,skew:0},37:{depth:.05556,height:.75,italic:0,skew:0},38:{depth:0,height:.69444,italic:0,skew:0},39:{depth:0,height:.69444,italic:0,skew:0},40:{depth:.25,height:.75,italic:0,skew:0},41:{depth:.25,height:.75,italic:0,skew:0},42:{depth:0,height:.75,italic:0,skew:0},43:{depth:.13333,height:.63333,italic:0,skew:0},44:{depth:.19444,height:.15556,italic:0,skew:0},45:{depth:0,height:.44444,italic:0,skew:0},46:{depth:0,height:.15556,italic:0,skew:0},47:{depth:.25,height:.75,italic:0,skew:0},48:{depth:0,height:.64444,italic:0,skew:0},49:{depth:0,height:.64444,italic:0,skew:0},50:{depth:0,height:.64444,italic:0,skew:0},51:{depth:0,height:.64444,italic:0,skew:0},52:{depth:0,height:.64444,italic:0,skew:0},53:{depth:0,height:.64444,italic:0,skew:0},54:{depth:0,height:.64444,italic:0,skew:0},55:{depth:0,height:.64444,italic:0,skew:0},56:{depth:0,height:.64444,italic:0,skew:0},57:{depth:0,height:.64444,italic:0,skew:0},58:{depth:0,height:.44444,italic:0,skew:0},59:{depth:.19444,height:.44444,italic:0,skew:0},60:{depth:.08556,height:.58556,italic:0,skew:0},61:{depth:-.10889,height:.39111,italic:0,skew:0},62:{depth:.08556,height:.58556,italic:0,skew:0},63:{depth:0,height:.69444,italic:0,skew:0},64:{depth:0,height:.69444,italic:0,skew:0},65:{depth:0,height:.68611,italic:0,skew:0},66:{depth:0,height:.68611,italic:0,skew:0},67:{depth:0,height:.68611,italic:0,skew:0},68:{depth:0,height:.68611,italic:0,skew:0},69:{depth:0,height:.68611,italic:0,skew:0},70:{depth:0,height:.68611,italic:0,skew:0},71:{depth:0,height:.68611,italic:0,skew:0},72:{depth:0,height:.68611,italic:0,skew:0},73:{depth:0,height:.68611,italic:0,skew:0},74:{depth:0,height:.68611,italic:0,skew:0},75:{depth:0,height:.68611,italic:0,skew:0},76:{depth:0,height:.68611,italic:0,skew:0},77:{depth:0,height:.68611,italic:0,skew:0},78:{depth:0,height:.68611,italic:0,skew:0},79:{depth:0,height:.68611,italic:0,skew:0},80:{depth:0,height:.68611,italic:0,skew:0},81:{depth:.19444,height:.68611,italic:0,skew:0},82:{depth:0,height:.68611,italic:0,skew:0},83:{depth:0,height:.68611,italic:0,skew:0},84:{depth:0,height:.68611,italic:0,skew:0},85:{depth:0,height:.68611,italic:0,skew:0},86:{depth:0,height:.68611,italic:.01597,skew:0},87:{depth:0,height:.68611,italic:.01597,skew:0},88:{depth:0,height:.68611,italic:0,skew:0},89:{depth:0,height:.68611,italic:.02875,skew:0},90:{depth:0,height:.68611,italic:0,skew:0},91:{depth:.25,height:.75,italic:0,skew:0},92:{depth:.25,height:.75,italic:0,skew:0},93:{depth:.25,height:.75,italic:0,skew:0},94:{depth:0,height:.69444,italic:0,skew:0},95:{depth:.31,height:.13444,italic:.03194,skew:0},96:{depth:0,height:.69444,italic:0,skew:0},97:{depth:0,height:.44444,italic:0,skew:0},98:{depth:0,height:.69444,italic:0,skew:0},99:{depth:0,height:.44444,italic:0,skew:0},100:{depth:0,height:.69444,italic:0,
skew:0},101:{depth:0,height:.44444,italic:0,skew:0},102:{depth:0,height:.69444,italic:.10903,skew:0},103:{depth:.19444,height:.44444,italic:.01597,skew:0},104:{depth:0,height:.69444,italic:0,skew:0},105:{depth:0,height:.69444,italic:0,skew:0},106:{depth:.19444,height:.69444,italic:0,skew:0},107:{depth:0,height:.69444,italic:0,skew:0},108:{depth:0,height:.69444,italic:0,skew:0},109:{depth:0,height:.44444,italic:0,skew:0},110:{depth:0,height:.44444,italic:0,skew:0},111:{depth:0,height:.44444,italic:0,skew:0},112:{depth:.19444,height:.44444,italic:0,skew:0},113:{depth:.19444,height:.44444,italic:0,skew:0},114:{depth:0,height:.44444,italic:0,skew:0},115:{depth:0,height:.44444,italic:0,skew:0},116:{depth:0,height:.63492,italic:0,skew:0},117:{depth:0,height:.44444,italic:0,skew:0},118:{depth:0,height:.44444,italic:.01597,skew:0},119:{depth:0,height:.44444,italic:.01597,skew:0},120:{depth:0,height:.44444,italic:0,skew:0},121:{depth:.19444,height:.44444,italic:.01597,skew:0},122:{depth:0,height:.44444,italic:0,skew:0},123:{depth:.25,height:.75,italic:0,skew:0},124:{depth:.25,height:.75,italic:0,skew:0},125:{depth:.25,height:.75,italic:0,skew:0},126:{depth:.35,height:.34444,italic:0,skew:0},168:{depth:0,height:.69444,italic:0,skew:0},172:{depth:0,height:.44444,italic:0,skew:0},175:{depth:0,height:.59611,italic:0,skew:0},176:{depth:0,height:.69444,italic:0,skew:0},177:{depth:.13333,height:.63333,italic:0,skew:0},180:{depth:0,height:.69444,italic:0,skew:0},215:{depth:.13333,height:.63333,italic:0,skew:0},247:{depth:.13333,height:.63333,italic:0,skew:0},305:{depth:0,height:.44444,italic:0,skew:0},567:{depth:.19444,height:.44444,italic:0,skew:0},710:{depth:0,height:.69444,italic:0,skew:0},711:{depth:0,height:.63194,italic:0,skew:0},713:{depth:0,height:.59611,italic:0,skew:0},714:{depth:0,height:.69444,italic:0,skew:0},715:{depth:0,height:.69444,italic:0,skew:0},728:{depth:0,height:.69444,italic:0,skew:0},729:{depth:0,height:.69444,italic:0,skew:0},730:{depth:0,height:.69444,italic:0,skew:0},732:{depth:0,height:.69444,italic:0,skew:0},768:{depth:0,height:.69444,italic:0,skew:0},769:{depth:0,height:.69444,italic:0,skew:0},770:{depth:0,height:.69444,italic:0,skew:0},771:{depth:0,height:.69444,italic:0,skew:0},772:{depth:0,height:.59611,italic:0,skew:0},774:{depth:0,height:.69444,italic:0,skew:0},775:{depth:0,height:.69444,italic:0,skew:0},776:{depth:0,height:.69444,italic:0,skew:0},778:{depth:0,height:.69444,italic:0,skew:0},779:{depth:0,height:.69444,italic:0,skew:0},780:{depth:0,height:.63194,italic:0,skew:0},824:{depth:.19444,height:.69444,italic:0,skew:0},915:{depth:0,height:.68611,italic:0,skew:0},916:{depth:0,height:.68611,italic:0,skew:0},920:{depth:0,height:.68611,italic:0,skew:0},923:{depth:0,height:.68611,italic:0,skew:0},926:{depth:0,height:.68611,italic:0,skew:0},928:{depth:0,height:.68611,italic:0,skew:0},931:{depth:0,height:.68611,italic:0,skew:0},933:{depth:0,height:.68611,italic:0,skew:0},934:{depth:0,height:.68611,italic:0,skew:0},936:{depth:0,height:.68611,italic:0,skew:0},937:{depth:0,height:.68611,italic:0,skew:0},8211:{depth:0,height:.44444,italic:.03194,skew:0},8212:{depth:0,height:.44444,italic:.03194,skew:0},8216:{depth:0,height:.69444,italic:0,skew:0},8217:{depth:0,height:.69444,italic:0,skew:0},8220:{depth:0,height:.69444,italic:0,skew:0},8221:{depth:0,height:.69444,italic:0,skew:0},8224:{depth:.19444,height:.69444,italic:0,skew:0},8225:{depth:.19444,height:.69444,italic:0,skew:0},8242:{depth:0,height:.55556,italic:0,skew:0},8407:{depth:0,height:.72444,italic:.15486,skew:0},8463:{depth:0,height:.69444,italic:0,skew:0},8465:{depth:0,height:.69444,italic:0,skew:0},8467:{depth:0,height:.69444,italic:0,skew:0},8472:{depth:.19444,height:.44444,italic:0,skew:0},8476:{depth:0,height:.69444,italic:0,skew:0},8501:{depth:0,height:.69444,italic:0,skew:0},8592:{depth:-.10889,height:.39111,italic:0,skew:0},8593:{depth:.19444,height:.69444,italic:0,skew:0},8594:{depth:-.10889,height:.39111,italic:0,skew:0},8595:{depth:.19444,height:.69444,italic:0,skew:0},8596:{depth:-.10889,height:.39111,italic:0,skew:0},8597:{depth:.25,height:.75,italic:0,skew:0},8598:{depth:.19444,height:.69444,italic:0,skew:0},8599:{depth:.19444,height:.69444,italic:0,skew:0},8600:{depth:.19444,height:.69444,italic:0,skew:0},8601:{depth:.19444,height:.69444,italic:0,skew:0},8636:{depth:-.10889,height:.39111,italic:0,skew:0},8637:{depth:-.10889,height:.39111,italic:0,skew:0},8640:{depth:-.10889,height:.39111,italic:0,skew:0},8641:{depth:-.10889,height:.39111,italic:0,skew:0},8656:{depth:-.10889,height:.39111,italic:0,skew:0},8657:{depth:.19444,height:.69444,italic:0,skew:0},8658:{depth:-.10889,height:.39111,italic:0,skew:0},8659:{depth:.19444,height:.69444,italic:0,skew:0},8660:{depth:-.10889,height:.39111,italic:0,skew:0},8661:{depth:.25,height:.75,italic:0,skew:0},8704:{depth:0,height:.69444,italic:0,skew:0},8706:{depth:0,height:.69444,italic:.06389,skew:0},8707:{depth:0,height:.69444,italic:0,skew:0},8709:{depth:.05556,height:.75,italic:0,skew:0},8711:{depth:0,height:.68611,italic:0,skew:0},8712:{depth:.08556,height:.58556,italic:0,skew:0},8715:{depth:.08556,height:.58556,italic:0,skew:0},8722:{depth:.13333,height:.63333,italic:0,skew:0},8723:{depth:.13333,height:.63333,italic:0,skew:0},8725:{depth:.25,height:.75,italic:0,skew:0},8726:{depth:.25,height:.75,italic:0,skew:0},8727:{depth:-.02778,height:.47222,italic:0,skew:0},8728:{depth:-.02639,height:.47361,italic:0,skew:0},8729:{depth:-.02639,height:.47361,italic:0,skew:0},8730:{depth:.18,height:.82,italic:0,skew:0},8733:{depth:0,height:.44444,italic:0,skew:0},8734:{depth:0,height:.44444,italic:0,skew:0},8736:{depth:0,height:.69224,italic:0,skew:0},8739:{depth:.25,height:.75,italic:0,skew:0},8741:{depth:.25,height:.75,italic:0,skew:0},8743:{depth:0,height:.55556,italic:0,skew:0},8744:{depth:0,height:.55556,italic:0,skew:0},8745:{depth:0,height:.55556,italic:0,skew:0},8746:{depth:0,height:.55556,italic:0,skew:0},8747:{depth:.19444,height:.69444,italic:.12778,skew:0},8764:{depth:-.10889,height:.39111,italic:0,skew:0},8768:{depth:.19444,height:.69444,italic:0,skew:0},8771:{depth:.00222,height:.50222,italic:0,skew:0},8776:{depth:.02444,height:.52444,italic:0,skew:0},8781:{depth:.00222,height:.50222,italic:0,skew:0},8801:{depth:.00222,height:.50222,italic:0,skew:0},8804:{depth:.19667,height:.69667,italic:0,skew:0},8805:{depth:.19667,height:.69667,italic:0,skew:0},8810:{depth:.08556,height:.58556,italic:0,skew:0},8811:{depth:.08556,height:.58556,italic:0,skew:0},8826:{depth:.08556,height:.58556,italic:0,skew:0},8827:{depth:.08556,height:.58556,italic:0,skew:0},8834:{depth:.08556,height:.58556,italic:0,skew:0},8835:{depth:.08556,height:.58556,italic:0,skew:0},8838:{depth:.19667,height:.69667,italic:0,skew:0},8839:{depth:.19667,height:.69667,italic:0,skew:0},8846:{depth:0,height:.55556,italic:0,skew:0},8849:{depth:.19667,height:.69667,italic:0,skew:0},8850:{depth:.19667,height:.69667,italic:0,skew:0},8851:{depth:0,height:.55556,italic:0,skew:0},8852:{depth:0,height:.55556,italic:0,skew:0},8853:{depth:.13333,height:.63333,italic:0,skew:0},8854:{depth:.13333,height:.63333,italic:0,skew:0},8855:{depth:.13333,height:.63333,italic:0,skew:0},8856:{depth:.13333,height:.63333,italic:0,skew:0},8857:{depth:.13333,height:.63333,italic:0,skew:0},8866:{depth:0,height:.69444,italic:0,skew:0},8867:{depth:0,height:.69444,italic:0,skew:0},8868:{depth:0,height:.69444,italic:0,skew:0},8869:{depth:0,height:.69444,italic:0,skew:0},8900:{depth:-.02639,height:.47361,italic:0,skew:0},8901:{depth:-.02639,height:.47361,italic:0,skew:0},8902:{depth:-.02778,height:.47222,italic:0,skew:0},8968:{depth:.25,height:.75,italic:0,skew:0},8969:{depth:.25,height:.75,italic:0,skew:0},8970:{depth:.25,height:.75,italic:0,skew:0},8971:{depth:.25,height:.75,italic:0,skew:0},8994:{depth:-.13889,height:.36111,italic:0,skew:0},8995:{depth:-.13889,height:.36111,italic:0,skew:0},9651:{depth:.19444,height:.69444,italic:0,skew:0},9657:{depth:-.02778,height:.47222,italic:0,skew:0},9661:{depth:.19444,height:.69444,italic:0,skew:0},9667:{depth:-.02778,height:.47222,italic:0,skew:0},9711:{depth:.19444,height:.69444,italic:0,skew:0},9824:{depth:.12963,height:.69444,italic:0,skew:0},9825:{depth:.12963,height:.69444,italic:0,skew:0},9826:{depth:.12963,height:.69444,italic:0,skew:0},9827:{depth:.12963,height:.69444,italic:0,skew:0},9837:{depth:0,height:.75,italic:0,skew:0},9838:{depth:.19444,height:.69444,italic:0,skew:0},9839:{depth:.19444,height:.69444,italic:0,skew:0},10216:{depth:.25,height:.75,italic:0,skew:0},10217:{depth:.25,height:.75,italic:0,skew:0},10815:{depth:0,height:.68611,italic:0,skew:0},10927:{depth:.19667,height:.69667,italic:0,skew:0},10928:{depth:.19667,height:.69667,italic:0,skew:0}},"Main-Italic":{33:{depth:0,height:.69444,italic:.12417,skew:0},34:{depth:0,height:.69444,italic:.06961,skew:0},35:{depth:.19444,height:.69444,italic:.06616,skew:0},37:{depth:.05556,height:.75,italic:.13639,skew:0},38:{depth:0,height:.69444,italic:.09694,skew:0},39:{depth:0,height:.69444,italic:.12417,skew:0},40:{depth:.25,height:.75,italic:.16194,skew:0},41:{depth:.25,height:.75,italic:.03694,skew:0},42:{depth:0,height:.75,italic:.14917,skew:0},43:{depth:.05667,height:.56167,italic:.03694,skew:0},44:{depth:.19444,height:.10556,italic:0,skew:0},45:{depth:0,height:.43056,italic:.02826,skew:0},46:{depth:0,height:.10556,italic:0,skew:0},47:{depth:.25,height:.75,italic:.16194,skew:0},48:{depth:0,height:.64444,italic:.13556,skew:0},49:{depth:0,height:.64444,italic:.13556,skew:0},50:{depth:0,height:.64444,italic:.13556,skew:0},51:{depth:0,height:.64444,italic:.13556,skew:0},52:{depth:.19444,height:.64444,italic:.13556,skew:0},53:{depth:0,height:.64444,italic:.13556,skew:0},54:{depth:0,height:.64444,italic:.13556,skew:0},55:{depth:.19444,height:.64444,italic:.13556,skew:0},56:{depth:0,height:.64444,italic:.13556,skew:0},57:{depth:0,height:.64444,italic:.13556,skew:0},58:{depth:0,height:.43056,italic:.0582,skew:0},59:{depth:.19444,height:.43056,italic:.0582,skew:0},61:{depth:-.13313,height:.36687,italic:.06616,skew:0},63:{depth:0,height:.69444,italic:.1225,skew:0},64:{depth:0,height:.69444,italic:.09597,skew:0},65:{depth:0,height:.68333,italic:0,skew:0},66:{depth:0,height:.68333,italic:.10257,skew:0},67:{depth:0,height:.68333,italic:.14528,skew:0},68:{depth:0,height:.68333,italic:.09403,skew:0},69:{depth:0,height:.68333,italic:.12028,skew:0},70:{depth:0,height:.68333,italic:.13305,skew:0},71:{depth:0,height:.68333,italic:.08722,skew:0},72:{depth:0,height:.68333,italic:.16389,skew:0},73:{depth:0,height:.68333,italic:.15806,skew:0},74:{depth:0,height:.68333,italic:.14028,skew:0},75:{depth:0,height:.68333,italic:.14528,skew:0},76:{depth:0,height:.68333,italic:0,skew:0},77:{depth:0,height:.68333,italic:.16389,skew:0},78:{depth:0,height:.68333,italic:.16389,skew:0},79:{depth:0,height:.68333,italic:.09403,skew:0},80:{depth:0,height:.68333,italic:.10257,skew:0},81:{depth:.19444,height:.68333,italic:.09403,skew:0},82:{depth:0,height:.68333,italic:.03868,skew:0},83:{depth:0,height:.68333,italic:.11972,skew:0},84:{depth:0,height:.68333,italic:.13305,skew:0},85:{depth:0,height:.68333,italic:.16389,skew:0},86:{depth:0,height:.68333,italic:.18361,skew:0},87:{depth:0,height:.68333,italic:.18361,skew:0},88:{depth:0,height:.68333,italic:.15806,skew:0},89:{depth:0,height:.68333,italic:.19383,skew:0},90:{depth:0,height:.68333,italic:.14528,skew:0},91:{depth:.25,height:.75,italic:.1875,skew:0},93:{depth:.25,height:.75,italic:.10528,skew:0},94:{depth:0,height:.69444,italic:.06646,skew:0},95:{depth:.31,height:.12056,italic:.09208,skew:0},97:{depth:0,height:.43056,italic:.07671,skew:0},98:{depth:0,height:.69444,italic:.06312,skew:0},99:{depth:0,height:.43056,italic:.05653,skew:0},100:{depth:0,height:.69444,italic:.10333,skew:0},101:{depth:0,height:.43056,italic:.07514,skew:0},102:{depth:.19444,height:.69444,italic:.21194,skew:0},103:{depth:.19444,height:.43056,italic:.08847,skew:0},104:{depth:0,height:.69444,italic:.07671,skew:0},105:{depth:0,height:.65536,italic:.1019,skew:0},106:{depth:.19444,height:.65536,italic:.14467,skew:0},107:{depth:0,height:.69444,italic:.10764,skew:0},108:{depth:0,height:.69444,italic:.10333,skew:0},109:{depth:0,height:.43056,italic:.07671,skew:0},110:{depth:0,height:.43056,italic:.07671,skew:0},111:{depth:0,height:.43056,italic:.06312,skew:0},112:{depth:.19444,height:.43056,italic:.06312,skew:0},113:{depth:.19444,height:.43056,italic:.08847,skew:0},114:{depth:0,height:.43056,italic:.10764,skew:0},115:{depth:0,height:.43056,italic:.08208,skew:0},116:{depth:0,height:.61508,italic:.09486,skew:0},117:{depth:0,height:.43056,italic:.07671,skew:0},118:{depth:0,height:.43056,italic:.10764,skew:0},119:{depth:0,height:.43056,italic:.10764,skew:0},120:{depth:0,height:.43056,italic:.12042,skew:0},121:{depth:.19444,height:.43056,italic:.08847,skew:0},122:{depth:0,height:.43056,italic:.12292,skew:0},126:{depth:.35,height:.31786,italic:.11585,skew:0},163:{depth:0,height:.69444,italic:0,skew:0},305:{depth:0,height:.43056,italic:0,skew:.02778},567:{depth:.19444,height:.43056,italic:0,skew:.08334},768:{depth:0,height:.69444,italic:0,skew:0},769:{depth:0,height:.69444,italic:.09694,skew:0},770:{depth:0,height:.69444,italic:.06646,skew:0},771:{depth:0,height:.66786,italic:.11585,skew:0},772:{depth:0,height:.56167,italic:.10333,skew:0},774:{depth:0,height:.69444,italic:.10806,skew:0},775:{depth:0,height:.66786,italic:.11752,skew:0},776:{depth:0,height:.66786,italic:.10474,skew:0},778:{depth:0,height:.69444,italic:0,skew:0},779:{depth:0,height:.69444,italic:.1225,skew:0},780:{depth:0,height:.62847,italic:.08295,skew:0},915:{depth:0,height:.68333,italic:.13305,skew:0},916:{depth:0,height:.68333,italic:0,skew:0},920:{depth:0,height:.68333,italic:.09403,skew:0},923:{depth:0,height:.68333,italic:0,skew:0},926:{depth:0,height:.68333,italic:.15294,skew:0},928:{depth:0,height:.68333,italic:.16389,skew:0},931:{depth:0,height:.68333,italic:.12028,skew:0},933:{depth:0,height:.68333,italic:.11111,skew:0},934:{depth:0,height:.68333,italic:.05986,skew:0},936:{depth:0,height:.68333,italic:.11111,skew:0},937:{depth:0,height:.68333,italic:.10257,skew:0},8211:{depth:0,height:.43056,italic:.09208,skew:0},8212:{depth:0,height:.43056,italic:.09208,skew:0},8216:{depth:0,height:.69444,italic:.12417,skew:0},8217:{depth:0,height:.69444,italic:.12417,skew:0},8220:{depth:0,height:.69444,italic:.1685,skew:0},8221:{depth:0,height:.69444,italic:.06961,skew:0},8463:{depth:0,height:.68889,italic:0,skew:0}},"Main-Regular":{32:{depth:0,height:0,italic:0,skew:0},33:{depth:0,height:.69444,italic:0,skew:0},34:{depth:0,height:.69444,italic:0,skew:0},35:{depth:.19444,height:.69444,italic:0,skew:0},36:{depth:.05556,height:.75,italic:0,skew:0},37:{depth:.05556,height:.75,italic:0,skew:0},38:{depth:0,height:.69444,italic:0,skew:0},39:{depth:0,height:.69444,italic:0,skew:0},40:{depth:.25,height:.75,italic:0,skew:0},41:{depth:.25,height:.75,italic:0,skew:0},42:{depth:0,height:.75,italic:0,skew:0},43:{depth:.08333,height:.58333,italic:0,skew:0},44:{depth:.19444,height:.10556,italic:0,skew:0},45:{depth:0,height:.43056,italic:0,skew:0},46:{depth:0,height:.10556,italic:0,skew:0},47:{depth:.25,height:.75,italic:0,skew:0},48:{depth:0,height:.64444,italic:0,skew:0},49:{depth:0,height:.64444,italic:0,skew:0},50:{depth:0,height:.64444,italic:0,skew:0},51:{depth:0,height:.64444,italic:0,skew:0},52:{depth:0,height:.64444,italic:0,skew:0},53:{depth:0,height:.64444,italic:0,skew:0},54:{depth:0,height:.64444,italic:0,skew:0},55:{depth:0,height:.64444,italic:0,skew:0},56:{depth:0,height:.64444,italic:0,skew:0},57:{depth:0,height:.64444,italic:0,skew:0},58:{depth:0,height:.43056,italic:0,skew:0},59:{depth:.19444,height:.43056,italic:0,skew:0},60:{depth:.0391,height:.5391,italic:0,skew:0},61:{depth:-.13313,height:.36687,italic:0,skew:0},62:{depth:.0391,height:.5391,italic:0,skew:0},63:{depth:0,height:.69444,italic:0,skew:0},64:{depth:0,height:.69444,italic:0,skew:0},65:{depth:0,height:.68333,italic:0,skew:0},66:{depth:0,height:.68333,italic:0,skew:0},67:{depth:0,height:.68333,italic:0,skew:0},68:{depth:0,height:.68333,italic:0,skew:0},69:{depth:0,height:.68333,italic:0,skew:0},70:{depth:0,height:.68333,italic:0,skew:0},71:{depth:0,height:.68333,italic:0,skew:0},72:{depth:0,height:.68333,italic:0,skew:0},73:{depth:0,height:.68333,italic:0,skew:0},74:{depth:0,height:.68333,italic:0,skew:0},75:{depth:0,height:.68333,italic:0,skew:0},76:{depth:0,height:.68333,italic:0,skew:0},77:{depth:0,height:.68333,italic:0,skew:0},78:{depth:0,height:.68333,italic:0,skew:0},79:{depth:0,height:.68333,italic:0,skew:0},80:{depth:0,height:.68333,italic:0,skew:0},81:{depth:.19444,height:.68333,italic:0,skew:0},82:{depth:0,height:.68333,italic:0,skew:0},83:{depth:0,height:.68333,italic:0,skew:0},84:{depth:0,height:.68333,italic:0,skew:0},85:{depth:0,height:.68333,italic:0,skew:0},86:{depth:0,height:.68333,italic:.01389,skew:0},87:{depth:0,height:.68333,italic:.01389,skew:0},88:{depth:0,height:.68333,italic:0,skew:0},89:{depth:0,height:.68333,italic:.025,skew:0},90:{depth:0,height:.68333,italic:0,skew:0},91:{depth:.25,height:.75,italic:0,skew:0},92:{depth:.25,height:.75,italic:0,skew:0},93:{depth:.25,height:.75,italic:0,skew:0},94:{depth:0,height:.69444,italic:0,skew:0},95:{depth:.31,height:.12056,italic:.02778,skew:0},96:{depth:0,height:.69444,italic:0,skew:0},97:{depth:0,height:.43056,italic:0,skew:0},98:{depth:0,height:.69444,italic:0,skew:0},99:{depth:0,height:.43056,italic:0,skew:0},100:{depth:0,height:.69444,italic:0,skew:0},101:{depth:0,height:.43056,italic:0,skew:0},102:{depth:0,height:.69444,italic:.07778,skew:0},103:{depth:.19444,height:.43056,italic:.01389,skew:0},104:{depth:0,height:.69444,italic:0,skew:0},105:{depth:0,height:.66786,italic:0,skew:0},106:{depth:.19444,height:.66786,italic:0,skew:0},107:{depth:0,height:.69444,italic:0,skew:0},108:{depth:0,height:.69444,italic:0,skew:0},109:{depth:0,height:.43056,italic:0,skew:0},110:{depth:0,height:.43056,italic:0,skew:0},111:{depth:0,height:.43056,italic:0,skew:0},112:{depth:.19444,height:.43056,italic:0,skew:0},113:{depth:.19444,height:.43056,italic:0,skew:0},114:{depth:0,height:.43056,italic:0,skew:0},115:{depth:0,height:.43056,italic:0,skew:0},116:{depth:0,height:.61508,italic:0,skew:0},117:{depth:0,height:.43056,italic:0,skew:0},118:{depth:0,height:.43056,italic:.01389,skew:0},119:{depth:0,height:.43056,italic:.01389,skew:0},120:{depth:0,height:.43056,italic:0,skew:0},121:{depth:.19444,height:.43056,italic:.01389,skew:0},122:{depth:0,height:.43056,italic:0,skew:0},123:{depth:.25,height:.75,italic:0,skew:0},124:{depth:.25,height:.75,italic:0,skew:0},125:{depth:.25,height:.75,italic:0,skew:0},126:{depth:.35,height:.31786,italic:0,skew:0},160:{depth:0,height:0,italic:0,skew:0},168:{depth:0,height:.66786,italic:0,skew:0},172:{depth:0,height:.43056,italic:0,skew:0},175:{depth:0,height:.56778,italic:0,skew:0},176:{depth:0,height:.69444,italic:0,skew:0},177:{depth:.08333,height:.58333,italic:0,skew:0},180:{depth:0,height:.69444,italic:0,skew:0},215:{depth:.08333,height:.58333,italic:0,skew:0},247:{depth:.08333,height:.58333,italic:0,skew:0},305:{depth:0,height:.43056,italic:0,skew:0},567:{depth:.19444,height:.43056,italic:0,skew:0},710:{depth:0,height:.69444,italic:0,skew:0},711:{depth:0,height:.62847,italic:0,skew:0},713:{depth:0,height:.56778,italic:0,skew:0},714:{depth:0,height:.69444,italic:0,skew:0},715:{depth:0,height:.69444,italic:0,skew:0},728:{depth:0,height:.69444,italic:0,skew:0},729:{depth:0,height:.66786,italic:0,skew:0},730:{depth:0,height:.69444,italic:0,skew:0},732:{depth:0,height:.66786,italic:0,skew:0},768:{depth:0,height:.69444,italic:0,skew:0},769:{depth:0,height:.69444,italic:0,skew:0},770:{depth:0,height:.69444,italic:0,skew:0},771:{depth:0,height:.66786,italic:0,skew:0},772:{depth:0,height:.56778,italic:0,skew:0},774:{depth:0,height:.69444,italic:0,skew:0},775:{depth:0,height:.66786,italic:0,skew:0},776:{depth:0,height:.66786,italic:0,skew:0},778:{depth:0,height:.69444,italic:0,skew:0},779:{depth:0,height:.69444,italic:0,skew:0},780:{depth:0,height:.62847,italic:0,skew:0},824:{depth:.19444,height:.69444,italic:0,skew:0},915:{depth:0,height:.68333,italic:0,skew:0},916:{depth:0,height:.68333,italic:0,skew:0},920:{depth:0,height:.68333,italic:0,skew:0},923:{depth:0,height:.68333,italic:0,skew:0},926:{depth:0,height:.68333,italic:0,skew:0},928:{depth:0,height:.68333,italic:0,skew:0},931:{depth:0,height:.68333,italic:0,skew:0},933:{depth:0,height:.68333,italic:0,skew:0},934:{depth:0,height:.68333,italic:0,skew:0},936:{depth:0,height:.68333,italic:0,skew:0},937:{depth:0,height:.68333,italic:0,skew:0},8211:{depth:0,height:.43056,italic:.02778,skew:0},8212:{depth:0,height:.43056,italic:.02778,skew:0},8216:{depth:0,height:.69444,italic:0,skew:0},8217:{depth:0,height:.69444,italic:0,skew:0},8220:{depth:0,height:.69444,italic:0,skew:0},8221:{depth:0,height:.69444,italic:0,skew:0},8224:{depth:.19444,height:.69444,italic:0,skew:0},8225:{depth:.19444,height:.69444,italic:0,skew:0},8230:{depth:0,height:.12,italic:0,skew:0},8242:{depth:0,height:.55556,italic:0,skew:0},8407:{depth:0,height:.71444,italic:.15382,skew:0},8463:{depth:0,height:.68889,italic:0,skew:0},8465:{depth:0,height:.69444,italic:0,skew:0},8467:{depth:0,height:.69444,italic:0,skew:.11111},8472:{depth:.19444,height:.43056,italic:0,skew:.11111},8476:{depth:0,height:.69444,italic:0,skew:0},8501:{depth:0,height:.69444,italic:0,skew:0},8592:{depth:-.13313,height:.36687,italic:0,skew:0},8593:{depth:.19444,height:.69444,italic:0,skew:0},8594:{depth:-.13313,height:.36687,italic:0,skew:0},8595:{depth:.19444,height:.69444,italic:0,skew:0},8596:{depth:-.13313,height:.36687,italic:0,skew:0},8597:{depth:.25,height:.75,italic:0,skew:0},8598:{depth:.19444,height:.69444,italic:0,skew:0},8599:{depth:.19444,height:.69444,italic:0,skew:0},8600:{depth:.19444,height:.69444,italic:0,skew:0},8601:{depth:.19444,height:.69444,italic:0,skew:0},8614:{depth:.011,height:.511,italic:0,skew:0},8617:{depth:.011,height:.511,italic:0,skew:0},8618:{depth:.011,height:.511,italic:0,skew:0},8636:{depth:-.13313,height:.36687,italic:0,skew:0},8637:{depth:-.13313,height:.36687,italic:0,skew:0},8640:{depth:-.13313,height:.36687,italic:0,skew:0},8641:{depth:-.13313,height:.36687,italic:0,skew:0},8652:{depth:.011,height:.671,italic:0,skew:0},8656:{depth:-.13313,height:.36687,italic:0,skew:0},8657:{depth:.19444,height:.69444,italic:0,skew:0},8658:{depth:-.13313,height:.36687,italic:0,skew:0},8659:{depth:.19444,height:.69444,italic:0,skew:0},8660:{depth:-.13313,height:.36687,italic:0,skew:0},8661:{depth:.25,height:.75,italic:0,skew:0},8704:{depth:0,height:.69444,italic:0,skew:0},8706:{depth:0,height:.69444,italic:.05556,skew:.08334},8707:{depth:0,height:.69444,italic:0,skew:0},8709:{depth:.05556,height:.75,italic:0,skew:0},8711:{depth:0,height:.68333,italic:0,skew:0},8712:{depth:.0391,height:.5391,italic:0,skew:0},8715:{depth:.0391,height:.5391,italic:0,skew:0},8722:{depth:.08333,height:.58333,italic:0,skew:0},8723:{depth:.08333,height:.58333,italic:0,skew:0},8725:{depth:.25,height:.75,italic:0,skew:0},8726:{depth:.25,height:.75,italic:0,skew:0},8727:{depth:-.03472,height:.46528,italic:0,skew:0},8728:{depth:-.05555,height:.44445,italic:0,skew:0},8729:{depth:-.05555,height:.44445,italic:0,skew:0},8730:{depth:.2,height:.8,italic:0,skew:0},8733:{depth:0,height:.43056,italic:0,skew:0},8734:{depth:0,height:.43056,italic:0,skew:0},8736:{depth:0,height:.69224,italic:0,skew:0},8739:{depth:.25,height:.75,italic:0,skew:0},8741:{depth:.25,height:.75,italic:0,skew:0},8743:{depth:0,height:.55556,italic:0,skew:0},8744:{depth:0,height:.55556,italic:0,skew:0},8745:{depth:0,height:.55556,italic:0,skew:0},8746:{depth:0,height:.55556,italic:0,skew:0},8747:{depth:.19444,height:.69444,italic:.11111,skew:0},8764:{depth:-.13313,height:.36687,italic:0,skew:0},8768:{depth:.19444,height:.69444,italic:0,skew:0},8771:{depth:-.03625,height:.46375,italic:0,skew:0},8773:{depth:-.022,height:.589,italic:0,skew:0},8776:{depth:-.01688,height:.48312,italic:0,skew:0},8781:{depth:-.03625,height:.46375,italic:0,skew:0},8784:{depth:-.133,height:.67,italic:0,skew:0},8800:{depth:.215,height:.716,italic:0,skew:0},8801:{depth:-.03625,height:.46375,italic:0,skew:0},8804:{depth:.13597,height:.63597,italic:0,skew:0},8805:{depth:.13597,height:.63597,italic:0,skew:0},8810:{depth:.0391,height:.5391,italic:0,skew:0},8811:{depth:.0391,height:.5391,italic:0,skew:0},8826:{depth:.0391,height:.5391,italic:0,skew:0},8827:{depth:.0391,height:.5391,italic:0,skew:0},8834:{depth:.0391,height:.5391,italic:0,skew:0},8835:{depth:.0391,height:.5391,italic:0,skew:0},8838:{depth:.13597,height:.63597,italic:0,skew:0},8839:{depth:.13597,height:.63597,italic:0,skew:0},8846:{depth:0,height:.55556,italic:0,skew:0},8849:{depth:.13597,height:.63597,italic:0,skew:0},8850:{depth:.13597,height:.63597,italic:0,skew:0},8851:{depth:0,height:.55556,italic:0,skew:0},8852:{depth:0,height:.55556,italic:0,skew:0},8853:{depth:.08333,height:.58333,italic:0,skew:0},8854:{depth:.08333,height:.58333,italic:0,skew:0},8855:{depth:.08333,height:.58333,italic:0,skew:0},8856:{depth:.08333,height:.58333,italic:0,skew:0},8857:{depth:.08333,height:.58333,italic:0,skew:0},8866:{depth:0,height:.69444,italic:0,skew:0},8867:{depth:0,height:.69444,italic:0,skew:0},8868:{depth:0,height:.69444,italic:0,skew:0},8869:{depth:0,height:.69444,italic:0,skew:0},8872:{depth:.249,height:.75,italic:0,skew:0},8900:{depth:-.05555,height:.44445,italic:0,skew:0},8901:{depth:-.05555,height:.44445,italic:0,skew:0},8902:{depth:-.03472,height:.46528,italic:0,skew:0},8904:{depth:.005,height:.505,italic:0,skew:0},8942:{depth:.03,height:.9,italic:0,skew:0},8943:{depth:-.19,height:.31,italic:0,skew:0},8945:{depth:-.1,height:.82,italic:0,skew:0},8968:{depth:.25,height:.75,italic:0,skew:0},8969:{depth:.25,height:.75,italic:0,skew:0},8970:{depth:.25,height:.75,italic:0,skew:0},8971:{depth:.25,height:.75,italic:0,skew:0},8994:{depth:-.14236,height:.35764,italic:0,skew:0},8995:{depth:-.14236,height:.35764,italic:0,skew:0},9136:{depth:.244,height:.744,italic:0,skew:0},9137:{depth:.244,height:.744,italic:0,skew:0},9651:{depth:.19444,height:.69444,italic:0,skew:0},9657:{depth:-.03472,height:.46528,italic:0,skew:0},9661:{depth:.19444,height:.69444,italic:0,skew:0},9667:{depth:-.03472,height:.46528,italic:0,skew:0},9711:{depth:.19444,height:.69444,italic:0,skew:0},9824:{depth:.12963,height:.69444,italic:0,skew:0},9825:{depth:.12963,height:.69444,italic:0,skew:0},9826:{depth:.12963,height:.69444,italic:0,skew:0},9827:{depth:.12963,height:.69444,italic:0,skew:0},9837:{depth:0,height:.75,italic:0,skew:0},9838:{depth:.19444,height:.69444,italic:0,skew:0},9839:{depth:.19444,height:.69444,italic:0,skew:0},10216:{depth:.25,height:.75,italic:0,skew:0},10217:{depth:.25,height:.75,italic:0,skew:0},10222:{depth:.244,height:.744,italic:0,skew:0},10223:{depth:.244,height:.744,italic:0,skew:0},10229:{depth:.011,height:.511,italic:0,skew:0},10230:{depth:.011,height:.511,italic:0,skew:0},10231:{depth:.011,height:.511,italic:0,skew:0},10232:{depth:.024,height:.525,italic:0,skew:0},10233:{depth:.024,height:.525,italic:0,skew:0},10234:{depth:.024,height:.525,italic:0,skew:0},10236:{depth:.011,height:.511,italic:0,skew:0},10815:{depth:0,height:.68333,italic:0,skew:0},10927:{depth:.13597,height:.63597,italic:0,skew:0},10928:{depth:.13597,height:.63597,italic:0,skew:0}},"Math-BoldItalic":{47:{depth:.19444,height:.69444,italic:0,skew:0},65:{depth:0,height:.68611,italic:0,skew:0},66:{depth:0,height:.68611,italic:.04835,skew:0},67:{depth:0,height:.68611,italic:.06979,skew:0},68:{depth:0,height:.68611,italic:.03194,skew:0},69:{depth:0,height:.68611,italic:.05451,skew:0},70:{depth:0,height:.68611,italic:.15972,skew:0},71:{depth:0,height:.68611,italic:0,skew:0},72:{depth:0,height:.68611,italic:.08229,skew:0},73:{depth:0,height:.68611,italic:.07778,skew:0},74:{depth:0,height:.68611,italic:.10069,skew:0},75:{depth:0,height:.68611,italic:.06979,skew:0},76:{depth:0,height:.68611,italic:0,skew:0},77:{depth:0,height:.68611,italic:.11424,skew:0},78:{depth:0,height:.68611,italic:.11424,skew:0},79:{depth:0,height:.68611,italic:.03194,skew:0},80:{depth:0,height:.68611,italic:.15972,skew:0},81:{depth:.19444,height:.68611,italic:0,skew:0},82:{depth:0,height:.68611,italic:.00421,skew:0},83:{depth:0,height:.68611,italic:.05382,skew:0},84:{depth:0,height:.68611,italic:.15972,skew:0},85:{depth:0,height:.68611,italic:.11424,skew:0},86:{depth:0,height:.68611,italic:.25555,skew:0},87:{depth:0,height:.68611,italic:.15972,skew:0},88:{depth:0,height:.68611,italic:.07778,skew:0},89:{depth:0,height:.68611,italic:.25555,skew:0},90:{depth:0,height:.68611,italic:.06979,skew:0},97:{depth:0,height:.44444,italic:0,skew:0},98:{depth:0,height:.69444,italic:0,skew:0},99:{depth:0,height:.44444,italic:0,skew:0},100:{depth:0,height:.69444,italic:0,skew:0},101:{depth:0,height:.44444,italic:0,skew:0},102:{depth:.19444,height:.69444,italic:.11042,skew:0},103:{depth:.19444,height:.44444,italic:.03704,skew:0},104:{depth:0,height:.69444,italic:0,skew:0},105:{depth:0,height:.69326,italic:0,skew:0},106:{depth:.19444,height:.69326,italic:.0622,skew:0},107:{depth:0,height:.69444,italic:.01852,skew:0},108:{depth:0,height:.69444,italic:.0088,skew:0},109:{depth:0,height:.44444,italic:0,skew:0},110:{depth:0,height:.44444,italic:0,skew:0},111:{depth:0,height:.44444,italic:0,skew:0},112:{depth:.19444,height:.44444,italic:0,skew:0},113:{depth:.19444,height:.44444,italic:.03704,skew:0},114:{depth:0,height:.44444,italic:.03194,skew:0},115:{depth:0,height:.44444,italic:0,skew:0},116:{depth:0,height:.63492,italic:0,skew:0},117:{depth:0,height:.44444,italic:0,skew:0},118:{depth:0,height:.44444,italic:.03704,skew:0},119:{depth:0,height:.44444,italic:.02778,skew:0},120:{depth:0,height:.44444,italic:0,skew:0},121:{depth:.19444,height:.44444,italic:.03704,skew:0},122:{depth:0,height:.44444,italic:.04213,skew:0},915:{depth:0,height:.68611,italic:.15972,skew:0},916:{depth:0,height:.68611,italic:0,skew:0},920:{depth:0,height:.68611,italic:.03194,skew:0},923:{depth:0,height:.68611,italic:0,skew:0},926:{depth:0,height:.68611,italic:.07458,skew:0},928:{depth:0,height:.68611,italic:.08229,skew:0},931:{depth:0,height:.68611,italic:.05451,skew:0},933:{depth:0,height:.68611,italic:.15972,skew:0},934:{depth:0,height:.68611,italic:0,skew:0},936:{depth:0,height:.68611,italic:.11653,skew:0},937:{depth:0,height:.68611,italic:.04835,skew:0},945:{depth:0,height:.44444,italic:0,skew:0},946:{depth:.19444,height:.69444,italic:.03403,skew:0},947:{depth:.19444,height:.44444,italic:.06389,skew:0},948:{depth:0,height:.69444,italic:.03819,skew:0},949:{depth:0,height:.44444,italic:0,skew:0},950:{depth:.19444,height:.69444,italic:.06215,skew:0},951:{depth:.19444,height:.44444,italic:.03704,skew:0},952:{depth:0,height:.69444,italic:.03194,skew:0},953:{depth:0,height:.44444,italic:0,skew:0},954:{depth:0,height:.44444,italic:0,skew:0},955:{depth:0,height:.69444,italic:0,skew:0},956:{depth:.19444,height:.44444,italic:0,skew:0},957:{depth:0,height:.44444,italic:.06898,skew:0},958:{depth:.19444,height:.69444,italic:.03021,skew:0},959:{depth:0,height:.44444,italic:0,skew:0},960:{depth:0,height:.44444,italic:.03704,skew:0},961:{depth:.19444,height:.44444,italic:0,skew:0},962:{depth:.09722,height:.44444,italic:.07917,skew:0},963:{depth:0,height:.44444,italic:.03704,skew:0},964:{depth:0,height:.44444,italic:.13472,skew:0},965:{depth:0,height:.44444,italic:.03704,skew:0},966:{depth:.19444,height:.44444,italic:0,skew:0},967:{depth:.19444,height:.44444,italic:0,skew:0},968:{depth:.19444,height:.69444,italic:.03704,skew:0},969:{depth:0,height:.44444,italic:.03704,skew:0},977:{depth:0,height:.69444,italic:0,skew:0},981:{depth:.19444,height:.69444,italic:0,skew:0},982:{depth:0,height:.44444,italic:.03194,skew:0},1009:{depth:.19444,height:.44444,italic:0,skew:0},1013:{depth:0,height:.44444,italic:0,skew:0}},"Math-Italic":{47:{depth:.19444,height:.69444,italic:0,skew:0},65:{depth:0,height:.68333,italic:0,skew:.13889
},66:{depth:0,height:.68333,italic:.05017,skew:.08334},67:{depth:0,height:.68333,italic:.07153,skew:.08334},68:{depth:0,height:.68333,italic:.02778,skew:.05556},69:{depth:0,height:.68333,italic:.05764,skew:.08334},70:{depth:0,height:.68333,italic:.13889,skew:.08334},71:{depth:0,height:.68333,italic:0,skew:.08334},72:{depth:0,height:.68333,italic:.08125,skew:.05556},73:{depth:0,height:.68333,italic:.07847,skew:.11111},74:{depth:0,height:.68333,italic:.09618,skew:.16667},75:{depth:0,height:.68333,italic:.07153,skew:.05556},76:{depth:0,height:.68333,italic:0,skew:.02778},77:{depth:0,height:.68333,italic:.10903,skew:.08334},78:{depth:0,height:.68333,italic:.10903,skew:.08334},79:{depth:0,height:.68333,italic:.02778,skew:.08334},80:{depth:0,height:.68333,italic:.13889,skew:.08334},81:{depth:.19444,height:.68333,italic:0,skew:.08334},82:{depth:0,height:.68333,italic:.00773,skew:.08334},83:{depth:0,height:.68333,italic:.05764,skew:.08334},84:{depth:0,height:.68333,italic:.13889,skew:.08334},85:{depth:0,height:.68333,italic:.10903,skew:.02778},86:{depth:0,height:.68333,italic:.22222,skew:0},87:{depth:0,height:.68333,italic:.13889,skew:0},88:{depth:0,height:.68333,italic:.07847,skew:.08334},89:{depth:0,height:.68333,italic:.22222,skew:0},90:{depth:0,height:.68333,italic:.07153,skew:.08334},97:{depth:0,height:.43056,italic:0,skew:0},98:{depth:0,height:.69444,italic:0,skew:0},99:{depth:0,height:.43056,italic:0,skew:.05556},100:{depth:0,height:.69444,italic:0,skew:.16667},101:{depth:0,height:.43056,italic:0,skew:.05556},102:{depth:.19444,height:.69444,italic:.10764,skew:.16667},103:{depth:.19444,height:.43056,italic:.03588,skew:.02778},104:{depth:0,height:.69444,italic:0,skew:0},105:{depth:0,height:.65952,italic:0,skew:0},106:{depth:.19444,height:.65952,italic:.05724,skew:0},107:{depth:0,height:.69444,italic:.03148,skew:0},108:{depth:0,height:.69444,italic:.01968,skew:.08334},109:{depth:0,height:.43056,italic:0,skew:0},110:{depth:0,height:.43056,italic:0,skew:0},111:{depth:0,height:.43056,italic:0,skew:.05556},112:{depth:.19444,height:.43056,italic:0,skew:.08334},113:{depth:.19444,height:.43056,italic:.03588,skew:.08334},114:{depth:0,height:.43056,italic:.02778,skew:.05556},115:{depth:0,height:.43056,italic:0,skew:.05556},116:{depth:0,height:.61508,italic:0,skew:.08334},117:{depth:0,height:.43056,italic:0,skew:.02778},118:{depth:0,height:.43056,italic:.03588,skew:.02778},119:{depth:0,height:.43056,italic:.02691,skew:.08334},120:{depth:0,height:.43056,italic:0,skew:.02778},121:{depth:.19444,height:.43056,italic:.03588,skew:.05556},122:{depth:0,height:.43056,italic:.04398,skew:.05556},915:{depth:0,height:.68333,italic:.13889,skew:.08334},916:{depth:0,height:.68333,italic:0,skew:.16667},920:{depth:0,height:.68333,italic:.02778,skew:.08334},923:{depth:0,height:.68333,italic:0,skew:.16667},926:{depth:0,height:.68333,italic:.07569,skew:.08334},928:{depth:0,height:.68333,italic:.08125,skew:.05556},931:{depth:0,height:.68333,italic:.05764,skew:.08334},933:{depth:0,height:.68333,italic:.13889,skew:.05556},934:{depth:0,height:.68333,italic:0,skew:.08334},936:{depth:0,height:.68333,italic:.11,skew:.05556},937:{depth:0,height:.68333,italic:.05017,skew:.08334},945:{depth:0,height:.43056,italic:.0037,skew:.02778},946:{depth:.19444,height:.69444,italic:.05278,skew:.08334},947:{depth:.19444,height:.43056,italic:.05556,skew:0},948:{depth:0,height:.69444,italic:.03785,skew:.05556},949:{depth:0,height:.43056,italic:0,skew:.08334},950:{depth:.19444,height:.69444,italic:.07378,skew:.08334},951:{depth:.19444,height:.43056,italic:.03588,skew:.05556},952:{depth:0,height:.69444,italic:.02778,skew:.08334},953:{depth:0,height:.43056,italic:0,skew:.05556},954:{depth:0,height:.43056,italic:0,skew:0},955:{depth:0,height:.69444,italic:0,skew:0},956:{depth:.19444,height:.43056,italic:0,skew:.02778},957:{depth:0,height:.43056,italic:.06366,skew:.02778},958:{depth:.19444,height:.69444,italic:.04601,skew:.11111},959:{depth:0,height:.43056,italic:0,skew:.05556},960:{depth:0,height:.43056,italic:.03588,skew:0},961:{depth:.19444,height:.43056,italic:0,skew:.08334},962:{depth:.09722,height:.43056,italic:.07986,skew:.08334},963:{depth:0,height:.43056,italic:.03588,skew:0},964:{depth:0,height:.43056,italic:.1132,skew:.02778},965:{depth:0,height:.43056,italic:.03588,skew:.02778},966:{depth:.19444,height:.43056,italic:0,skew:.08334},967:{depth:.19444,height:.43056,italic:0,skew:.05556},968:{depth:.19444,height:.69444,italic:.03588,skew:.11111},969:{depth:0,height:.43056,italic:.03588,skew:0},977:{depth:0,height:.69444,italic:0,skew:.08334},981:{depth:.19444,height:.69444,italic:0,skew:.08334},982:{depth:0,height:.43056,italic:.02778,skew:0},1009:{depth:.19444,height:.43056,italic:0,skew:.08334},1013:{depth:0,height:.43056,italic:0,skew:.05556}},"Math-Regular":{65:{depth:0,height:.68333,italic:0,skew:.13889},66:{depth:0,height:.68333,italic:.05017,skew:.08334},67:{depth:0,height:.68333,italic:.07153,skew:.08334},68:{depth:0,height:.68333,italic:.02778,skew:.05556},69:{depth:0,height:.68333,italic:.05764,skew:.08334},70:{depth:0,height:.68333,italic:.13889,skew:.08334},71:{depth:0,height:.68333,italic:0,skew:.08334},72:{depth:0,height:.68333,italic:.08125,skew:.05556},73:{depth:0,height:.68333,italic:.07847,skew:.11111},74:{depth:0,height:.68333,italic:.09618,skew:.16667},75:{depth:0,height:.68333,italic:.07153,skew:.05556},76:{depth:0,height:.68333,italic:0,skew:.02778},77:{depth:0,height:.68333,italic:.10903,skew:.08334},78:{depth:0,height:.68333,italic:.10903,skew:.08334},79:{depth:0,height:.68333,italic:.02778,skew:.08334},80:{depth:0,height:.68333,italic:.13889,skew:.08334},81:{depth:.19444,height:.68333,italic:0,skew:.08334},82:{depth:0,height:.68333,italic:.00773,skew:.08334},83:{depth:0,height:.68333,italic:.05764,skew:.08334},84:{depth:0,height:.68333,italic:.13889,skew:.08334},85:{depth:0,height:.68333,italic:.10903,skew:.02778},86:{depth:0,height:.68333,italic:.22222,skew:0},87:{depth:0,height:.68333,italic:.13889,skew:0},88:{depth:0,height:.68333,italic:.07847,skew:.08334},89:{depth:0,height:.68333,italic:.22222,skew:0},90:{depth:0,height:.68333,italic:.07153,skew:.08334},97:{depth:0,height:.43056,italic:0,skew:0},98:{depth:0,height:.69444,italic:0,skew:0},99:{depth:0,height:.43056,italic:0,skew:.05556},100:{depth:0,height:.69444,italic:0,skew:.16667},101:{depth:0,height:.43056,italic:0,skew:.05556},102:{depth:.19444,height:.69444,italic:.10764,skew:.16667},103:{depth:.19444,height:.43056,italic:.03588,skew:.02778},104:{depth:0,height:.69444,italic:0,skew:0},105:{depth:0,height:.65952,italic:0,skew:0},106:{depth:.19444,height:.65952,italic:.05724,skew:0},107:{depth:0,height:.69444,italic:.03148,skew:0},108:{depth:0,height:.69444,italic:.01968,skew:.08334},109:{depth:0,height:.43056,italic:0,skew:0},110:{depth:0,height:.43056,italic:0,skew:0},111:{depth:0,height:.43056,italic:0,skew:.05556},112:{depth:.19444,height:.43056,italic:0,skew:.08334},113:{depth:.19444,height:.43056,italic:.03588,skew:.08334},114:{depth:0,height:.43056,italic:.02778,skew:.05556},115:{depth:0,height:.43056,italic:0,skew:.05556},116:{depth:0,height:.61508,italic:0,skew:.08334},117:{depth:0,height:.43056,italic:0,skew:.02778},118:{depth:0,height:.43056,italic:.03588,skew:.02778},119:{depth:0,height:.43056,italic:.02691,skew:.08334},120:{depth:0,height:.43056,italic:0,skew:.02778},121:{depth:.19444,height:.43056,italic:.03588,skew:.05556},122:{depth:0,height:.43056,italic:.04398,skew:.05556},915:{depth:0,height:.68333,italic:.13889,skew:.08334},916:{depth:0,height:.68333,italic:0,skew:.16667},920:{depth:0,height:.68333,italic:.02778,skew:.08334},923:{depth:0,height:.68333,italic:0,skew:.16667},926:{depth:0,height:.68333,italic:.07569,skew:.08334},928:{depth:0,height:.68333,italic:.08125,skew:.05556},931:{depth:0,height:.68333,italic:.05764,skew:.08334},933:{depth:0,height:.68333,italic:.13889,skew:.05556},934:{depth:0,height:.68333,italic:0,skew:.08334},936:{depth:0,height:.68333,italic:.11,skew:.05556},937:{depth:0,height:.68333,italic:.05017,skew:.08334},945:{depth:0,height:.43056,italic:.0037,skew:.02778},946:{depth:.19444,height:.69444,italic:.05278,skew:.08334},947:{depth:.19444,height:.43056,italic:.05556,skew:0},948:{depth:0,height:.69444,italic:.03785,skew:.05556},949:{depth:0,height:.43056,italic:0,skew:.08334},950:{depth:.19444,height:.69444,italic:.07378,skew:.08334},951:{depth:.19444,height:.43056,italic:.03588,skew:.05556},952:{depth:0,height:.69444,italic:.02778,skew:.08334},953:{depth:0,height:.43056,italic:0,skew:.05556},954:{depth:0,height:.43056,italic:0,skew:0},955:{depth:0,height:.69444,italic:0,skew:0},956:{depth:.19444,height:.43056,italic:0,skew:.02778},957:{depth:0,height:.43056,italic:.06366,skew:.02778},958:{depth:.19444,height:.69444,italic:.04601,skew:.11111},959:{depth:0,height:.43056,italic:0,skew:.05556},960:{depth:0,height:.43056,italic:.03588,skew:0},961:{depth:.19444,height:.43056,italic:0,skew:.08334},962:{depth:.09722,height:.43056,italic:.07986,skew:.08334},963:{depth:0,height:.43056,italic:.03588,skew:0},964:{depth:0,height:.43056,italic:.1132,skew:.02778},965:{depth:0,height:.43056,italic:.03588,skew:.02778},966:{depth:.19444,height:.43056,italic:0,skew:.08334},967:{depth:.19444,height:.43056,italic:0,skew:.05556},968:{depth:.19444,height:.69444,italic:.03588,skew:.11111},969:{depth:0,height:.43056,italic:.03588,skew:0},977:{depth:0,height:.69444,italic:0,skew:.08334},981:{depth:.19444,height:.69444,italic:0,skew:.08334},982:{depth:0,height:.43056,italic:.02778,skew:0},1009:{depth:.19444,height:.43056,italic:0,skew:.08334},1013:{depth:0,height:.43056,italic:0,skew:.05556}},"Size1-Regular":{40:{depth:.35001,height:.85,italic:0,skew:0},41:{depth:.35001,height:.85,italic:0,skew:0},47:{depth:.35001,height:.85,italic:0,skew:0},91:{depth:.35001,height:.85,italic:0,skew:0},92:{depth:.35001,height:.85,italic:0,skew:0},93:{depth:.35001,height:.85,italic:0,skew:0},123:{depth:.35001,height:.85,italic:0,skew:0},125:{depth:.35001,height:.85,italic:0,skew:0},710:{depth:0,height:.72222,italic:0,skew:0},732:{depth:0,height:.72222,italic:0,skew:0},770:{depth:0,height:.72222,italic:0,skew:0},771:{depth:0,height:.72222,italic:0,skew:0},8214:{depth:-99e-5,height:.601,italic:0,skew:0},8593:{depth:1e-5,height:.6,italic:0,skew:0},8595:{depth:1e-5,height:.6,italic:0,skew:0},8657:{depth:1e-5,height:.6,italic:0,skew:0},8659:{depth:1e-5,height:.6,italic:0,skew:0},8719:{depth:.25001,height:.75,italic:0,skew:0},8720:{depth:.25001,height:.75,italic:0,skew:0},8721:{depth:.25001,height:.75,italic:0,skew:0},8730:{depth:.35001,height:.85,italic:0,skew:0},8739:{depth:-.00599,height:.606,italic:0,skew:0},8741:{depth:-.00599,height:.606,italic:0,skew:0},8747:{depth:.30612,height:.805,italic:.19445,skew:0},8748:{depth:.306,height:.805,italic:.19445,skew:0},8749:{depth:.306,height:.805,italic:.19445,skew:0},8750:{depth:.30612,height:.805,italic:.19445,skew:0},8896:{depth:.25001,height:.75,italic:0,skew:0},8897:{depth:.25001,height:.75,italic:0,skew:0},8898:{depth:.25001,height:.75,italic:0,skew:0},8899:{depth:.25001,height:.75,italic:0,skew:0},8968:{depth:.35001,height:.85,italic:0,skew:0},8969:{depth:.35001,height:.85,italic:0,skew:0},8970:{depth:.35001,height:.85,italic:0,skew:0},8971:{depth:.35001,height:.85,italic:0,skew:0},9168:{depth:-99e-5,height:.601,italic:0,skew:0},10216:{depth:.35001,height:.85,italic:0,skew:0},10217:{depth:.35001,height:.85,italic:0,skew:0},10752:{depth:.25001,height:.75,italic:0,skew:0},10753:{depth:.25001,height:.75,italic:0,skew:0},10754:{depth:.25001,height:.75,italic:0,skew:0},10756:{depth:.25001,height:.75,italic:0,skew:0},10758:{depth:.25001,height:.75,italic:0,skew:0}},"Size2-Regular":{40:{depth:.65002,height:1.15,italic:0,skew:0},41:{depth:.65002,height:1.15,italic:0,skew:0},47:{depth:.65002,height:1.15,italic:0,skew:0},91:{depth:.65002,height:1.15,italic:0,skew:0},92:{depth:.65002,height:1.15,italic:0,skew:0},93:{depth:.65002,height:1.15,italic:0,skew:0},123:{depth:.65002,height:1.15,italic:0,skew:0},125:{depth:.65002,height:1.15,italic:0,skew:0},710:{depth:0,height:.75,italic:0,skew:0},732:{depth:0,height:.75,italic:0,skew:0},770:{depth:0,height:.75,italic:0,skew:0},771:{depth:0,height:.75,italic:0,skew:0},8719:{depth:.55001,height:1.05,italic:0,skew:0},8720:{depth:.55001,height:1.05,italic:0,skew:0},8721:{depth:.55001,height:1.05,italic:0,skew:0},8730:{depth:.65002,height:1.15,italic:0,skew:0},8747:{depth:.86225,height:1.36,italic:.44445,skew:0},8748:{depth:.862,height:1.36,italic:.44445,skew:0},8749:{depth:.862,height:1.36,italic:.44445,skew:0},8750:{depth:.86225,height:1.36,italic:.44445,skew:0},8896:{depth:.55001,height:1.05,italic:0,skew:0},8897:{depth:.55001,height:1.05,italic:0,skew:0},8898:{depth:.55001,height:1.05,italic:0,skew:0},8899:{depth:.55001,height:1.05,italic:0,skew:0},8968:{depth:.65002,height:1.15,italic:0,skew:0},8969:{depth:.65002,height:1.15,italic:0,skew:0},8970:{depth:.65002,height:1.15,italic:0,skew:0},8971:{depth:.65002,height:1.15,italic:0,skew:0},10216:{depth:.65002,height:1.15,italic:0,skew:0},10217:{depth:.65002,height:1.15,italic:0,skew:0},10752:{depth:.55001,height:1.05,italic:0,skew:0},10753:{depth:.55001,height:1.05,italic:0,skew:0},10754:{depth:.55001,height:1.05,italic:0,skew:0},10756:{depth:.55001,height:1.05,italic:0,skew:0},10758:{depth:.55001,height:1.05,italic:0,skew:0}},"Size3-Regular":{40:{depth:.95003,height:1.45,italic:0,skew:0},41:{depth:.95003,height:1.45,italic:0,skew:0},47:{depth:.95003,height:1.45,italic:0,skew:0},91:{depth:.95003,height:1.45,italic:0,skew:0},92:{depth:.95003,height:1.45,italic:0,skew:0},93:{depth:.95003,height:1.45,italic:0,skew:0},123:{depth:.95003,height:1.45,italic:0,skew:0},125:{depth:.95003,height:1.45,italic:0,skew:0},710:{depth:0,height:.75,italic:0,skew:0},732:{depth:0,height:.75,italic:0,skew:0},770:{depth:0,height:.75,italic:0,skew:0},771:{depth:0,height:.75,italic:0,skew:0},8730:{depth:.95003,height:1.45,italic:0,skew:0},8968:{depth:.95003,height:1.45,italic:0,skew:0},8969:{depth:.95003,height:1.45,italic:0,skew:0},8970:{depth:.95003,height:1.45,italic:0,skew:0},8971:{depth:.95003,height:1.45,italic:0,skew:0},10216:{depth:.95003,height:1.45,italic:0,skew:0},10217:{depth:.95003,height:1.45,italic:0,skew:0}},"Size4-Regular":{40:{depth:1.25003,height:1.75,italic:0,skew:0},41:{depth:1.25003,height:1.75,italic:0,skew:0},47:{depth:1.25003,height:1.75,italic:0,skew:0},91:{depth:1.25003,height:1.75,italic:0,skew:0},92:{depth:1.25003,height:1.75,italic:0,skew:0},93:{depth:1.25003,height:1.75,italic:0,skew:0},123:{depth:1.25003,height:1.75,italic:0,skew:0},125:{depth:1.25003,height:1.75,italic:0,skew:0},710:{depth:0,height:.825,italic:0,skew:0},732:{depth:0,height:.825,italic:0,skew:0},770:{depth:0,height:.825,italic:0,skew:0},771:{depth:0,height:.825,italic:0,skew:0},8730:{depth:1.25003,height:1.75,italic:0,skew:0},8968:{depth:1.25003,height:1.75,italic:0,skew:0},8969:{depth:1.25003,height:1.75,italic:0,skew:0},8970:{depth:1.25003,height:1.75,italic:0,skew:0},8971:{depth:1.25003,height:1.75,italic:0,skew:0},9115:{depth:.64502,height:1.155,italic:0,skew:0},9116:{depth:1e-5,height:.6,italic:0,skew:0},9117:{depth:.64502,height:1.155,italic:0,skew:0},9118:{depth:.64502,height:1.155,italic:0,skew:0},9119:{depth:1e-5,height:.6,italic:0,skew:0},9120:{depth:.64502,height:1.155,italic:0,skew:0},9121:{depth:.64502,height:1.155,italic:0,skew:0},9122:{depth:-99e-5,height:.601,italic:0,skew:0},9123:{depth:.64502,height:1.155,italic:0,skew:0},9124:{depth:.64502,height:1.155,italic:0,skew:0},9125:{depth:-99e-5,height:.601,italic:0,skew:0},9126:{depth:.64502,height:1.155,italic:0,skew:0},9127:{depth:1e-5,height:.9,italic:0,skew:0},9128:{depth:.65002,height:1.15,italic:0,skew:0},9129:{depth:.90001,height:0,italic:0,skew:0},9130:{depth:0,height:.3,italic:0,skew:0},9131:{depth:1e-5,height:.9,italic:0,skew:0},9132:{depth:.65002,height:1.15,italic:0,skew:0},9133:{depth:.90001,height:0,italic:0,skew:0},9143:{depth:.88502,height:.915,italic:0,skew:0},10216:{depth:1.25003,height:1.75,italic:0,skew:0},10217:{depth:1.25003,height:1.75,italic:0,skew:0},57344:{depth:-.00499,height:.605,italic:0,skew:0},57345:{depth:-.00499,height:.605,italic:0,skew:0},57680:{depth:0,height:.12,italic:0,skew:0},57681:{depth:0,height:.12,italic:0,skew:0},57682:{depth:0,height:.12,italic:0,skew:0},57683:{depth:0,height:.12,italic:0,skew:0}}}},{}],18:[function(e,t,i){var h=e("./utils");var a=e("./ParseError");var r={"\\sqrt":{numArgs:1,numOptionalArgs:1,handler:function(e,t,i,h){return{type:"sqrt",body:i,index:t}}},"\\text":{numArgs:1,argTypes:["text"],greediness:2,handler:function(e,t){var i;if(t.type==="ordgroup"){i=t.value}else{i=[t]}return{type:"text",body:i}}},"\\color":{numArgs:2,allowedInText:true,greediness:3,argTypes:["color","original"],handler:function(e,t,i){var h;if(i.type==="ordgroup"){h=i.value}else{h=[i]}return{type:"color",color:t.value,value:h}}},"\\overline":{numArgs:1,handler:function(e,t){return{type:"overline",body:t}}},"\\rule":{numArgs:2,numOptionalArgs:1,argTypes:["size","size","size"],handler:function(e,t,i,h){return{type:"rule",shift:t&&t.value,width:i.value,height:h.value}}},"\\KaTeX":{numArgs:0,handler:function(e){return{type:"katex"}}},"\\phantom":{numArgs:1,handler:function(e,t){var i;if(t.type==="ordgroup"){i=t.value}else{i=[t]}return{type:"phantom",value:i}}}};var l={"\\bigl":{type:"open",size:1},"\\Bigl":{type:"open",size:2},"\\biggl":{type:"open",size:3},"\\Biggl":{type:"open",size:4},"\\bigr":{type:"close",size:1},"\\Bigr":{type:"close",size:2},"\\biggr":{type:"close",size:3},"\\Biggr":{type:"close",size:4},"\\bigm":{type:"rel",size:1},"\\Bigm":{type:"rel",size:2},"\\biggm":{type:"rel",size:3},"\\Biggm":{type:"rel",size:4},"\\big":{type:"textord",size:1},"\\Big":{type:"textord",size:2},"\\bigg":{type:"textord",size:3},"\\Bigg":{type:"textord",size:4}};var s=["(",")","[","\\lbrack","]","\\rbrack","\\{","\\lbrace","\\}","\\rbrace","\\lfloor","\\rfloor","\\lceil","\\rceil","<",">","\\langle","\\rangle","/","\\backslash","|","\\vert","\\|","\\Vert","\\uparrow","\\Uparrow","\\downarrow","\\Downarrow","\\updownarrow","\\Updownarrow","."];var p=[{funcs:["\\blue","\\orange","\\pink","\\red","\\green","\\gray","\\purple","\\blueA","\\blueB","\\blueC","\\blueD","\\blueE","\\tealA","\\tealB","\\tealC","\\tealD","\\tealE","\\greenA","\\greenB","\\greenC","\\greenD","\\greenE","\\goldA","\\goldB","\\goldC","\\goldD","\\goldE","\\redA","\\redB","\\redC","\\redD","\\redE","\\maroonA","\\maroonB","\\maroonC","\\maroonD","\\maroonE","\\purpleA","\\purpleB","\\purpleC","\\purpleD","\\purpleE","\\mintA","\\mintB","\\mintC","\\grayA","\\grayB","\\grayC","\\grayD","\\grayE","\\grayF","\\grayG","\\grayH","\\grayI","\\kaBlue","\\kaGreen"],data:{numArgs:1,allowedInText:true,greediness:3,handler:function(e,t){var i;if(t.type==="ordgroup"){i=t.value}else{i=[t]}return{type:"color",color:"katex-"+e.slice(1),value:i}}}},{funcs:["\\arcsin","\\arccos","\\arctan","\\arg","\\cos","\\cosh","\\cot","\\coth","\\csc","\\deg","\\dim","\\exp","\\hom","\\ker","\\lg","\\ln","\\log","\\sec","\\sin","\\sinh","\\tan","\\tanh"],data:{numArgs:0,handler:function(e){return{type:"op",limits:false,symbol:false,body:e}}}},{funcs:["\\det","\\gcd","\\inf","\\lim","\\liminf","\\limsup","\\max","\\min","\\Pr","\\sup"],data:{numArgs:0,handler:function(e){return{type:"op",limits:true,symbol:false,body:e}}}},{funcs:["\\int","\\iint","\\iiint","\\oint"],data:{numArgs:0,handler:function(e){return{type:"op",limits:false,symbol:true,body:e}}}},{funcs:["\\coprod","\\bigvee","\\bigwedge","\\biguplus","\\bigcap","\\bigcup","\\intop","\\prod","\\sum","\\bigotimes","\\bigoplus","\\bigodot","\\bigsqcup","\\smallint"],data:{numArgs:0,handler:function(e){return{type:"op",limits:true,symbol:true,body:e}}}},{funcs:["\\dfrac","\\frac","\\tfrac","\\dbinom","\\binom","\\tbinom"],data:{numArgs:2,greediness:2,handler:function(e,t,i){var h;var a=null;var r=null;var l="auto";switch(e){case"\\dfrac":case"\\frac":case"\\tfrac":h=true;break;case"\\dbinom":case"\\binom":case"\\tbinom":h=false;a="(";r=")";break;default:throw new Error("Unrecognized genfrac command")}switch(e){case"\\dfrac":case"\\dbinom":l="display";break;case"\\tfrac":case"\\tbinom":l="text";break}return{type:"genfrac",numer:t,denom:i,hasBarLine:h,leftDelim:a,rightDelim:r,size:l}}}},{funcs:["\\llap","\\rlap"],data:{numArgs:1,allowedInText:true,handler:function(e,t){return{type:e.slice(1),body:t}}}},{funcs:["\\bigl","\\Bigl","\\biggl","\\Biggl","\\bigr","\\Bigr","\\biggr","\\Biggr","\\bigm","\\Bigm","\\biggm","\\Biggm","\\big","\\Big","\\bigg","\\Bigg","\\left","\\right"],data:{numArgs:1,handler:function(e,t,i){if(!h.contains(s,t.value)){throw new a("Invalid delimiter: '"+t.value+"' after '"+e+"'",this.lexer,i[1])}if(e==="\\left"||e==="\\right"){return{type:"leftright",value:t.value}}else{return{type:"delimsizing",size:l[e].size,delimType:l[e].type,value:t.value}}}}},{funcs:["\\tiny","\\scriptsize","\\footnotesize","\\small","\\normalsize","\\large","\\Large","\\LARGE","\\huge","\\Huge"],data:{numArgs:0}},{funcs:["\\displaystyle","\\textstyle","\\scriptstyle","\\scriptscriptstyle"],data:{numArgs:0}},{funcs:["\\acute","\\grave","\\ddot","\\tilde","\\bar","\\breve","\\check","\\hat","\\vec","\\dot"],data:{numArgs:1,handler:function(e,t){return{type:"accent",accent:e,base:t}}}},{funcs:["\\over","\\choose"],data:{numArgs:0,handler:function(e){var t;switch(e){case"\\over":t="\\frac";break;case"\\choose":t="\\binom";break;default:throw new Error("Unrecognized infix genfrac command")}return{type:"infix",replaceWith:t}}}},{funcs:["\\\\","\\cr"],data:{numArgs:0,numOptionalArgs:1,argTypes:["size"],handler:function(e,t){return{type:"cr",size:t}}}},{funcs:["\\begin","\\end"],data:{numArgs:1,argTypes:["text"],handler:function(e,t,i){if(t.type!=="ordgroup"){throw new a("Invalid environment name",this.lexer,i[1])}var h="";for(var r=0;r<t.value.length;++r){h+=t.value[r].value}return{type:"environment",name:h,namepos:i[1]}}}}];var n=function(e,t){for(var i=0;i<e.length;i++){r[e[i]]=t}};for(var o=0;o<p.length;o++){n(p[o].funcs,p[o].data)}for(var c in r){if(r.hasOwnProperty(c)){var g=r[c];r[c]={numArgs:g.numArgs,argTypes:g.argTypes,greediness:g.greediness===undefined?1:g.greediness,allowedInText:g.allowedInText?g.allowedInText:false,numOptionalArgs:g.numOptionalArgs===undefined?0:g.numOptionalArgs,handler:g.handler}}}t.exports={funcs:r}},{"./ParseError":5,"./utils":23}],19:[function(e,t,i){var h=e("./utils");function a(e,t){this.type=e;this.attributes={};this.children=t||[]}a.prototype.setAttribute=function(e,t){this.attributes[e]=t};a.prototype.toNode=function(){var e=document.createElementNS("http://www.w3.org/1998/Math/MathML",this.type);for(var t in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,t)){e.setAttribute(t,this.attributes[t])}}for(var i=0;i<this.children.length;i++){e.appendChild(this.children[i].toNode())}return e};a.prototype.toMarkup=function(){var e="<"+this.type;for(var t in this.attributes){if(Object.prototype.hasOwnProperty.call(this.attributes,t)){e+=" "+t+'="';e+=h.escape(this.attributes[t]);e+='"'}}e+=">";for(var i=0;i<this.children.length;i++){e+=this.children[i].toMarkup()}e+="</"+this.type+">";return e};function r(e){this.text=e}r.prototype.toNode=function(){return document.createTextNode(this.text)};r.prototype.toMarkup=function(){return h.escape(this.text)};t.exports={MathNode:a,TextNode:r}},{"./utils":23}],20:[function(e,t,i){function h(e,t,i){this.type=e;this.value=t;this.mode=i}function a(e,t,i){this.result=e;this.position=t}t.exports={ParseNode:h,ParseResult:a}},{}],21:[function(e,t,i){var h=e("./Parser");var a=function(e,t){var i=new h(e,t);return i.parse()};t.exports=a},{"./Parser":6}],22:[function(e,t,i){var h={math:{"\\equiv":{font:"main",group:"rel",replace:"\u2261"},"\\prec":{font:"main",group:"rel",replace:"\u227a"},"\\succ":{font:"main",group:"rel",replace:"\u227b"},"\\sim":{font:"main",group:"rel",replace:"\u223c"},"\\perp":{font:"main",group:"rel",replace:"\u22a5"},"\\preceq":{font:"main",group:"rel",replace:"\u2aaf"},"\\succeq":{font:"main",group:"rel",replace:"\u2ab0"},"\\simeq":{font:"main",group:"rel",replace:"\u2243"},"\\mid":{font:"main",group:"rel",replace:"\u2223"},"\\ll":{font:"main",group:"rel",replace:"\u226a"},"\\gg":{font:"main",group:"rel",replace:"\u226b"},"\\asymp":{font:"main",group:"rel",replace:"\u224d"},"\\parallel":{font:"main",group:"rel",replace:"\u2225"},"\\bowtie":{font:"main",group:"rel",replace:"\u22c8"},"\\smile":{font:"main",group:"rel",replace:"\u2323"},"\\sqsubseteq":{font:"main",group:"rel",replace:"\u2291"},"\\sqsupseteq":{font:"main",group:"rel",replace:"\u2292"},"\\doteq":{font:"main",group:"rel",replace:"\u2250"},"\\frown":{font:"main",group:"rel",replace:"\u2322"},"\\ni":{font:"main",group:"rel",replace:"\u220b"},"\\propto":{font:"main",group:"rel",replace:"\u221d"},"\\vdash":{font:"main",group:"rel",replace:"\u22a2"},"\\dashv":{font:"main",group:"rel",replace:"\u22a3"},"\\owns":{font:"main",group:"rel",replace:"\u220b"},"\\ldotp":{font:"main",group:"punct",replace:"."},"\\cdotp":{font:"main",group:"punct",replace:"\u22c5"},"\\#":{font:"main",group:"textord",replace:"#"},"\\&":{font:"main",group:"textord",replace:"&"},"\\aleph":{font:"main",group:"textord",replace:"\u2135"},"\\forall":{font:"main",group:"textord",replace:"\u2200"},"\\hbar":{font:"main",group:"textord",replace:"\u210f"},"\\exists":{font:"main",group:"textord",replace:"\u2203"},"\\nabla":{font:"main",group:"textord",replace:"\u2207"},"\\flat":{font:"main",group:"textord",replace:"\u266d"},"\\ell":{font:"main",group:"textord",replace:"\u2113"},"\\natural":{font:"main",group:"textord",replace:"\u266e"},"\\clubsuit":{font:"main",group:"textord",replace:"\u2663"},"\\wp":{font:"main",group:"textord",replace:"\u2118"},"\\sharp":{font:"main",group:"textord",replace:"\u266f"},"\\diamondsuit":{font:"main",group:"textord",replace:"\u2662"},"\\Re":{font:"main",group:"textord",replace:"\u211c"},"\\heartsuit":{font:"main",group:"textord",replace:"\u2661"},"\\Im":{font:"main",group:"textord",replace:"\u2111"},"\\spadesuit":{font:"main",group:"textord",replace:"\u2660"},"\\dag":{font:"main",group:"textord",replace:"\u2020"},"\\ddag":{font:"main",group:"textord",replace:"\u2021"},"\\rmoustache":{font:"main",group:"close",replace:"\u23b1"},"\\lmoustache":{font:"main",group:"open",replace:"\u23b0"},"\\rgroup":{font:"main",group:"close",replace:"\u27ef"},"\\lgroup":{font:"main",group:"open",replace:"\u27ee"},"\\mp":{font:"main",group:"bin",replace:"\u2213"},"\\ominus":{font:"main",group:"bin",replace:"\u2296"},"\\uplus":{font:"main",group:"bin",replace:"\u228e"},"\\sqcap":{font:"main",group:"bin",replace:"\u2293"},"\\ast":{font:"main",group:"bin",replace:"\u2217"},"\\sqcup":{font:"main",group:"bin",replace:"\u2294"},"\\bigcirc":{font:"main",group:"bin",replace:"\u25ef"},"\\bullet":{font:"main",group:"bin",replace:"\u2219"},"\\ddagger":{font:"main",group:"bin",replace:"\u2021"},"\\wr":{font:"main",group:"bin",replace:"\u2240"},"\\amalg":{font:"main",group:"bin",replace:"\u2a3f"},"\\longleftarrow":{font:"main",group:"rel",replace:"\u27f5"},"\\Leftarrow":{font:"main",group:"rel",replace:"\u21d0"},"\\Longleftarrow":{font:"main",group:"rel",replace:"\u27f8"},"\\longrightarrow":{font:"main",group:"rel",replace:"\u27f6"},"\\Rightarrow":{font:"main",group:"rel",replace:"\u21d2"},"\\Longrightarrow":{font:"main",group:"rel",replace:"\u27f9"},"\\leftrightarrow":{font:"main",group:"rel",replace:"\u2194"},"\\longleftrightarrow":{font:"main",group:"rel",replace:"\u27f7"},"\\Leftrightarrow":{font:"main",group:"rel",replace:"\u21d4"},"\\Longleftrightarrow":{font:"main",group:"rel",replace:"\u27fa"},"\\mapsto":{font:"main",group:"rel",replace:"\u21a6"},"\\longmapsto":{font:"main",group:"rel",replace:"\u27fc"},"\\nearrow":{font:"main",group:"rel",replace:"\u2197"},"\\hookleftarrow":{font:"main",group:"rel",replace:"\u21a9"},"\\hookrightarrow":{font:"main",group:"rel",replace:"\u21aa"},"\\searrow":{font:"main",group:"rel",replace:"\u2198"},"\\leftharpoonup":{font:"main",group:"rel",replace:"\u21bc"},"\\rightharpoonup":{font:"main",group:"rel",replace:"\u21c0"},"\\swarrow":{font:"main",group:"rel",replace:"\u2199"},"\\leftharpoondown":{font:"main",group:"rel",replace:"\u21bd"},"\\rightharpoondown":{font:"main",group:"rel",replace:"\u21c1"},"\\nwarrow":{font:"main",group:"rel",replace:"\u2196"},"\\rightleftharpoons":{font:"main",group:"rel",replace:"\u21cc"},"\\nless":{font:"ams",group:"rel",replace:"\u226e"},"\\nleqslant":{font:"ams",group:"rel",replace:"\ue010"},"\\nleqq":{font:"ams",group:"rel",replace:"\ue011"},"\\lneq":{font:"ams",group:"rel",replace:"\u2a87"},"\\lneqq":{font:"ams",group:"rel",replace:"\u2268"},"\\lvertneqq":{font:"ams",group:"rel",replace:"\ue00c"},"\\lnsim":{font:"ams",group:"rel",replace:"\u22e6"},"\\lnapprox":{font:"ams",group:"rel",replace:"\u2a89"},"\\nprec":{font:"ams",group:"rel",replace:"\u2280"},"\\npreceq":{font:"ams",group:"rel",replace:"\u22e0"},"\\precnsim":{font:"ams",group:"rel",replace:"\u22e8"},"\\precnapprox":{font:"ams",group:"rel",replace:"\u2ab9"},"\\nsim":{font:"ams",group:"rel",replace:"\u2241"},"\\nshortmid":{font:"ams",group:"rel",replace:"\ue006"},"\\nmid":{font:"ams",group:"rel",replace:"\u2224"},"\\nvdash":{font:"ams",group:"rel",replace:"\u22ac"},"\\nvDash":{font:"ams",group:"rel",replace:"\u22ad"},"\\ntriangleleft":{font:"ams",group:"rel",replace:"\u22ea"},"\\ntrianglelefteq":{font:"ams",group:"rel",replace:"\u22ec"},"\\subsetneq":{font:"ams",group:"rel",replace:"\u228a"},"\\varsubsetneq":{font:"ams",group:"rel",replace:"\ue01a"},"\\subsetneqq":{font:"ams",group:"rel",replace:"\u2acb"},"\\varsubsetneqq":{font:"ams",group:"rel",replace:"\ue017"},"\\ngtr":{font:"ams",group:"rel",replace:"\u226f"},"\\ngeqslant":{font:"ams",group:"rel",replace:"\ue00f"},"\\ngeqq":{font:"ams",group:"rel",replace:"\ue00e"},"\\gneq":{font:"ams",group:"rel",replace:"\u2a88"},"\\gneqq":{font:"ams",group:"rel",replace:"\u2269"},"\\gvertneqq":{font:"ams",group:"rel",replace:"\ue00d"},"\\gnsim":{font:"ams",group:"rel",replace:"\u22e7"},"\\gnapprox":{font:"ams",group:"rel",replace:"\u2a8a"},"\\nsucc":{font:"ams",group:"rel",replace:"\u2281"},"\\nsucceq":{font:"ams",group:"rel",replace:"\u22e1"},"\\succnsim":{font:"ams",group:"rel",replace:"\u22e9"},"\\succnapprox":{font:"ams",group:"rel",replace:"\u2aba"},"\\ncong":{font:"ams",group:"rel",replace:"\u2246"},"\\nshortparallel":{font:"ams",group:"rel",replace:"\ue007"},"\\nparallel":{font:"ams",group:"rel",replace:"\u2226"},"\\nVDash":{font:"ams",group:"rel",replace:"\u22af"},"\\ntriangleright":{font:"ams",group:"rel",replace:"\u22eb"},"\\ntrianglerighteq":{font:"ams",group:"rel",replace:"\u22ed"},"\\nsupseteqq":{font:"ams",group:"rel",replace:"\ue018"},"\\supsetneq":{font:"ams",group:"rel",replace:"\u228b"},"\\varsupsetneq":{font:"ams",group:"rel",replace:"\ue01b"},"\\supsetneqq":{font:"ams",group:"rel",replace:"\u2acc"},"\\varsupsetneqq":{font:"ams",group:"rel",replace:"\ue019"},"\\nVdash":{font:"ams",group:"rel",replace:"\u22ae"},"\\precneqq":{font:"ams",group:"rel",replace:"\u2ab5"},"\\succneqq":{font:"ams",group:"rel",replace:"\u2ab6"},"\\nsubseteqq":{font:"ams",group:"rel",replace:"\ue016"},"\\unlhd":{font:"ams",group:"bin",replace:"\u22b4"},"\\unrhd":{font:"ams",group:"bin",replace:"\u22b5"},"\\nleftarrow":{font:"ams",group:"rel",replace:"\u219a"},"\\nrightarrow":{font:"ams",group:"rel",replace:"\u219b"},"\\nLeftarrow":{font:"ams",group:"rel",replace:"\u21cd"},"\\nRightarrow":{font:"ams",group:"rel",replace:"\u21cf"},"\\nleftrightarrow":{font:"ams",group:"rel",replace:"\u21ae"},"\\nLeftrightarrow":{font:"ams",group:"rel",replace:"\u21ce"},"\\vartriangle":{font:"ams",group:"rel",replace:"\u25b3"},"\\hslash":{font:"ams",group:"textord",replace:"\u210f"},"\\triangledown":{font:"ams",group:"textord",replace:"\u25bd"},"\\lozenge":{font:"ams",group:"textord",replace:"\u25ca"},"\\circledS":{font:"ams",group:"textord",replace:"\u24c8"},"\\circledR":{font:"ams",group:"textord",replace:"\xae"},
"\\measuredangle":{font:"ams",group:"textord",replace:"\u2221"},"\\nexists":{font:"ams",group:"textord",replace:"\u2204"},"\\mho":{font:"ams",group:"textord",replace:"\u2127"},"\\Finv":{font:"ams",group:"textord",replace:"\u2132"},"\\Game":{font:"ams",group:"textord",replace:"\u2141"},"\\Bbbk":{font:"ams",group:"textord",replace:"k"},"\\backprime":{font:"ams",group:"textord",replace:"\u2035"},"\\blacktriangle":{font:"ams",group:"textord",replace:"\u25b2"},"\\blacktriangledown":{font:"ams",group:"textord",replace:"\u25bc"},"\\blacksquare":{font:"ams",group:"textord",replace:"\u25a0"},"\\blacklozenge":{font:"ams",group:"textord",replace:"\u29eb"},"\\bigstar":{font:"ams",group:"textord",replace:"\u2605"},"\\sphericalangle":{font:"ams",group:"textord",replace:"\u2222"},"\\complement":{font:"ams",group:"textord",replace:"\u2201"},"\\eth":{font:"ams",group:"textord",replace:"\xf0"},"\\diagup":{font:"ams",group:"textord",replace:"\u2571"},"\\diagdown":{font:"ams",group:"textord",replace:"\u2572"},"\\square":{font:"ams",group:"textord",replace:"\u25a1"},"\\Box":{font:"ams",group:"textord",replace:"\u25a1"},"\\Diamond":{font:"ams",group:"textord",replace:"\u25ca"},"\\yen":{font:"ams",group:"textord",replace:"\xa5"},"\\checkmark":{font:"ams",group:"textord",replace:"\u2713"},"\\beth":{font:"ams",group:"textord",replace:"\u2136"},"\\daleth":{font:"ams",group:"textord",replace:"\u2138"},"\\gimel":{font:"ams",group:"textord",replace:"\u2137"},"\\digamma":{font:"ams",group:"textord",replace:"\u03dd"},"\\varkappa":{font:"ams",group:"textord",replace:"\u03f0"},"\\ulcorner":{font:"ams",group:"textord",replace:"\u250c"},"\\urcorner":{font:"ams",group:"textord",replace:"\u2510"},"\\llcorner":{font:"ams",group:"textord",replace:"\u2514"},"\\lrcorner":{font:"ams",group:"textord",replace:"\u2518"},"\\leqq":{font:"ams",group:"rel",replace:"\u2266"},"\\leqslant":{font:"ams",group:"rel",replace:"\u2a7d"},"\\eqslantless":{font:"ams",group:"rel",replace:"\u2a95"},"\\lesssim":{font:"ams",group:"rel",replace:"\u2272"},"\\lessapprox":{font:"ams",group:"rel",replace:"\u2a85"},"\\approxeq":{font:"ams",group:"rel",replace:"\u224a"},"\\lessdot":{font:"ams",group:"bin",replace:"\u22d6"},"\\lll":{font:"ams",group:"rel",replace:"\u22d8"},"\\lessgtr":{font:"ams",group:"rel",replace:"\u2276"},"\\lesseqgtr":{font:"ams",group:"rel",replace:"\u22da"},"\\lesseqqgtr":{font:"ams",group:"rel",replace:"\u2a8b"},"\\doteqdot":{font:"ams",group:"rel",replace:"\u2251"},"\\risingdotseq":{font:"ams",group:"rel",replace:"\u2253"},"\\fallingdotseq":{font:"ams",group:"rel",replace:"\u2252"},"\\backsim":{font:"ams",group:"rel",replace:"\u223d"},"\\backsimeq":{font:"ams",group:"rel",replace:"\u22cd"},"\\subseteqq":{font:"ams",group:"rel",replace:"\u2ac5"},"\\Subset":{font:"ams",group:"rel",replace:"\u22d0"},"\\sqsubset":{font:"ams",group:"rel",replace:"\u228f"},"\\preccurlyeq":{font:"ams",group:"rel",replace:"\u227c"},"\\curlyeqprec":{font:"ams",group:"rel",replace:"\u22de"},"\\precsim":{font:"ams",group:"rel",replace:"\u227e"},"\\precapprox":{font:"ams",group:"rel",replace:"\u2ab7"},"\\vartriangleleft":{font:"ams",group:"rel",replace:"\u22b2"},"\\trianglelefteq":{font:"ams",group:"rel",replace:"\u22b4"},"\\vDash":{font:"ams",group:"rel",replace:"\u22a8"},"\\Vvdash":{font:"ams",group:"rel",replace:"\u22aa"},"\\smallsmile":{font:"ams",group:"rel",replace:"\u2323"},"\\smallfrown":{font:"ams",group:"rel",replace:"\u2322"},"\\bumpeq":{font:"ams",group:"rel",replace:"\u224f"},"\\Bumpeq":{font:"ams",group:"rel",replace:"\u224e"},"\\geqq":{font:"ams",group:"rel",replace:"\u2267"},"\\geqslant":{font:"ams",group:"rel",replace:"\u2a7e"},"\\eqslantgtr":{font:"ams",group:"rel",replace:"\u2a96"},"\\gtrsim":{font:"ams",group:"rel",replace:"\u2273"},"\\gtrapprox":{font:"ams",group:"rel",replace:"\u2a86"},"\\gtrdot":{font:"ams",group:"bin",replace:"\u22d7"},"\\ggg":{font:"ams",group:"rel",replace:"\u22d9"},"\\gtrless":{font:"ams",group:"rel",replace:"\u2277"},"\\gtreqless":{font:"ams",group:"rel",replace:"\u22db"},"\\gtreqqless":{font:"ams",group:"rel",replace:"\u2a8c"},"\\eqcirc":{font:"ams",group:"rel",replace:"\u2256"},"\\circeq":{font:"ams",group:"rel",replace:"\u2257"},"\\triangleq":{font:"ams",group:"rel",replace:"\u225c"},"\\thicksim":{font:"ams",group:"rel",replace:"\u223c"},"\\thickapprox":{font:"ams",group:"rel",replace:"\u2248"},"\\supseteqq":{font:"ams",group:"rel",replace:"\u2ac6"},"\\Supset":{font:"ams",group:"rel",replace:"\u22d1"},"\\sqsupset":{font:"ams",group:"rel",replace:"\u2290"},"\\succcurlyeq":{font:"ams",group:"rel",replace:"\u227d"},"\\curlyeqsucc":{font:"ams",group:"rel",replace:"\u22df"},"\\succsim":{font:"ams",group:"rel",replace:"\u227f"},"\\succapprox":{font:"ams",group:"rel",replace:"\u2ab8"},"\\vartriangleright":{font:"ams",group:"rel",replace:"\u22b3"},"\\trianglerighteq":{font:"ams",group:"rel",replace:"\u22b5"},"\\Vdash":{font:"ams",group:"rel",replace:"\u22a9"},"\\shortmid":{font:"ams",group:"rel",replace:"\u2223"},"\\shortparallel":{font:"ams",group:"rel",replace:"\u2225"},"\\between":{font:"ams",group:"rel",replace:"\u226c"},"\\pitchfork":{font:"ams",group:"rel",replace:"\u22d4"},"\\varpropto":{font:"ams",group:"rel",replace:"\u221d"},"\\blacktriangleleft":{font:"ams",group:"rel",replace:"\u25c0"},"\\therefore":{font:"ams",group:"rel",replace:"\u2234"},"\\backepsilon":{font:"ams",group:"rel",replace:"\u220d"},"\\blacktriangleright":{font:"ams",group:"rel",replace:"\u25b6"},"\\because":{font:"ams",group:"rel",replace:"\u2235"},"\\llless":{font:"ams",group:"rel",replace:"\u22d8"},"\\gggtr":{font:"ams",group:"rel",replace:"\u22d9"},"\\lhd":{font:"ams",group:"bin",replace:"\u22b2"},"\\rhd":{font:"ams",group:"bin",replace:"\u22b3"},"\\eqsim":{font:"ams",group:"rel",replace:"\u2242"},"\\Join":{font:"main",group:"rel",replace:"\u22c8"},"\\Doteq":{font:"ams",group:"rel",replace:"\u2251"},"\\dotplus":{font:"ams",group:"bin",replace:"\u2214"},"\\smallsetminus":{font:"ams",group:"bin",replace:"\u2216"},"\\Cap":{font:"ams",group:"bin",replace:"\u22d2"},"\\Cup":{font:"ams",group:"bin",replace:"\u22d3"},"\\doublebarwedge":{font:"ams",group:"bin",replace:"\u2a5e"},"\\boxminus":{font:"ams",group:"bin",replace:"\u229f"},"\\boxplus":{font:"ams",group:"bin",replace:"\u229e"},"\\divideontimes":{font:"ams",group:"bin",replace:"\u22c7"},"\\ltimes":{font:"ams",group:"bin",replace:"\u22c9"},"\\rtimes":{font:"ams",group:"bin",replace:"\u22ca"},"\\leftthreetimes":{font:"ams",group:"bin",replace:"\u22cb"},"\\rightthreetimes":{font:"ams",group:"bin",replace:"\u22cc"},"\\curlywedge":{font:"ams",group:"bin",replace:"\u22cf"},"\\curlyvee":{font:"ams",group:"bin",replace:"\u22ce"},"\\circleddash":{font:"ams",group:"bin",replace:"\u229d"},"\\circledast":{font:"ams",group:"bin",replace:"\u229b"},"\\centerdot":{font:"ams",group:"bin",replace:"\u22c5"},"\\intercal":{font:"ams",group:"bin",replace:"\u22ba"},"\\doublecap":{font:"ams",group:"bin",replace:"\u22d2"},"\\doublecup":{font:"ams",group:"bin",replace:"\u22d3"},"\\boxtimes":{font:"ams",group:"bin",replace:"\u22a0"},"\\dashrightarrow":{font:"ams",group:"rel",replace:"\u21e2"},"\\dashleftarrow":{font:"ams",group:"rel",replace:"\u21e0"},"\\leftleftarrows":{font:"ams",group:"rel",replace:"\u21c7"},"\\leftrightarrows":{font:"ams",group:"rel",replace:"\u21c6"},"\\Lleftarrow":{font:"ams",group:"rel",replace:"\u21da"},"\\twoheadleftarrow":{font:"ams",group:"rel",replace:"\u219e"},"\\leftarrowtail":{font:"ams",group:"rel",replace:"\u21a2"},"\\looparrowleft":{font:"ams",group:"rel",replace:"\u21ab"},"\\leftrightharpoons":{font:"ams",group:"rel",replace:"\u21cb"},"\\curvearrowleft":{font:"ams",group:"rel",replace:"\u21b6"},"\\circlearrowleft":{font:"ams",group:"rel",replace:"\u21ba"},"\\Lsh":{font:"ams",group:"rel",replace:"\u21b0"},"\\upuparrows":{font:"ams",group:"rel",replace:"\u21c8"},"\\upharpoonleft":{font:"ams",group:"rel",replace:"\u21bf"},"\\downharpoonleft":{font:"ams",group:"rel",replace:"\u21c3"},"\\multimap":{font:"ams",group:"rel",replace:"\u22b8"},"\\leftrightsquigarrow":{font:"ams",group:"rel",replace:"\u21ad"},"\\rightrightarrows":{font:"ams",group:"rel",replace:"\u21c9"},"\\rightleftarrows":{font:"ams",group:"rel",replace:"\u21c4"},"\\twoheadrightarrow":{font:"ams",group:"rel",replace:"\u21a0"},"\\rightarrowtail":{font:"ams",group:"rel",replace:"\u21a3"},"\\looparrowright":{font:"ams",group:"rel",replace:"\u21ac"},"\\curvearrowright":{font:"ams",group:"rel",replace:"\u21b7"},"\\circlearrowright":{font:"ams",group:"rel",replace:"\u21bb"},"\\Rsh":{font:"ams",group:"rel",replace:"\u21b1"},"\\downdownarrows":{font:"ams",group:"rel",replace:"\u21ca"},"\\upharpoonright":{font:"ams",group:"rel",replace:"\u21be"},"\\downharpoonright":{font:"ams",group:"rel",replace:"\u21c2"},"\\rightsquigarrow":{font:"ams",group:"rel",replace:"\u21dd"},"\\leadsto":{font:"ams",group:"rel",replace:"\u21dd"},"\\Rrightarrow":{font:"ams",group:"rel",replace:"\u21db"},"\\restriction":{font:"ams",group:"rel",replace:"\u21be"},"`":{font:"main",group:"textord",replace:"\u2018"},"\\$":{font:"main",group:"textord",replace:"$"},"\\%":{font:"main",group:"textord",replace:"%"},"\\_":{font:"main",group:"textord",replace:"_"},"\\angle":{font:"main",group:"textord",replace:"\u2220"},"\\infty":{font:"main",group:"textord",replace:"\u221e"},"\\prime":{font:"main",group:"textord",replace:"\u2032"},"\\triangle":{font:"main",group:"textord",replace:"\u25b3"},"\\Gamma":{font:"main",group:"textord",replace:"\u0393"},"\\Delta":{font:"main",group:"textord",replace:"\u0394"},"\\Theta":{font:"main",group:"textord",replace:"\u0398"},"\\Lambda":{font:"main",group:"textord",replace:"\u039b"},"\\Xi":{font:"main",group:"textord",replace:"\u039e"},"\\Pi":{font:"main",group:"textord",replace:"\u03a0"},"\\Sigma":{font:"main",group:"textord",replace:"\u03a3"},"\\Upsilon":{font:"main",group:"textord",replace:"\u03a5"},"\\Phi":{font:"main",group:"textord",replace:"\u03a6"},"\\Psi":{font:"main",group:"textord",replace:"\u03a8"},"\\Omega":{font:"main",group:"textord",replace:"\u03a9"},"\\neg":{font:"main",group:"textord",replace:"\xac"},"\\lnot":{font:"main",group:"textord",replace:"\xac"},"\\top":{font:"main",group:"textord",replace:"\u22a4"},"\\bot":{font:"main",group:"textord",replace:"\u22a5"},"\\emptyset":{font:"main",group:"textord",replace:"\u2205"},"\\varnothing":{font:"ams",group:"textord",replace:"\u2205"},"\\alpha":{font:"main",group:"mathord",replace:"\u03b1"},"\\beta":{font:"main",group:"mathord",replace:"\u03b2"},"\\gamma":{font:"main",group:"mathord",replace:"\u03b3"},"\\delta":{font:"main",group:"mathord",replace:"\u03b4"},"\\epsilon":{font:"main",group:"mathord",replace:"\u03f5"},"\\zeta":{font:"main",group:"mathord",replace:"\u03b6"},"\\eta":{font:"main",group:"mathord",replace:"\u03b7"},"\\theta":{font:"main",group:"mathord",replace:"\u03b8"},"\\iota":{font:"main",group:"mathord",replace:"\u03b9"},"\\kappa":{font:"main",group:"mathord",replace:"\u03ba"},"\\lambda":{font:"main",group:"mathord",replace:"\u03bb"},"\\mu":{font:"main",group:"mathord",replace:"\u03bc"},"\\nu":{font:"main",group:"mathord",replace:"\u03bd"},"\\xi":{font:"main",group:"mathord",replace:"\u03be"},"\\omicron":{font:"main",group:"mathord",replace:"o"},"\\pi":{font:"main",group:"mathord",replace:"\u03c0"},"\\rho":{font:"main",group:"mathord",replace:"\u03c1"},"\\sigma":{font:"main",group:"mathord",replace:"\u03c3"},"\\tau":{font:"main",group:"mathord",replace:"\u03c4"},"\\upsilon":{font:"main",group:"mathord",replace:"\u03c5"},"\\phi":{font:"main",group:"mathord",replace:"\u03d5"},"\\chi":{font:"main",group:"mathord",replace:"\u03c7"},"\\psi":{font:"main",group:"mathord",replace:"\u03c8"},"\\omega":{font:"main",group:"mathord",replace:"\u03c9"},"\\varepsilon":{font:"main",group:"mathord",replace:"\u03b5"},"\\vartheta":{font:"main",group:"mathord",replace:"\u03d1"},"\\varpi":{font:"main",group:"mathord",replace:"\u03d6"},"\\varrho":{font:"main",group:"mathord",replace:"\u03f1"},"\\varsigma":{font:"main",group:"mathord",replace:"\u03c2"},"\\varphi":{font:"main",group:"mathord",replace:"\u03c6"},"*":{font:"main",group:"bin",replace:"\u2217"},"+":{font:"main",group:"bin"},"-":{font:"main",group:"bin",replace:"\u2212"},"\\cdot":{font:"main",group:"bin",replace:"\u22c5"},"\\circ":{font:"main",group:"bin",replace:"\u2218"},"\\div":{font:"main",group:"bin",replace:"\xf7"},"\\pm":{font:"main",group:"bin",replace:"\xb1"},"\\times":{font:"main",group:"bin",replace:"\xd7"},"\\cap":{font:"main",group:"bin",replace:"\u2229"},"\\cup":{font:"main",group:"bin",replace:"\u222a"},"\\setminus":{font:"main",group:"bin",replace:"\u2216"},"\\land":{font:"main",group:"bin",replace:"\u2227"},"\\lor":{font:"main",group:"bin",replace:"\u2228"},"\\wedge":{font:"main",group:"bin",replace:"\u2227"},"\\vee":{font:"main",group:"bin",replace:"\u2228"},"\\surd":{font:"main",group:"textord",replace:"\u221a"},"(":{font:"main",group:"open"},"[":{font:"main",group:"open"},"\\langle":{font:"main",group:"open",replace:"\u27e8"},"\\lvert":{font:"main",group:"open",replace:"\u2223"},")":{font:"main",group:"close"},"]":{font:"main",group:"close"},"?":{font:"main",group:"close"},"!":{font:"main",group:"close"},"\\rangle":{font:"main",group:"close",replace:"\u27e9"},"\\rvert":{font:"main",group:"close",replace:"\u2223"},"=":{font:"main",group:"rel"},"<":{font:"main",group:"rel"},">":{font:"main",group:"rel"},":":{font:"main",group:"rel"},"\\approx":{font:"main",group:"rel",replace:"\u2248"},"\\cong":{font:"main",group:"rel",replace:"\u2245"},"\\ge":{font:"main",group:"rel",replace:"\u2265"},"\\geq":{font:"main",group:"rel",replace:"\u2265"},"\\gets":{font:"main",group:"rel",replace:"\u2190"},"\\in":{font:"main",group:"rel",replace:"\u2208"},"\\notin":{font:"main",group:"rel",replace:"\u2209"},"\\subset":{font:"main",group:"rel",replace:"\u2282"},"\\supset":{font:"main",group:"rel",replace:"\u2283"},"\\subseteq":{font:"main",group:"rel",replace:"\u2286"},"\\supseteq":{font:"main",group:"rel",replace:"\u2287"},"\\nsubseteq":{font:"ams",group:"rel",replace:"\u2288"},"\\nsupseteq":{font:"ams",group:"rel",replace:"\u2289"},"\\models":{font:"main",group:"rel",replace:"\u22a8"},"\\leftarrow":{font:"main",group:"rel",replace:"\u2190"},"\\le":{font:"main",group:"rel",replace:"\u2264"},"\\leq":{font:"main",group:"rel",replace:"\u2264"},"\\ne":{font:"main",group:"rel",replace:"\u2260"},"\\neq":{font:"main",group:"rel",replace:"\u2260"},"\\rightarrow":{font:"main",group:"rel",replace:"\u2192"},"\\to":{font:"main",group:"rel",replace:"\u2192"},"\\ngeq":{font:"ams",group:"rel",replace:"\u2271"},"\\nleq":{font:"ams",group:"rel",replace:"\u2270"},"\\!":{font:"main",group:"spacing"},"\\ ":{font:"main",group:"spacing",replace:"\xa0"},"~":{font:"main",group:"spacing",replace:"\xa0"},"\\,":{font:"main",group:"spacing"},"\\:":{font:"main",group:"spacing"},"\\;":{font:"main",group:"spacing"},"\\enspace":{font:"main",group:"spacing"},"\\qquad":{font:"main",group:"spacing"},"\\quad":{font:"main",group:"spacing"},"\\space":{font:"main",group:"spacing",replace:"\xa0"},",":{font:"main",group:"punct"},";":{font:"main",group:"punct"},"\\colon":{font:"main",group:"punct",replace:":"},"\\barwedge":{font:"ams",group:"textord",replace:"\u22bc"},"\\veebar":{font:"ams",group:"textord",replace:"\u22bb"},"\\odot":{font:"main",group:"bin",replace:"\u2299"},"\\oplus":{font:"main",group:"bin",replace:"\u2295"},"\\otimes":{font:"main",group:"bin",replace:"\u2297"},"\\partial":{font:"main",group:"textord",replace:"\u2202"},"\\oslash":{font:"main",group:"bin",replace:"\u2298"},"\\circledcirc":{font:"ams",group:"textord",replace:"\u229a"},"\\boxdot":{font:"ams",group:"textord",replace:"\u22a1"},"\\bigtriangleup":{font:"main",group:"bin",replace:"\u25b3"},"\\bigtriangledown":{font:"main",group:"bin",replace:"\u25bd"},"\\dagger":{font:"main",group:"bin",replace:"\u2020"},"\\diamond":{font:"main",group:"bin",replace:"\u22c4"},"\\star":{font:"main",group:"bin",replace:"\u22c6"},"\\triangleleft":{font:"main",group:"bin",replace:"\u25c3"},"\\triangleright":{font:"main",group:"bin",replace:"\u25b9"},"\\{":{font:"main",group:"open",replace:"{"},"\\}":{font:"main",group:"close",replace:"}"},"\\lbrace":{font:"main",group:"open",replace:"{"},"\\rbrace":{font:"main",group:"close",replace:"}"},"\\lbrack":{font:"main",group:"open",replace:"["},"\\rbrack":{font:"main",group:"close",replace:"]"},"\\lfloor":{font:"main",group:"open",replace:"\u230a"},"\\rfloor":{font:"main",group:"close",replace:"\u230b"},"\\lceil":{font:"main",group:"open",replace:"\u2308"},"\\rceil":{font:"main",group:"close",replace:"\u2309"},"\\backslash":{font:"main",group:"textord",replace:"\\"},"|":{font:"main",group:"textord",replace:"\u2223"},"\\vert":{font:"main",group:"textord",replace:"\u2223"},"\\|":{font:"main",group:"textord",replace:"\u2225"},"\\Vert":{font:"main",group:"textord",replace:"\u2225"},"\\uparrow":{font:"main",group:"textord",replace:"\u2191"},"\\Uparrow":{font:"main",group:"textord",replace:"\u21d1"},"\\downarrow":{font:"main",group:"textord",replace:"\u2193"},"\\Downarrow":{font:"main",group:"textord",replace:"\u21d3"},"\\updownarrow":{font:"main",group:"textord",replace:"\u2195"},"\\Updownarrow":{font:"main",group:"textord",replace:"\u21d5"},"\\coprod":{font:"math",group:"op",replace:"\u2210"},"\\bigvee":{font:"math",group:"op",replace:"\u22c1"},"\\bigwedge":{font:"math",group:"op",replace:"\u22c0"},"\\biguplus":{font:"math",group:"op",replace:"\u2a04"},"\\bigcap":{font:"math",group:"op",replace:"\u22c2"},"\\bigcup":{font:"math",group:"op",replace:"\u22c3"},"\\int":{font:"math",group:"op",replace:"\u222b"},"\\intop":{font:"math",group:"op",replace:"\u222b"},"\\iint":{font:"math",group:"op",replace:"\u222c"},"\\iiint":{font:"math",group:"op",replace:"\u222d"},"\\prod":{font:"math",group:"op",replace:"\u220f"},"\\sum":{font:"math",group:"op",replace:"\u2211"},"\\bigotimes":{font:"math",group:"op",replace:"\u2a02"},"\\bigoplus":{font:"math",group:"op",replace:"\u2a01"},"\\bigodot":{font:"math",group:"op",replace:"\u2a00"},"\\oint":{font:"math",group:"op",replace:"\u222e"},"\\bigsqcup":{font:"math",group:"op",replace:"\u2a06"},"\\smallint":{font:"math",group:"op",replace:"\u222b"},"\\ldots":{font:"main",group:"punct",replace:"\u2026"},"\\cdots":{font:"main",group:"inner",replace:"\u22ef"},"\\ddots":{font:"main",group:"inner",replace:"\u22f1"},"\\vdots":{font:"main",group:"textord",replace:"\u22ee"},"\\acute":{font:"main",group:"accent",replace:"\xb4"},"\\grave":{font:"main",group:"accent",replace:"`"},"\\ddot":{font:"main",group:"accent",replace:"\xa8"},"\\tilde":{font:"main",group:"accent",replace:"~"},"\\bar":{font:"main",group:"accent",replace:"\xaf"},"\\breve":{font:"main",group:"accent",replace:"\u02d8"},"\\check":{font:"main",group:"accent",replace:"\u02c7"},"\\hat":{font:"main",group:"accent",replace:"^"},"\\vec":{font:"main",group:"accent",replace:"\u20d7"},"\\dot":{font:"main",group:"accent",replace:"\u02d9"}},text:{"\\ ":{font:"main",group:"spacing",replace:"\xa0"}," ":{font:"main",group:"spacing",replace:"\xa0"},"~":{font:"main",group:"spacing",replace:"\xa0"}}};var a='0123456789/@."';for(var r=0;r<a.length;r++){var l=a.charAt(r);h.math[l]={font:"main",group:"textord"}}var s="0123456789`!@*()-=+[]'\";:?/.,";for(var r=0;r<s.length;r++){var l=s.charAt(r);h.text[l]={font:"main",group:"textord"}}var p="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var r=0;r<p.length;r++){var l=p.charAt(r);h.math[l]={font:"main",group:"mathord"};h.text[l]={font:"main",group:"textord"}}t.exports=h},{}],23:[function(e,t,i){var h=Array.prototype.indexOf;var a=function(e,t){if(e==null){return-1}if(h&&e.indexOf===h){return e.indexOf(t)}var i=0,a=e.length;for(;i<a;i++){if(e[i]===t){return i}}return-1};var r=function(e,t){return a(e,t)!==-1};var l=function(e,t){return e===undefined?t:e};var s=/([A-Z])/g;var p=function(e){return e.replace(s,"-$1").toLowerCase()};var n={"&":"&amp;",">":"&gt;","<":"&lt;",'"':"&quot;","'":"&#x27;"};var o=/[&><"']/g;function c(e){return n[e]}function g(e){return(""+e).replace(o,c)}var d;if(typeof document!=="undefined"){var u=document.createElement("span");if("textContent"in u){d=function(e,t){e.textContent=t}}else{d=function(e,t){e.innerText=t}}}function w(e){d(e,"")}t.exports={contains:r,deflt:l,escape:g,hyphenate:p,indexOf:a,setTextContent:d,clearNode:w}},{}]},{},[1])(1)});

(function(e){if("function"==typeof bootstrap)bootstrap("rendermathinelement",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeRenderMathInElement=e}else"undefined"!=typeof window?window.renderMathInElement=e():global.renderMathInElement=e()})(function(){var e,t,r,n,a;return function i(e,t,r){function n(o,l){if(!t[o]){if(!e[o]){var f=typeof require=="function"&&require;if(!l&&f)return f(o,!0);if(a)return a(o,!0);throw new Error("Cannot find module '"+o+"'")}var s=t[o]={exports:{}};e[o][0].call(s.exports,function(t){var r=e[o][1][t];return n(r?r:t)},s,s.exports,i,e,t,r)}return t[o].exports}var a=typeof require=="function"&&require;for(var o=0;o<r.length;o++)n(r[o]);return n}({1:[function(e,t,r){var n=e("./splitAtDelimiters");var a=function(e,t){var r=[{type:"text",data:e}];for(var a=0;a<t.length;a++){var i=t[a];r=n(r,i.left,i.right,i.display||false)}return r};var i=function(e,t){var r=a(e,t);var n=document.createDocumentFragment();for(var i=0;i<r.length;i++){if(r[i].type==="text"){n.appendChild(document.createTextNode(r[i].data))}else{var o=document.createElement("span");var l=r[i].data;katex.render(l,o,{displayMode:r[i].display});n.appendChild(o)}}return n};var o=function(e,t,r){for(var n=0;n<e.childNodes.length;n++){var a=e.childNodes[n];if(a.nodeType===3){var l=i(a.textContent,t);n+=l.childNodes.length-1;e.replaceChild(l,a)}else if(a.nodeType===1){var f=r.indexOf(a.nodeName.toLowerCase())===-1;if(f){o(a,t,r)}}else{}}};var l={delimiters:[{left:"$$",right:"$$",display:true},{left:"\\[",right:"\\]",display:true},{left:"\\(",right:"\\)",display:false}],ignoredTags:["script","noscript","style","textarea","pre","code"]};var f=function(e){var t,r;for(var n=1,a=arguments.length;n<a;n++){t=arguments[n];for(r in t){if(Object.prototype.hasOwnProperty.call(t,r)){e[r]=t[r]}}}return e};var s=function(e,t){if(!e){throw new Error("No element provided to render")}t=f({},l,t);o(e,t.delimiters,t.ignoredTags)};t.exports=s},{"./splitAtDelimiters":2}],2:[function(e,t,r){var n=function(e,t,r){var n=r;var a=0;var i=e.length;while(n<t.length){var o=t[n];if(a<=0&&t.slice(n,n+i)===e){return n}else if(o==="\\"){n++}else if(o==="{"){a++}else if(o==="}"){a--}n++}return-1};var a=function(e,t,r,a){var i=[];for(var o=0;o<e.length;o++){if(e[o].type==="text"){var l=e[o].data;var f=true;var s=0;var d;d=l.indexOf(t);if(d!==-1){s=d;i.push({type:"text",data:l.slice(0,s)});f=false}while(true){if(f){d=l.indexOf(t,s);if(d===-1){break}i.push({type:"text",data:l.slice(s,d)});s=d}else{d=n(r,l,s+t.length);if(d===-1){break}i.push({type:"math",data:l.slice(s+t.length,d),display:a});s=d+r.length}f=!f}i.push({type:"text",data:l.slice(s)})}else{i.push(e[o])}}return i};t.exports=a},{}]},{},[1])(1)});

/* Umbrella JS 1.10.0 umbrellajs.com */
function ajax(a,b,c,d,e){d=d||Function;var f=new XMLHttpRequest;return u([f]).on("error timeout abort",function(){d(new Error,null,f)}).on("load",function(){var a=/^(2|3)/.test(f.status)?null:new Error(f.status),b=parseJson(f.response)||f.response;return d(a,b,f)}),f.open(a||"GET",b),f.setRequestHeader("X-Requested-With","XMLHttpRequest"),f.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),e&&e(f),f.send("string"==typeof c?c:u().param(c)),f}function parseJson(a){try{var b=JSON.parse(a);if(b&&"object"==typeof b)return b}catch(c){}return!1}var u=function(a,b){return this instanceof u?a instanceof u?a:("string"==typeof a&&(a=this.select(a,b)),a&&a.nodeName&&(a=[a]),void(this.nodes=this.slice(a))):new u(a,b)};u.prototype={get length(){return this.nodes.length}},u.prototype.nodes=[],u.prototype.addClass=function(){return this.eacharg(arguments,function(a,b){a.classList.add(b)})},u.prototype.adjacent=function(a,b,c){return this.each(function(d){u(c||[""]).each(function(c){var e="function"==typeof b?b.call(this,d,c):b;d.insertAdjacentHTML(a,e)})})},u.prototype.after=function(a,b){return this.adjacent("afterend",a,b)},u.prototype.ajax=function(a,b){return this.on("submit",function(c){c.preventDefault();var d=u(this);ajax(d.attr("method"),d.attr("action"),d.serialize(),a,b)})},u.prototype.append=function(a,b){return this.adjacent("beforeend",a,b)},u.prototype.args=function(a,b,c){return"function"==typeof a&&(a=a(b,c)),"string"!=typeof a&&(a=this.slice(a).map(this.str(b,c))),a.toString().split(/[\s,]+/).filter(function(a){return a.length})},u.prototype.attr=function(a,b,c){if(c=c?"data-":"",void 0!==b){var d=a;a={},a[d]=b}return"object"==typeof a?this.each(function(b){for(var d in a)b.setAttribute(c+d,a[d])}):this.length?this.first().getAttribute(c+a):""},u.prototype.before=function(a,b){return this.adjacent("beforebegin",a,b)},u.prototype.children=function(a){return this.join(function(a){return this.slice(a.children)}).filter(a)},u.prototype.closest=function(a){return this.join(function(b){do if(u(b).is(a))return b;while(b=b.parentNode)})},u.prototype.data=function(a,b){return this.attr(a,b,!0)},u.prototype.each=function(a){return this.nodes.forEach(a.bind(this)),this},u.prototype.eacharg=function(a,b){return this.each(function(c,d){this.args(a,c,d).forEach(function(a){b.call(this,c,a)},this)})},u.prototype.filter=function(a){var b=function(b){return b.matches=b.matches||b.msMatchesSelector||b.webkitMatchesSelector,b.matches(a||"*")};return"function"==typeof a&&(b=a),a instanceof u&&(b=function(b){return-1!==a.nodes.indexOf(b)}),u(this.nodes.filter(b))},u.prototype.find=function(a){return this.join(function(b){return u(a||"*",b).nodes})},u.prototype.first=function(){return this.nodes[0]||!1},u.prototype.hasClass=function(a){return this.is("."+this.args(arguments).join("."))},u.prototype.html=function(a){return void 0===a?this.first().innerHTML||"":this.each(function(b){b.innerHTML=a})},u.prototype.is=function(a){return this.filter(a).length>0},u.prototype.join=function(a){var b=this;return u(this.nodes.reduce(function(c,d,e){return c.concat(a.call(b,d,e))},[])).unique()},u.prototype.last=function(){return this.nodes[this.length-1]||!1},u.prototype.not=function(a){return this.filter(function(b){return!u(b).is(a||!0)})},u.prototype.off=function(a){return this.eacharg(a,function(a,b){u(a._e?a._e[b]:[]).each(function(c){a.removeEventListener(b,c)})})},u.prototype.on=function(a,b){return this.eacharg(a,function(a,c){a.addEventListener(c,b),a._e=a._e||{},a._e[c]=(a._e[c]||[]).concat(b)})},u.prototype.param=function(a){var b="";for(var c in a)b+="&"+this.uri(c)+"="+this.uri(a[c]);return b.slice(1)},u.prototype.parent=function(a){return this.join(function(a){return a.parentNode}).filter(a)},u.prototype.prepend=function(a,b){return this.adjacent("afterbegin",a,b)},u.prototype.remove=function(){return this.each(function(a){a.parentNode.removeChild(a)})},u.prototype.removeClass=function(){return this.eacharg(arguments,function(a,b){a.classList.remove(b)})},u.prototype.select=function(a,b){if(b)return this.select.byCss(a,b);for(var c in this.selectors)if(b=c.split("/"),new RegExp(b[1],b[2]).test(a))return this.selectors[c](a);return this.select.byCss(a)},u.prototype.select.byCss=function(a,b){return(b||document).querySelectorAll(a)},u.prototype.selectors={},u.prototype.selectors[/^\.[\w\-]+$/]=function(a){return document.getElementsByClassName(a.substring(1))},u.prototype.selectors[/^\w+$/]=document.getElementsByTagName.bind(document),u.prototype.selectors[/^\#[\w\-]+$/]=function(a){return document.getElementById(a.substring(1))},u.prototype.selectors[/^\</]=function(a){return u(document.createElement("div")).html(a).children().nodes},u.prototype.serialize=function(){return this.param(this.slice(this.first().elements).reduce(function(a,b){return!b.name||"file"===b.type||/(checkbox|radio)/.test(b.type)&&!b.checked||(a[b.name]=b.value),a},{}))},u.prototype.siblings=function(a){return this.parent().children(a).not(this)},u.prototype.slice=function(a){return a?[].slice.call(a.nodes||a):[]},u.prototype.str=function(a,b){return function(c){return"function"==typeof c?c.call(this,a,b):c.toString()}},u.prototype.text=function(a){return void 0===a?this.first().textContent||"":this.each(function(b){b.textContent=a})},u.prototype.toggleClass=function(a,b){return!!b===b?this[b?"addClass":"removeClass"](a):this.eacharg(a,function(a,b){a.classList.toggle(b)})},u.prototype.trigger=function(a,b){this.eacharg(a,function(a,c){var d,e={bubbles:!0,cancelable:!0,detail:b};try{d=new CustomEvent(c,e)}catch(f){d=document.createEvent("CustomEvent"),d.initCustomEvent(c,!0,!0,b)}a.dispatchEvent(d)})},u.prototype.unique=function(){return u(this.nodes.reduce(function(a,b){return b&&-1===a.indexOf(b)?a.concat(b):a},[]))},u.prototype.uri=function(a){return encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};

/*
 * Sweet Justice: beautiful justified text.
 *
 * Include this file at the bottom of your pages
 * and it will hyphenate and justify your text.
 * The script pays attention to elements with
 * any of these three CSS classes:
 *
 *   sweet-justice:  Hyphenated and justified
 *   sweet-hypens:   Hyphenation only
 *   justice-denied: No hypens or justification.
 *                   This is useful for child nodes.
 *
 * Hyphenation is accomplished by inserting soft
 * hyphen characters (0x00AD) into long words.
 *
 * Requires either jQuery or YUI3.
 *
 * BSD license: Share and enjoy.
 * @author carlos@bueno.org 23 April 2010
 * github.com/aristus/sweet-justice
 *
 */



// don't break up short words.
var MIN_WORD = 6;

// don't mess with the content of these tags.
var tag_blacklist = {
  'code': true,
  'pre': true,
  'abbr': true
}

// Recurse raw DOM nodes, hyphenating each text node.
function justify_my_love(el) {
  if (!el)
    return false;

  var nodes = el.childNodes;
  for (var i=0; i<nodes.length; i++) {
    var node = nodes[i];

    switch (node.nodeType) {
      case 3: // Node.TEXT_NODE
        node.nodeValue = break_dance(node.nodeValue);
        break;

      case 1: // Node.ELEMENT_NODE
        if (!tag_blacklist[node.nodeName.toLowerCase()] &&
            node.className.indexOf('justice-denied') === -1) {
          justify_my_love(node);
        }
        break;
    }
  }
}

// Given a plain-text string, insert shy-phens into long words.
// Variant of the VCCV algorithm
// http://www.bramstein.com/projects/typeset/
// http://defoe.sourceforge.net/folio/knuth-plass.html
// If you are a student of English grammar or typography, this
// will make you cry. If you read anything other than English,
// this will also make you cry.
var whitespace = /[ \s\n\r\v\t]+/;
function break_dance(text) {
  var words = text.split(whitespace);
  for (var i=0; i<words.length; i++) {
    if (breakable(words[i])) {
      words[i] = break_word_en(words[i]);
    }
  }
  return words.join(' ');
}

// determine whether a word is good for hyphenation.
// no numbers, email addresses, hyphens, or &entities;
function breakable(word) {
  return (/\w{6,}/.test(word)) && (!/^[0-9\&]|@|\-|\u00AD/.test(word));
}

// Detect all Unicode vowels. Just last week I told someone
// to never do this. Never say never, I guess. The Closure
// compiler transforms this into ASCII-safe \u0000 encoding.
// http://closure-compiler.appspot.com/home
var vowels = 'aeiouyAEIOUY'+
  'ẚÁáÀàĂăẮắẰằẴẵẲẳÂâẤấẦầẪẫẨẩǍǎÅåǺǻÄäǞǟÃãȦȧǠǡĄąĀāẢảȀȁȂȃẠạẶặẬậḀḁȺⱥ'+
  'ǼǽǢǣÉƏƎǝéÈèĔĕÊêẾếỀềỄễỂểĚěËëẼẽĖėȨȩḜḝĘęĒēḖḗḔḕẺẻȄȅȆȇẸẹỆệḘḙḚḛɆɇɚɝÍíÌìĬĭÎîǏǐÏ'+
  'ïḮḯĨĩİiĮįĪīỈỉȈȉȊȋỊịḬḭIıƗɨÓóÒòŎŏÔôỐốỒồỖỗỔổǑǒÖöȪȫŐőÕõṌṍṎṏȬȭȮȯȰȱØøǾǿǪǫǬǭŌōṒṓ'+
  'ṐṑỎỏȌȍȎȏƠơỚớỜờỠỡỞởỢợỌọỘộƟɵÚúÙùŬŭÛûǓǔŮůÜüǗǘǛǜǙǚǕǖŰűŨũṸṹŲųŪūṺṻỦủȔȕȖȗƯưỨứỪừ'+
  'ỮữỬửỰựỤụṲṳṶṷṴṵɄʉÝýỲỳŶŷY̊ẙŸÿỸỹẎẏȲȳỶỷỴỵʏɎɏƳƴ';
var c = '[^'+vowels+']';
var v = '['+vowels+']';
var vccv = new RegExp('('+v+c+')('+c+v+')', 'g');
var simple = new RegExp('(.{2,4}'+v+')'+'('+c+')', 'g');

// "algorithmic" hyphenation
var dumb = /\u00AD(.?)|$\u00AD(.{0,2}\w+)$/;
function break_word_default(word) {
  return word
    .replace(vccv, '$1\u00AD$2')
    .replace(simple, '$1\u00AD$2')
    .replace(dumb, '$1');
}

// dictionary-based hypenation similar to the original
// TeX algo: split on well-known prefixes and suffixes
// then along the vccv line. This is not i18n nor even
// generally correct, but is fairly compact.
var presuf = /^(\W*)(anti|auto|ab|an|ax|al|as|bi|bet|be|contra|cat|cath|cir|cum|cog|col|com|con|cor|could|co|desk|de|dis|did|dif|di|eas|every|ever|extra|ex|end|en|em|epi|evi|func|fund|fin|hyst|hy|han|il|in|im|ir|just|jus|loc|lig|lit|li|mech|manu|man|mal|mis|mid|mono|multi|mem|micro|non|nano|ob|oc|of|opt|op|over|para|per|post|pre|peo|pro|retro|rea|re|rhy|should|some|semi|sen|sol|sub|suc|suf|super|sup|sur|sus|syn|sym|syl|tech|trans|tri|typo|type|uni|un|van|vert|with|would|won)?(.*?)(weens?|widths?|icals?|ables?|ings?|tions?|ions?|ies|isms?|ists?|ful|ness|ments?|ly|ify|ize|ise|ity|en|ers?|ences?|tures?|ples?|als?|phy|puts?|phies|ry|ries|cy|cies|mums?|ous|cents?)?(\W*)$/i;

function break_word_en(word) {
  // punctuation, prefix, center, suffix, punctuation
  var parts = presuf.exec(word);
  var ret = [];
  if (parts[2]) {
    ret.push(parts[2]);
  }
  if (parts[3]) {
    ret.push(parts[3].replace(vccv, '$1\u00AD$2'));
  }
  if (parts[4]) {
    ret.push(parts[4]);
  }
  return (parts[1]||'') + ret.join('\u00AD') + (parts[5]||'');
}

// The shy-phen character is an odd duck. On copy/paste
// most apps other than browsers treat them as printable
// instead of a hyphenation hint, which is usually not what
// you want. So on copy we take 'em out. The selection APIs
// are very different across browsers so there is a lot of
// browser-specific jazzhands in this function. The basic
// idea is to grab the data being copied, make a "shadow"
// element of it, remove the shy-phens, select and copy
// that, then reinstate the original selection.
//
// More than you ever wanted to know:
// http://www.cs.tut.fi/~jkorpela/shy.html
function copy_protect(e) {
  var body = document.getElementsByTagName('body')[0];
  var shyphen = /(?:\u00AD|\&#173;|\&shy;)/g;
  var shadow = document.createElement('div');
  shadow.style.overflow = 'hidden';
  shadow.style.position = 'absolute';
  shadow.style.top = '-5000px';
  shadow.style.height = '1px';
  body.appendChild(shadow);

  // FF3, WebKit
  if (typeof window.getSelection !== 'undefined') {
    sel = window.getSelection();
    var range = sel.getRangeAt(0);
    shadow.appendChild(range.cloneContents());
    shadow.innerHTML = shadow.innerHTML.replace(shyphen, '');
    sel.selectAllChildren(shadow);
    window.setTimeout(function() {
      shadow.parentNode.removeChild(shadow);
      if (typeof window.getSelection().setBaseAndExtent !== 'undefined') {
        sel.setBaseAndExtent(
          range.startContainer,
          range.startOffset,
          range.endContainer,
          range.endOffset
        );
      }
    },0);

  // Internet Explorer
  } else {
    sel = document.selection;
    var range = sel.createRange();
    shadow.innerHTML = range.htmlText.replace(shyphen, '');
    var range2 = body.createTextRange();
    range2.moveToElementText(shadow);
    range2.select();
    window.setTimeout(function() {
      shadow.parentNode.removeChild(shadow);
      if (range.text !== '') {
        range.select();
      }
    },0);
  }
  return;
}

// Pagex
// A minimal engine for loading only page-specific code with regex
var pagex = function(path, negate, callback){
  
  
  // Allow it to have different signatures
  if (!callback) {
    callback = negate;
    negate = false;
  }
  
  // The actual function
  var fn = function(){
    
    // Url without leading slash
    var url = window.location.pathname.replace(/^\//, '');
    
    
    // Check whether we are in the correct page or not
    if (path.test(url) != negate) {
      
      callback.apply(null, url.match(path) ? url.match(path).slice(1) : []);
    }
  };
  
  
  // We want to execute it when the DOM is ready, but not before. So we need to
  // add the listener, but we also need to check if it was already triggered
  document.addEventListener('DOMContentLoaded', fn);
  
  // The DOM was lodaded already
  if (["interactive", "complete", "loaded"].indexOf(document.readyState) != -1) {
    fn();
  }
};
/* mousetrap v1.5.3 craig.is/killing/mice */
(function(C,r,g){function t(a,b,h){a.addEventListener?a.addEventListener(b,h,!1):a.attachEvent("on"+b,h)}function x(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return l[a.which]?l[a.which]:p[a.which]?p[a.which]:String.fromCharCode(a.which).toLowerCase()}function D(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function u(a){return"shift"==a||"ctrl"==a||"alt"==a||
"meta"==a}function y(a,b){var h,c,e,g=[];h=a;"+"===h?h=["+"]:(h=h.replace(/\+{2}/g,"+plus"),h=h.split("+"));for(e=0;e<h.length;++e)c=h[e],z[c]&&(c=z[c]),b&&"keypress"!=b&&A[c]&&(c=A[c],g.push("shift")),u(c)&&g.push(c);h=c;e=b;if(!e){if(!k){k={};for(var m in l)95<m&&112>m||l.hasOwnProperty(m)&&(k[l[m]]=m)}e=k[h]?"keydown":"keypress"}"keypress"==e&&g.length&&(e="keydown");return{key:c,modifiers:g,action:e}}function B(a,b){return null===a||a===r?!1:a===b?!0:B(a.parentNode,b)}function c(a){function b(a){a=
a||{};var b=!1,n;for(n in q)a[n]?b=!0:q[n]=0;b||(v=!1)}function h(a,b,n,f,c,h){var g,e,l=[],m=n.type;if(!d._callbacks[a])return[];"keyup"==m&&u(a)&&(b=[a]);for(g=0;g<d._callbacks[a].length;++g)if(e=d._callbacks[a][g],(f||!e.seq||q[e.seq]==e.level)&&m==e.action){var k;(k="keypress"==m&&!n.metaKey&&!n.ctrlKey)||(k=e.modifiers,k=b.sort().join(",")===k.sort().join(","));k&&(k=f&&e.seq==f&&e.level==h,(!f&&e.combo==c||k)&&d._callbacks[a].splice(g,1),l.push(e))}return l}function g(a,b,n,f){d.stopCallback(b,
b.target||b.srcElement,n,f)||!1!==a(b,n)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)}function e(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=x(a);b&&("keyup"==a.type&&w===b?w=!1:d.handleKey(b,D(a),a))}function l(a,c,n,f){function e(c){return function(){v=c;++q[a];clearTimeout(k);k=setTimeout(b,1E3)}}function h(c){g(n,c,a);"keyup"!==f&&(w=x(c));setTimeout(b,10)}for(var d=q[a]=0;d<c.length;++d){var p=d+1===c.length?h:e(f||
y(c[d+1]).action);m(c[d],p,f,a,d)}}function m(a,b,c,f,e){d._directMap[a+":"+c]=b;a=a.replace(/\s+/g," ");var g=a.split(" ");1<g.length?l(a,g,b,c):(c=y(a,c),d._callbacks[c.key]=d._callbacks[c.key]||[],h(c.key,c.modifiers,{type:c.action},f,a,e),d._callbacks[c.key][f?"unshift":"push"]({callback:b,modifiers:c.modifiers,action:c.action,seq:f,level:e,combo:a}))}var d=this;a=a||r;if(!(d instanceof c))return new c(a);d.target=a;d._callbacks={};d._directMap={};var q={},k,w=!1,p=!1,v=!1;d._handleKey=function(a,
c,e){var f=h(a,c,e),d;c={};var k=0,l=!1;for(d=0;d<f.length;++d)f[d].seq&&(k=Math.max(k,f[d].level));for(d=0;d<f.length;++d)f[d].seq?f[d].level==k&&(l=!0,c[f[d].seq]=1,g(f[d].callback,e,f[d].combo,f[d].seq)):l||g(f[d].callback,e,f[d].combo);f="keypress"==e.type&&p;e.type!=v||u(a)||f||b(c);p=l&&"keydown"==e.type};d._bindMultiple=function(a,b,c){for(var d=0;d<a.length;++d)m(a[d],b,c)};t(a,"keypress",e);t(a,"keydown",e);t(a,"keyup",e)}var l={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",
20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},p={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},A={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},z={option:"alt",command:"meta","return":"enter",
escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},k;for(g=1;20>g;++g)l[111+g]="f"+g;for(g=0;9>=g;++g)l[g+96]=g;c.prototype.bind=function(a,b,c){a=a instanceof Array?a:[a];this._bindMultiple.call(this,a,b,c);return this};c.prototype.unbind=function(a,b){return this.bind.call(this,a,function(){},b)};c.prototype.trigger=function(a,b){if(this._directMap[a+":"+b])this._directMap[a+":"+b]({},a);return this};c.prototype.reset=function(){this._callbacks={};this._directMap=
{};return this};c.prototype.stopCallback=function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")||B(b,this.target)?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable};c.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)};c.init=function(){var a=c(r),b;for(b in a)"_"!==b.charAt(0)&&(c[b]=function(b){return function(){return a[b].apply(a,arguments)}}(b))};c.init();C.Mousetrap=c;"undefined"!==typeof module&&module.exports&&(module.exports=
c);"function"===typeof define&&define.amd&&define(function(){return c})})(window,document);

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
  options.init.call(this);
  
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

u.prototype.wrap = function(el){
  this.each(function(node){
    node.parentNode.replaceChild(u('<p>').html(node.outerHTML).first(), node);
  });
};

u.prototype.content = function(){
  return this.join(function(node){
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
  var li = u(document.createElement('li')).attr({
    'title': element.title,
    'data-action': element.action
  }).addClass('action').on('click', function(e){
    e.preventDefault();
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
  editor.on("menu:add", function(e, data){
    menu.add(e.detail);
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
    e.preventDefault();
  });
  
  // On mousedown check whether or not we click on the menu
  u('body').on("click", function (e) {
    
    // Don't unselect text when clicking on the menu
    if (menu.element && menu.element.contains(e.currentTarget)) {
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
      
    u('br', this).remove();
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
    mousetrap.bind(data.shortcut, function(e){
      e.preventDefault();
      editor.trigger('shortcut', data.action);
    });
  });

  this.on("shortcut", function(e){
    editor.trigger('action:' + e.detail);
  });

  u(this.element).on("key", function(e){
    editor.trigger('refresh');
  });
};

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


// Mini template library
var template = function(selector, data, callback){

  if (!(this instanceof template)) {
    return new template(selector, data, callback);
    }

  this.selector = selector;
  this.data = data;
  this.callback = callback;

  var self = this;


  // Give flexibility to a selector/element
  function select(selector){
    return typeof selector == 'string' ?
      document.querySelector(selector) :
      selector;
  }

  // Parse the data using the template, data and callback into partial templates
  this.parse = function(){

    // Select the template from the content
    this.template = select(this.selector).content;

    // Make sure we're dealing with an array of things for mapping
    this.data = Array.isArray(this.data) ? this.data : [this.data];

    // Default callback is an empty function
    this.callback = this.callback || function(){};

    var self = this;

    return this.data.map(function(data, index){

      // Generate the template into fragment
      var fragment = self.template.cloneNode(true);
      self.callback.call(fragment, data, index);
      return fragment;
    });
  };

  // Allow to append the object
  this.appendTo = function(selector){

    // Find out the real selector
    var where = select(selector);

    // We need to fill the templates with the data first
    // Note: this is 100x faster than doing forEach() inside parse()
    self.parse().forEach(function(data, index){

      // Append it in the proper place
      where.appendChild(data);
    });

    return self;
  };

  // Replace the content of selector with the current elements
  this.into = function(selector) {

    // Delete the previous content
    select(selector).innerHTML = '';

    // And add the new one, reusing the appendTo()
    self.appendTo(selector);

    return self;
  };

  this.before = function(selector){

    var where = select(selector);
    self.parse().forEach(function(data, index){

      // Append it in the proper place
      where.parentNode.insertBefore(data, where);
    });
  };

  this.replace = function(selector){

    // Find out the real selector
    var where = select(selector);

    var parent = where.parentNode;

    // We need to fill the templates with the data first
    // Note: this is 100x faster than doing forEach() inside parse()
    self.parse().forEach(function(data, index){

      // Add it before the selected node
      parent.insertBefore(data, where);
    });

    // Delete the node
    where.remove();

    return self;
  };

  // Allow simple chaining with .array, .appendTo() or into()
  return this;
};

// Javascript

//modal("login").show("message");
//modal("permission").show();
var modal = function(type){
  return {
    show: function(message){
      if (message) {
        u("#" + type + " + * + * .message").html(message);
      }
      u("#" + type).first().checked = true;
      u("#" + type + " ~ * input").first().focus();
    },
    hide: function(){
      u("#" + type).first().checked = true;
    }
  };
};

u("form.login").ajax(function(data){
  if (data.error === false) {
    window.location.reload();
  }
  else {
    u("form.login p").html(data.error).addClass("message error");
  }
});

// Justify everything that has the class .sweet-justice
justify_my_love(document.querySelector(".sweet-justice"));

// Display the mathematics on the pagee
renderMathInElement(document.body);

// / internal
// "http://www.libre.university/" internal
// "http://github.com/libre/university" external
// /subject/V1LlrTSlmVl internal
// "http://atom.io/" external
// "https://pages.github.com/" external
u('a').each(function(link){
  if (!/(^\/.*|^https?\:\/\/[a-z]+\.libre\.university)/g.test(u(link).attr('href'))) {
    u(link).attr('target', '_blank');
  }
});


pagex(/^lesson/, function(id){

  // Initialize the editor in the element that is contenteditable
  var editor = new Editor("article.content", { menu: "editormenu", active: false });

  // Register a new action called "bold"
  editor.add("bold", {
    menu: "<strong>B</strong>", shortcut: "ctrl+b",
    action: function(editor){
      editor.command("bold");
    }
  });

  // Register a new action called "italic"
  editor.add("italic", {
    menu: "<em>i</em>", shortcut: "ctrl+i",
    action: function(editor){
      editor.command("italic");
    }
  });

  // Register a new action called "link"
  editor.add("link", {
    menu: "<i class='icon-link'></i>", shortcut: "ctrl+k",
    action: function(editor) {
      var link = editor.selection.element.getAttribute("href") || "";
      var address = prompt("Link address", link);
      editor.tag('a', (address ? { href: address } : false));
    }
  });

  // Add an option to add code
  editor.add("code", {
    menu: "<i class='icon-terminal'></i>", shortcut: "ctrl+`",
    action: function(editor) {
      editor.tag("code");
    }
  });

  editor.trigger('menu:separator');

  // Register a new action called "italic"
  editor.add('info', {
    menu: "<i class='icon-help'></i>",
    shortcut: "ctrl+?",
    action: function(){
      window.open("https://github.com/franciscop/modern-editor", "_blank");
    }
  });


  // Require authorization to execute callback
  function auth(number, callback){
    if (!user) {
      return modal("login").show("Tienes que ser un usuario de libreuniversity para editar esto");
    }
    if (!user.over(100)) {
      return modal("permission").show(100);
    }

    callback.call();
  }


  editor.add("edit", {
    shortcut: "ctrl+e",
    action: function(editor){
      auth(100, function(){
        u("form.lesson").addClass("edit").find('article').attr('contenteditable', true);
        editor.options.active = true;
      });
    }
  });

  editor.add("save", {
    shortcut: "ctrl+s",
    action: function(editor){
      var form = u("form.edit");
      var html = encodeURIComponent(form.find("article.content").html());
      ajax("POST", form.attr("action"), "content=" + html, function(err, data){

        u("form.lesson").removeClass("edit").find('article').attr('contenteditable', false);

        // Overwrite the current data in case anything has changed/cleaning
        u("article.content").html(data.html);

        // Deactivate the editor
        editor.options.active = false;
      });
    }
  });



  // Setup the drop listeners.
  u('body').on('drop', function(e) {
    console.log(e);
    var data = new FormData();
    data.append("image", e.dataTransfer.files[0]);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/lesson/upload', true);

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentComplete = (e.loaded / e.total) * 100;
        console.log(percentComplete + '% uploaded');
      }
    };
    xhr.onload = function() {
      if (this.status == 200) {
        console.log("Success");
        var res = JSON.parse(this.responseText);
        u('img').each(function(node){
          if (/^data\:/.test(u(node).attr('src'))) {
            u(node).attr({ src: res.image });
          }
        });
      };
    };
    xhr.send(data);

    // var files = e.dataTransfer.files; // FileList object.
    //
    // //files is a FileList of File objects. List some properties.
    // for (var i = 0, f; f = files[i]; i++) {
    //   console.log('"' + f.name + '" (' + (f.type || 'n/a') + ')');
    //   console.log(f.size + ' bytes');
    //   console.log('last modified: ' + (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'));
    // }
  });



  u("form.lesson").on("submit", function(e){
    e.preventDefault();
    editor.trigger('action:save');
  });

  u("button.edit").on('click', function(e){
    e.preventDefault();
    editor.trigger('action:edit');
  });

  if (u("form.lesson").hasClass("edit") && user && user.over(100)) {
    editor.trigger('action:edit');
  }
});

// SUBJECT page
// action: { add, form: { save, remove, edit, cancel }}
// Non capturing group (http://stackoverflow.com/a/3513858/938236)
pagex(/^(?:subject)?/, function(bla){
  
  var action = {};
  
  // Functions for the subject
  action.add = function(e){
    e.preventDefault();

    if(!user) {
      return modal('login').show('Tienes que ser un usuario de Libre University para editar esto');
    }

    if(!user.over(1000)) {
      return modal('permission').show(1000);
    }

    template('template.add', {}, action.form).before('section.add');
    u(u('.preview.add').nodes.pop()).closest('form').find('input').first().focus();
  };

  // Add the handlers for the subject form (add or edit)
  action.form = function(){

    // Ajaxify the form to save it without reloading
    u('form', this).ajax(action.form.save);

    // Add the class dynamically
    u('form', this).addClass('add');

    // Give handle for canceling adding a new subject
    u('.cancel', this).on('click', action.form.remove);
  };

  // Action to perform once the subject is saved
  action.form.save = function(subject){
    window.location.reload();
  };

  // Cancel adding the template form
  action.form.remove = function(e){
    e.preventDefault();
    u(this).closest('form').remove();
  };

  // When editing one form
  action.form.edit = function(e){
    e.preventDefault();

    if(!user) {
      return modal('login').show('Tienes que ser un usuario de Libre University para editar esto');
    }

    if(!user.over(500)) {
      return modal('permission').show(500);
    }

    u(this).closest('form').addClass('edit');
    u(this).closest('form').find('input').first().focus();
  };

  action.form.cancel = function(){
    u(this).closest('form').removeClass('edit');
  };


  // IMPLEMENTATION
  // Add a new subject or lesson
  u('button.add').on('click', action.add);

  // When we save a lesson that we were editing
  u('form.preview').ajax(action.form.save);

  // Edit a particular lesson
  u('form.preview .edit').on('click', action.form.edit);

  // Cancel the edition of a particular lesson
  u('form.preview .cancel').on('click', action.form.cancel);
});

// TEST page

//
pagex(/^test/, function(){

  // Attach actions to the new lesson template
  // These are different enough than editing to have a new function
  function testactions(){
    
    // Submit (save) the new lesson through ajax
    u('form.test', this).ajax(function(lesson){
      window.location.reload();
    });

    // Cancel the new lesson
    u('.cancel', this).on('click', function(e){
      window.location.reload();
    });
  }

  var actions = {};
  actions.add = function(){
    template('template.add', {}, testactions).replace('form.test');
    u('form.test textarea').first().focus();
  };

  // Reset forms on load (or refresh page)
  u('form.test').each(function(){ this.reset(); });
  
  u('.add').on('click', actions.add);
  
  u('.edit').on('click', function(){
    u('form.test').addClass('edit');
    u(this).closest('form').find('input').first().focus();
  });
  
  u('[data-good]').on('change', function(){
    var number = 3;
    var countDown = function(){
      if (number > 0) {
        u('.refresh').html('Next in ' + number);
        setTimeout(countDown, 1000);
        number--;
      } else {
        window.location.reload();
      }
    };
    countDown();
  });
  
  u('.answer label').on('click', function(){
    u('.refresh').html('New question');
  });
  
  u('.refresh').on('click', function(e){
    e.preventDefault();
    window.location.reload();
  });
  
  if (u('form.test').nodes.length === 0) {
    template('template.add', {}, testactions).before('template.add');
    u('form.test textarea').first().focus();
  }
});
