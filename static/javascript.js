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

u("form.login").ajax(function(err, data){
  if (data.error === false) {
    window.location.reload();
  }
  else {
    u("form.login p").html(data.error).addClass("message error");
  }
});

// Display the mathematics on the pagee
try {
  renderMathInElement(document.body, { delimiters: [
    { left: "$$", right: "$$", display: true  },
    { left: '@@', right: '@@', display: false }
  ]});
} catch (e) {
  console.log(e);
}

// Justify everything that has the class .sweet-justice
//justify_my_love(document.querySelector(".sweet-justice"));

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


// How to trigger each of the actions
pagex.after(function(actions){
  u('body').on('click', '[data-click]', function(e){
    e.preventDefault();
    // Pass `action` to keep the `this.[actionname]` inside the actions
    var clickable = actions[u(e.target).data('click')];
    if (clickable)
      clickable.apply(actions, arguments);
  });
  u('body').on('submit', '[data-submit]', function(e){
    e.preventDefault();
    // Pass `action` to keep the `this.[actionname]` inside the actions
    var clickable = actions[u(e.target).data('submit')];
    if (clickable)
      clickable.apply(actions, arguments);
  });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61474373-1', 'auto');
ga('send', 'pageview');
