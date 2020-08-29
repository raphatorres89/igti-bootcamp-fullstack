import mongoose from 'mongoose';
import { accountsModel } from './models/accountsModel.js';

const db = {};

db.url = 'mongodb://localhost/my-bank-api?retryWrites=true&w=majority';
db.mongoose = mongoose;
db.accounts = accountsModel;

export { db };
