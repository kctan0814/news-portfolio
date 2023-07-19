exports.formatComment = (id, comment) => {
  const currDate = new Date();
  return [comment.username, comment.body, currDate, id]
}