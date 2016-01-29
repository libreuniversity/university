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
    u('.cancel', this).click(function(e){
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
  
  u('.add').click(actions.add);
  
  u('.edit').click(function(){
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
  
  u('.refresh').click(function(e){
    e.preventDefault();
    window.location.reload();
  });
  
  if (u('form.test').nodes.length === 0) {
    template('template.add', {}, testactions).before('template.add');
    u('form.test textarea').first().focus();
  }
});
