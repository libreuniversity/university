let moment = require('moment');

module.exports = records => {
  if (!records.length) {
    throw new Error("No lesson found");
  }
  return records.map((record, i) => {
    let rec = {
      id: record.id,
      lesson: record.lesson,
      title: record.title,
      user: record.user,
      timestamp: moment(record.timestamp).fromNow()
    };
    if (i < records.length - 1 && records[i + 1].content) {
      change = record.content.length - records[i + 1].content.length;
    } else {
      change = record.content ? record.content.length : 0;
    }
    if (change >= 0) {
      rec.change = '<span class="change positive">+ ' + change + '</span>';
    } else {
      rec.change = '<span class="change negative">- ' + Math.abs(change) + '</span>';
    }
    return rec;
  });
}
