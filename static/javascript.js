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
