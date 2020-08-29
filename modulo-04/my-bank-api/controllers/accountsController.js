import { db } from '../index.js';

const TARIFA = 1.0;
const TARIFA_TRANSF = 8.0;
const AGENCIA_VIP = 99;

const Accounts = db.accounts;

const deposit = async (req, res) => {
  const { agencia, conta, valor } = req.body;
  try {
    const account = await findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });

    const newBalance = account.balance + valor;

    await Accounts.updateOne(
      {
        $and: [{ agencia: agencia }, { conta: conta }],
      },
      { balance: newBalance }
    );

    res.send(`${newBalance}`);
  } catch (err) {
    res.send(err.message);
  }
};

const withdraw = async (req, res) => {
  const { agencia, conta, valor } = req.body;
  try {
    const account = await findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });

    if (account.balance - valor - TARIFA < 0)
      throw new Error(`Saldo insuficiente para completar operação`);

    const newBalance = account.balance - valor - TARIFA;

    await Accounts.updateOne(
      {
        $and: [{ agencia: agencia }, { conta: conta }],
      },
      { balance: newBalance }
    );

    res.send(`${newBalance}`);
  } catch (err) {
    res.send(err.message);
  }
};

const getBalance = async (req, res) => {
  const { agencia, conta } = req.query;
  try {
    const account = await findOne({
      $and: [{ agencia: agencia }, { conta: conta }],
    });

    return res.send(`${account.balance}`);
  } catch (err) {
    res.send(err.message);
  }
};

const remove = async (req, res) => {
  console.log('scscs');
  const { agencia, conta } = req.query;
  try {
    await Accounts.remove({
      $and: [{ agencia: agencia }, { conta: conta }],
    });

    const accounts = await Accounts.find({ agencia: agencia });
    res.send(`${accounts.length}`);
  } catch (err) {
    res.send(err.message);
  }
};

const transfer = async (req, res) => {
  const { contaOrigem, contaDestino, valor } = req.body;
  try {
    const ccOrigem = await findOne({ conta: contaOrigem });
    const ccDestino = await findOne({ conta: contaDestino });

    if (ccOrigem.agencia != ccDestino.agencia)
      ccOrigem.balance -= TARIFA_TRANSF;

    const newBalanceOrigem = Number(ccOrigem.balance) - Number(valor);
    const newBalanceDestino = Number(ccDestino.balance) + Number(valor);

    if (newBalanceOrigem < 0) throw new Error('Saldo insuficiente');

    await Accounts.updateOne(
      { conta: ccOrigem.conta },
      { balance: newBalanceOrigem }
    );

    await Accounts.updateOne(
      { conta: ccDestino.conta },
      { balance: newBalanceDestino }
    );

    res.send(`${newBalanceOrigem}`);
  } catch (err) {
    res.send(err.message);
  }
};

const getAverage = async (req, res) => {
  const { agencia } = req.query;
  try {
    const accounts = await Accounts.find({ agencia: agencia });

    const average =
      accounts.reduce((acc, account) => acc + account.balance, 0) /
      accounts.length;
    res.send(`${average}`);
  } catch (err) {
    res.send(err.message);
  }
};

const getLowestBalance = async (req, res) => {
  const { qtd } = req.query;
  try {
    const accounts = await Accounts.find().sort({
      balance: 1,
    });

    const accountsDto = accounts
      .map(({ agencia, conta, balance, name }) => {
        return { agencia, conta, balance, name };
      })
      .splice(0, qtd);
    res.send(accountsDto);
  } catch (err) {
    res.send(err.message);
  }
};

const getHighestBalance = async (req, res) => {
  const { qtd } = req.query;
  try {
    const accounts = await Accounts.find().sort({
      balance: -1,
      nome: 1,
    });

    const accountsDto = accounts
      .map(({ agencia, conta, balance, name }) => {
        return { agencia, conta, balance, name };
      })
      .splice(0, qtd);
    // retornar contas com maiores saldos em ordem decrescente pelo saldo, crescente pelo nome {agencia, conta, saldo}
    res.send(accountsDto);
  } catch (err) {
    res.send(err.message);
  }
};

const highestBalanceToPrivate = async (_, res) => {
  try {
    const accounts = await Accounts.find().sort({ balance: 1 });

    const topAccountsByAgencia = [
      ...new Map(
        accounts.map(({ _id, name, agencia, conta, balance }) => [
          agencia,
          {
            _id: _id,
            nome: name,
            agencia: AGENCIA_VIP,
            conta: conta,
            balance: balance,
          },
        ])
      ).values(),
    ];

    topAccountsByAgencia.forEach(async ({ _id, agencia }) => {
      await Accounts.updateOne({ _id: _id }, { agencia: agencia });
    });

    const allTopAccounts = await Accounts.find({ agencia: AGENCIA_VIP });
    res.send(allTopAccounts);
    // retornar lista da agencia 99 {agencia, conta, saldo}
  } catch (err) {
    res.send(err.message);
  }
};

const findOne = async (query) => {
  const account = await Accounts.findOne(query);
  if (!account) throw new Error(`Não foi possível encontrar account`);
  return account;
};

export default {
  deposit,
  withdraw,
  getBalance,
  remove,
  transfer,
  getAverage,
  getLowestBalance,
  getHighestBalance,
  highestBalanceToPrivate,
};
