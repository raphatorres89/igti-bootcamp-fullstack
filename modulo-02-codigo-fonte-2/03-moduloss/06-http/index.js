import http from 'http';

// npm install nodemon
// nodemon index.js para executar

http
  .createServer((req, res) => {
    if (req.method === 'GET') {
      res.write('Hello World!');
      res.statusCode = 200;
      res.end();
    } else {
    }
  })
  .listen(8080);
