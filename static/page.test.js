// TEST page

//
page('/test', function(){

  // Attach actions to the new lesson template
  // These are different enough than editing to have a new function
  function testactions(){
    
    // Submit (save) the new lesson through ajax
    u('form.test', this).ajax(function(lesson){
      window.location.reload();
    });

    // Cancel the new lesson
    u('.cancel', this).click(function(e){
      window.location.reload();
    });
  }

  var actions = {};
  actions.add = function(){
    template('template.add', {}, testactions).replace('form.test');
  };

  // Reset forms on load (or refresh page)
  u('form.test').each(function(){ this.reset(); });
  
  u('.add').click(actions.add);
  
  u('.edit').click(function(){
    u('form.test').addClass('edit');
  });
  
  u('.refresh').click(function(){
    console.log("Refreshed");
    window.location.reload();
  });
  
  if (u('form.test').nodes.length === 0) {
    template('template.add', {}, testactions).before('template.add');
  }
});
