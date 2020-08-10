import express from 'express';
import gradesRouter from './routes/grades.js';
import statsRouter from './routes/stats.js';

const app = express();
app.use(express.json());
global.fileName = 'grades.json';

app.use('/grades', gradesRouter);
app.use('/stats', statsRouter);

app.listen(3000, () => {
  console.log('App started!');
});
