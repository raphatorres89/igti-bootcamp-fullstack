import express from 'express';

const app = express();
app.use(express.json());

// simulando um erro não tratado
app.get('/', (req, res) => {
  throw new Error('erro simulado');
});

// simulando erro com async
app.post('/', async (req, res, next) => {
  try {
    throw new Error('erro simulado com async');
  } catch (err) {
    next(err);
  }
});

// dar throw no erro
app.use((err, req, res, next) => {
  console.log('Erro geral');
  console.log('Erro 1');
  // throws aqui
  next(err);
});

// capturar erro não capturado
app.use((err, req, res, next) => {
  console.log('Erro geral');
  // alterar o status e enviar uma mensagem
  res.status(500).send('Erro geral');
});

app.listen(3000, () => {
  console.log('API Iniciada');
});
