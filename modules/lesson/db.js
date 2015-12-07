

// Database operations to use in waterfall
var ops = {};

ops.findById = function(id, callback){
  if (!id) return callback(new Error('No lesson id specified'));
  model.mongo().findOne({ id: id }, callback);
};

ops.findSubject = function (lesson, callback){
  if (!lesson) return callback(new Error('Lesson not found'));
  subject.mongo().findOne({ lessons: lesson._id }, function(err, subject){
    if (err) return callback(err);
    if (!subject) return callback(new Error('No subject found'));
    callback(null, lesson, subject);
  });
};

ops.joinSubject = function(lesson, subject, callback){
  lesson = only(
    extend(lesson, { subject: subject.id }), 'id subject title summary content'
  );
  callback(null, lesson);
};

ops.checkPreviewData = function(content, callback) {
  if (!content) return callback(new Error('No data submitted'));
  if (!content.id) return callback(new Error('No subject provided'));
  callback(null, content);
};

ops.add = function(content, callback){
  var mongo = model.mongo();
  var article = new mongo(only(content, 'title summary'));
  
  // Add the article to the callback
  article.save(function(err){
    callback(err, content.id, article);
  });
};

ops.addToSubject = function(subjectId, lesson, callback) {
  subject.addLesson(subjectId, lesson._id, function(err, subject){
    callback(err, lesson, subject);
  });
};

module.exports = ops;