import express from 'express';
import { promises as fs } from 'fs';

const { writeFile, readFile } = fs;
const router = express.Router();

global.fileName = 'accounts.json';

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null)
      throw new Error('Name e Balance são obrigatórios');

    const data = JSON.parse(await readFile(global.fileName));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);

    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(account)}`
    );
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);

    logger.info(`${req.method} ${req.originalUrl}`);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );

    if (!account) res.status(404).end();

    res.send(account);

    logger.info(`${req.method} ${req.originalUrl} - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();

    logger.info(`${req.method} ${req.originalUrl} - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.id || !account.name || !account.balance == null)
      throw new Error('Id, Name e Balance são obrigatórios');

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1)
      throw new Error(`Registro não encontrado pelo id: ${account.id}`);

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(account, null, 2)}`
    );
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('Id e Balance são obrigatórios');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1)
      throw new Error(`Registro não encontrado pelo id: ${account.id}`);

    data.accounts[index].balance = account.balance;
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);

    logger.info(
      `${req.method} ${req.originalUrl} - ${JSON.stringify(
        data.accounts[index],
        null,
        2
      )}`
    );
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
