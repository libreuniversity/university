// TEST page

//
pagex(/^\/test/, function(){

  var actions = {};

  // Attach actions to the new lesson template
  // These are different enough than editing to have a new function
  actions.template = function(){

    // Submit (save) the new lesson through ajax
    u('form.test', this).ajax(function(err, data){
      window.location.reload();
    });

    // Cancel the new lesson
    u('.cancel', this).on('click', function(e){
      window.location.reload();
    });
  }

  actions.add = function(){
    template('template.add', {}, actions.template).replace('form.test');
    u('form.test textarea').first().focus();
  };

  actions.edit = function(){
    u('form.test').addClass('edit').ajax(function(){
      window.location.reload();
    }).first().focus();
  };

  actions.correctAnswer = function(){
    var number = 3;
    var countDown = function(){
      if (u('[data-good]:checked').length == 0) return false;
      if (number > 0) {
        u('.refresh').html('Next in ' + number);
        setTimeout(countDown, 1000);
        number--;
      } else {
        window.location.reload();
      }
    };
    countDown();
  };




  // Reset forms on load (or refresh page)
  u('form.test').each(function(node){ node.reset(); });

  u('.add').on('click', actions.add);

  u('.edit').on('click', actions.edit);

  u('.cancel').on('click', function(){
    window.location.reload();
  });

  u('[data-good]').on('change', actions.correctAnswer);

  u('.answer label').on('click', function(){
    u('.refresh').html('New question');
  });

  u('.refresh').on('click', function(e){
    e.preventDefault();
    window.location.reload();
  });

  if (u('form.test').nodes.length === 0) {
    template('template.add', {}, actions.template).before('template.add');
    u('form.test textarea').first().focus();
  }
});
