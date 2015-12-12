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

page(/^lesson/, function(){
  
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
      ajax(form.attr("action"), "content=" + html, function(data){
        u("form.lesson").removeClass("edit").find('article').attr('contenteditable', false);
        // Overwrite the current data in case anything has changed/cleaning
        u("article.content").html(data.html);
        // Deactivate the editor
        editor.options.active = false;
      });
    }
  });
  
  
  
  u("form.lesson").on("submit", function(e){
    e.preventDefault();
    editor.trigger('action:save');
  });
  
  u("button.edit").click(editor.trigger.bind(false, 'action:edit'));

  if (u("form.lesson").hasClass("edit") && user && user.over(100)) {
    editor.trigger('action:edit');
  }
});
