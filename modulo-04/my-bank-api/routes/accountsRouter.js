import express from 'express';
import accountsController from '../controllers/accountsController.js';

const router = express.Router();

router.post('/deposit', accountsController.deposit);

router.post('/withdraw', accountsController.withdraw);

router.get('/balance', accountsController.getBalance);

router.delete('/', accountsController.remove);

router.post('/transfer', accountsController.transfer);

router.get('/average', accountsController.getAverage);

router.get('/lowest-balance', accountsController.getLowestBalance);

router.get('/highest-balance', accountsController.getHighestBalance);

router.post(
  '/highest-balance/to-private',
  accountsController.highestBalanceToPrivate
);

export { router as accountsRouter };
