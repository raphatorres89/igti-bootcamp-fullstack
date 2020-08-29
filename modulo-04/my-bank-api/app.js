import express from 'express';
import { accountsRouter } from './routes/accountsRouter.js';

import { db } from './index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.log(`Erro ao conectar no MongoDB: ${err}`);
  }
})();

const app = express();

app.use(express.json());
app.use('/accounts', accountsRouter);

app.listen(3000, () => {
  console.log('Server on http://localhost:3000');
});
