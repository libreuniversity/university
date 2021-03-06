
pagex(/^\/lesson/, function(id){

  try {
    renderMathInElement(document.body, { delimiters: [
      { left: "$$", right: "$$", display: true  },
      { left: '\\(', right: '\\)', display: false }
    ]});
  } catch (e) {
    console.log("Katex failed:", e);
  }

  var ready = false;
  var loaded = false;

  var startEdition = function(){
    auth().then(function(){

      u('code[class*="language-"]').each(function(snippet){
        snippet.textContent = snippet.textContent;
      });

      u("form.lesson").addClass("edit").find('article').attr('contenteditable', true);

      u('.katex').parent().each(function(node){
        u(node).html('\\(' + u(node).find('annotation').html() + '\\)').addClass('math-tex');
      });


      if (!loaded) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '/ckeditor/ckeditor.js';
        script.onload = function(e) {
          loaded = true;
          CKEDITOR.on('instanceReady', function(){
            ready = true;
          });
        }
        u("body").append(script);
      } else {
        CKEDITOR.inline('editor');
      }
    });
  }

  function saveContent(time){
    if (!ready) return setTimeout(function(){ saveContent(100); }, time * 2);

    function init(html){
      u("form.lesson").removeClass("edit").find('article').attr('contenteditable', false);
      CKEDITOR.instances.editor.destroy();

      // Overwrite the current data in case anything has changed/cleaning
      u("article.content").html(html);

      try {
        renderMathInElement(document.body, { delimiters: [
          { left: "$$", right: "$$", display: true  },
          { left: '\\(', right: '\\)', display: false }
        ]});
      } catch (e) {
        console.log("Katex failed:", e);
      }

      try {
        Prism.highlightAll();
      } catch (e) {
        console.log("Prism failed:", e);
      }
    }

    var html = encodeURIComponent(CKEDITOR.instances.editor.getData().replace(/\n/g, '<br>'));
    ajax(u('form.lesson').attr("action"), {
      method: "POST", body: "content=" + html
    }, function(err, data){
      init(data ? data.html : html);
    });
  }

  u("button.edit").handle('click', function(){
    startEdition();
  });
  Mousetrap.bind('mod+e', function(e) {
    e.preventDefault();
    startEdition();
  });

  u("button.save").handle('click', function(){
    saveContent();
  });
  Mousetrap.bind(['mod+s'], function(e) {
    e.preventDefault();
    saveContent(100);
  });





  // // Initialize the editor in the element that is contenteditable
  // var editor = new Editor("article.content", { menu: "editormenu", active: false });
  //
  // editor.add("type", {
  //   menu: {
  //     html:'<select name="type">\
  //             <option value="p">Paragraph</option>\
  //             <option value="h1">H1</option>\
  //             <option value="h2">H2</option>\
  //             <option value="code">code</option>\
  //             <option value="math">math</option>\
  //           </select>',
  //     defaults: true
  //   },
  //   init: function(editor){
  //     editor.on('clean', function(e, node){
  //
  //       // Lonely <code> are wrapped in <pre>
  //       var bare = u(editor.element).children('code').wrap('<pre>');
  //       var nopre = u(editor.element).children().children('code').parent(function(node){
  //         return !u(node).is('pre');
  //       });
  //
  //       nopre.filter(function(node){
  //         return u(node).text() === u(node).children().text();
  //       }).wrap('<pre>').html(nopre.html());
  //     });
  //   },
  //   action: function (editor) {
  //     u('[name="type"]').not('.listened').addClass('listened').on('change', function(e){
  //
  //       if (e.target.value === 'math') {
  //         var equationblock = createEquation(editor.selection.text);
  //         u(editor.selection.element).html('').append(equationblock);
  //         return;
  //       } else {
  //         u(editor.selection.element).closest('.equation').each(function(eq){
  //           u(eq).closest('p').html(u(eq).data('latex'));
  //         });
  //       }
  //
  //       editor.tag(e.target.value);
  //     });
  //   }
  // });
  //
  // editor.trigger('menu:separator');
  //
  // // Register a new action called "bold"
  // editor.add("bold", {
  //   menu: "<strong>B</strong>", shortcut: "ctrl+b",
  //   action: function(editor){
  //     editor.command("bold");
  //   }
  // });
  //
  // // Register a new action called "italic"
  // editor.add("italic", {
  //   menu: "<em>i</em>", shortcut: "ctrl+i",
  //   action: function(editor){
  //     editor.command("italic");
  //   }
  // });
  //
  // // Register a new action called "link"
  // editor.add("link", {
  //   menu: "<i class='icon-link'></i>", shortcut: "ctrl+k",
  //   action: function(editor) {
  //     var link = editor.selection.element.getAttribute("href") || "";
  //     var address = prompt("Link address", link);
  //     editor.tag('a', (address ? { href: address } : false));
  //   }
  // });
  //
  // // Add an option to add code
  // editor.add("code", {
  //   menu: "<i class='icon-terminal'></i>", shortcut: "ctrl+`",
  //   action: function(editor) {
  //     editor.tag("code");
  //   }
  // });
  //
  // editor.trigger('menu:separator');
  //
  // // Register a new action called "italic"
  // editor.add('info', {
  //   menu: "<i class='icon-help'></i>",
  //   shortcut: "ctrl+?",
  //   action: function(){
  //     window.open("https://github.com/franciscop/modern-editor", "_blank");
  //   }
  // });


  // // Require authorization to execute callback
  // function auth(number, callback){
  //   if (!user) {
  //     return login();
  //   }
  //   // if (!user.over(100)) {
  //   //   return modal("permission").show(100);
  //   // }
  //
  //   callback.call();
  // }
  //
  //
  // function createEquation(latex){
  //   if (!latex) latex = '';
  //   var rendered = katex.renderToString(latex);
  //   return u('<div class="equation flex two">')
  //     .data('latex', latex)
  //     .append('<pre><code>' + latex)
  //     .append('<div class="live"><div class="visual">' + rendered + '</div></div>');
  // }
  //
  //
  // editor.add("edit", {
  //   shortcut: "ctrl+e",
  //   init: function (editor) {
  //     editor.on('clean', function () {
  //       if (!editor.options.active) return false;
  //       // u('.katex').find('annotation').each(function(equation){
  //       //   var eq = u(equation).html();
  //       //   u(equation).closest('.katex').parent().html('@@' + eq + '@@');
  //       // });
  //       //
  //       // u('.katex').find('.equation').each(function(equation){
  //       //   var eq = u(equation).html();
  //       //   u(equation).closest('.katex').parent().html('@@' + eq + '@@');
  //       // });
  //
  //       // u(editor.element).find('.equation').each(function(equation){
  //       //   var latex = u(equation).find('pre').text();
  //       //   if (latex !== u(equation).data('latex')) {
  //       //     u(equation).data('latex', latex);
  //       //     var rendered = katex.renderToString(latex);
  //       //     u(equation).find('.visual').html(rendered);
  //       //   }
  //       // });
  //     });
  //   },
  //   action: function(editor){
  //     auth(100, function(){
  //       u("form.lesson").addClass("edit").find('article').attr('contenteditable', true);
  //
  //       u('.katex').find('annotation').each(function(equation){
  //         var eq = u(equation).html();
  //         u(equation).closest('.katex-display').parent().html('$$' + eq + '$$');
  //       });
  //
  //       u('.katex').find('annotation').each(function(equation){
  //         var eq = u(equation).html();
  //         u(equation).closest('.katex').parent().html('@@' + eq + '@@');
  //       });
  //
  //       // u('pre', editor.element).each(function(pre){
  //       //   var clean = u(pre).html().replace(/\<br[\s\\]*>/g, '\n');
  //       //   u('<pre>').html(clean).text();
  //       //   u(pre).html('<code>' + u('<pre>').html(clean).text() + '</code>');
  //       // });
  //
  //       editor.options.active = true;
  //     });
  //   }
  // });
  //
  // editor.add("save", {
  //   shortcut: "ctrl+s",
  //   action: function(editor){
  //     var form = u("form.edit");
  //
  //     u(editor.element).find('pre').each(function(pre){
  //       var inner = u(u(pre).children('code').first() || u(pre).first());
  //       var clean = inner.html().replace(/\<br[\s\\]*>/g, '\n').replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>').replace(/\&amp\;/g, '&');
  //       console.log(u('<pre>').text(clean).text(), inner.html());
  //       if (!u(pre).children()) u(pre).html('<code></code>');
  //       u(pre).find('code').text(clean);
  //     });
  //
  //     u(editor.element).find('.equation').each(function(equation){
  //       var latex = u(equation).data('latex');
  //       u(equation).parent().html('').append('$$' + latex + '$$');
  //     });
  //
  //     var html = encodeURIComponent(form.find("article.content").html());
  //     ajax(form.attr("action"), { method: "POST", body: "content=" + html }, function(err, data){
  //
  //       u("form.lesson").removeClass("edit").find('article').attr('contenteditable', false);
  //
  //       // Overwrite the current data in case anything has changed/cleaning
  //       u("article.content").html(data ? data.html : html);
  //
  //       try {
  //         renderMathInElement(document.body, { delimiters: [
  //           { left: "$$", right: "$$", display: true  },
  //           { left: '@@', right: '@@', display: false }
  //         ]});
  //       } catch (e) {
  //         console.log("Katex failed:", e);
  //       }
  //
  //       // try {
  //       //   Prism.highlightAll();
  //       // } catch (e) {
  //       //   console.log("Prism failed:", e);
  //       // }
  //
  //       // Deactivate the editor
  //       editor.options.active = false;
  //     });
  //   }
  // });
  //
  //
  //
  // // Setup the drop listeners.
  // u('body').on('drop', function(e) {
  //   console.log(e);
  //   var data = new FormData();
  //   data.append("image", e.dataTransfer.files[0]);
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', '/lesson/upload', true);
  //
  //   xhr.upload.onprogress = function(e) {
  //     if (e.lengthComputable) {
  //       var percentComplete = (e.loaded / e.total) * 100;
  //       console.log(percentComplete + '% uploaded');
  //     }
  //   };
  //   xhr.onload = function() {
  //     if (this.status == 200) {
  //       console.log("Success");
  //       var res = JSON.parse(this.responseText);
  //       u('img').each(function(node){
  //         if (/^data\:/.test(u(node).attr('src'))) {
  //           u(node).attr({ src: res.image });
  //         }
  //       });
  //     };
  //   };
  //   xhr.send(data);
  //
  //   // var files = e.dataTransfer.files; // FileList object.
  //   //
  //   // //files is a FileList of File objects. List some properties.
  //   // for (var i = 0, f; f = files[i]; i++) {
  //   //   console.log('"' + f.name + '" (' + (f.type || 'n/a') + ')');
  //   //   console.log(f.size + ' bytes');
  //   //   console.log('last modified: ' + (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'));
  //   // }
  // });
  //
  //
  //
  // u("form.lesson").on("submit", function(e){
  //   e.preventDefault();
  //   editor.trigger('action:save');
  // });
  //

  // if (u("form.lesson").hasClass("edit") && user) {
  //   editor.trigger('action:edit');
  // }






  // Supermenu
  var parts = window.location.pathname.replace(/^\//, '').split('/');
  if (['records', 'history'].includes(parts[1])) {
    return;
  }
  u('article h2').each(function(node){
    u(node).attr('id', u(node).html().replace(/\W/g, '-'));
  });
  var lessonName = u('h1').html();
  var main = '<a href="#" class="pseudo button"><strong>' + lessonName + '</strong></a>';
  u('nav .menu').html(main).append(function(node, i){
    var id = u(node).attr('id');
    var html = u(node).html();
    return '<a href="#' + id + '" class="pseudo button">' + (i+1) + '. ' + html + '</a>';
  }, u('article').find('h2, h3'));

  u('.menu').on('click', 'a', function(e){
    u('#responsive-menu').first().checked = false;
    u('body').removeClass('no-scroll');

    if (smoothscroll) {
      e.preventDefault();
      var to = u(u(e.currentTarget).attr('href'));
      if (to.length) {
        to.scroll();
      }
    }
  });


  function shouldScrollOrNot(){
    u('body').toggleClass('no-scroll', u('#responsive-menu').first().checked);
  }
  u('#responsive-menu').on('change', shouldScrollOrNot);
  shouldScrollOrNot();


  // Change the title of the section
  var pagesize = u('body').size().height / 2;
  function setupSection () {
    var current = u('article h2').filter(function(node){
      return u(node).size().top < pagesize;
    }).last();
    var section = u(current).html() || u('h1').html();
    if (u('h1').size().top > 0 && u('h1').size().top < pagesize) {
      section = u('h1').html();
      hash = u(current).attr('id');
    }
    u('nav header').html(section);
  }
  u(document).on('scroll', setupSection);
  setupSection();
});
