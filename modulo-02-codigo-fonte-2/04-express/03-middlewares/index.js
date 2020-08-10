import express from 'express';
import carrosRouter from './carrosRouter.js';

const app = express();
app.use(express.json());

// tudo que chegar com /carros será direcionado para o carrosRouter
app.use('/carros', carrosRouter);

// forma de chamar uma função antes das requisições
// aqui por exemplo, printa o log com a data antes de direcionar pra chamada
app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.get('/teste', (req, res) => {
  res.end();
});

app.listen(3000);
