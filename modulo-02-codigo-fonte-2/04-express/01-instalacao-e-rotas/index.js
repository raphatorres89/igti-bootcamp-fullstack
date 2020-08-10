import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Hello World com post');
});

app.listen(3000, () => {
  console.log('App subiu');
});
