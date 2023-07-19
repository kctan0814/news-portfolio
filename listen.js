const app = require('./app/app');
const { PORT = 9090 } = process.env;

app.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on ${PORT}...`);
});