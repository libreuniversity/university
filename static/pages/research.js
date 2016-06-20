pagex(/^research/, function () {

  // Functions for the subject
  this.exports.add = function () {
    if (!user) return this.needUser();
    u('#addpaper').first().checked = true;
    u('[name="title"]').first().focus();
  };

  this.exports.create = function (e) {
    if (!user) return this.needUser();
    ajax('/research', { method: 'POST', body: u(e.target).serialize() }, this.saved);
  }

  this.exports.saved = function(){
    alert('Done!');
  }

  this.exports.needUser = function () {
    modal('login').show('You should be logged in to add this');
  }
});
