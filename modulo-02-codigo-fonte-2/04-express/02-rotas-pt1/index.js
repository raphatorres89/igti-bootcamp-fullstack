import express from 'express';

const app = express();
// define json nas requests
app.use(express.json());

// app.all aceita todos os métodos http, GET, POST, PUT, DELETE, PATCH
app.all('/testAll', (req, res) => {
  res.send(req.method);
});

// o sinal ? aceita requests de /test e /teste
app.get('/teste?', (_, res) => {
  res.send('/teste?');
});

// o sinal + aceita quantos caracteres quiser da ultima letra... /buzzzzzz
app.get('/buzz+', (_, res) => {
  res.send('/buzz+');
});

// o sinal * aceita qualquer coisa entre as duas palavras
app.get('/one*Blue', (_, res) => {
  res.send('/one*Blue');
});

// forma de pegar o body
app.post('/test(ing)?', (req, res) => {
  console.log(req.body);
  res.send('/test(ing)?');
});

// forma de usar regex
app.get(/.*Red$/, (req, res) => {
  res.send('/.*Red$/');
});

// forma de pegar os parametros
app.get('/testParam/:id', (req, res) => {
  res.send(req.params.id);
});

// forma de pegar os parametros via query
app.get('/testQuery', (req, res) => {
  res.send(req.query);
});

// forma de utilizar o next
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('Callback 1');
    next();
  },
  (req, res) => {
    console.log('Callback 2');
    res.send('2 chamadas foram feitas');
  }
);

// forma de utilizar o next com array
const callback1 = (req, res, next) => {
  console.log('Callback 1');
  next();
};

const callback2 = (req, res, next) => {
  console.log('Callback 2');
  next();
};

const callback3 = (req, res) => {
  console.log('Callback 3');
  res.send('Chamou 3 callbacks em array');
};

app.get('/testMultipleHandlersArray', [callback1, callback2, callback3]);

// routes
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('Recebi um GET');
  })
  .post((req, res) => {
    res.send('Recebi um POST');
  })
  .delete((req, res) => {
    res.send('Recebi um DELETE');
  })
  .put((req, res) => {
    res.send('Recebi um PUT');
  })
  .patch((req, res) => {
    res.send('Recebi um PATCH');
  });

app.listen(3000, () => {
  console.log('App subiu');
});
