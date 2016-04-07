
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
      ajax(form.attr("action"), { method: "POST", body: "content=" + html }, function(err, data){

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
