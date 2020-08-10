import express from 'express';
import { promises as fs } from 'fs';

const { writeFile, readFile } = fs;
const router = express.Router();

// 5 - nota total
router.get('/total', async (req, res) => {
  try {
    const filters = req.query;

    if (!filters.student || !filters.subject)
      throw new Error('Student and subject are mandatory');

    const data = JSON.parse(await readFile(global.fileName));

    const total = data.grades.reduce((acc, curr) => {
      let value = 0;
      if (
        curr.student === filters.student &&
        curr.subject === filters.subject
      ) {
        value = curr.value;
      }
      return acc + value;
    }, 0);

    res.send(`${total}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 6 - média
router.get('/average', async (req, res) => {
  try {
    const filters = req.query;

    if (!filters.type || !filters.subject)
      throw new Error('Type and subject are mandatory');

    const data = JSON.parse(await readFile(global.fileName));

    let count = 0;
    let total = 0;

    data.grades.forEach((grade) => {
      if (grade.type === filters.type && grade.subject === filters.subject) {
        count++;
        total += grade.value;
      }
    });

    const average = total / count;

    res.send(`${average}`);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 7 - três melhores
router.get('/top-three', async (req, res) => {
  try {
    const filters = req.query;

    if (!filters.type || !filters.subject)
      throw new Error('Type and subject are mandatory');

    const data = JSON.parse(await readFile(global.fileName));

    const filteredGrades = data.grades.filter(
      (grade) =>
        grade.type === filters.type && grade.subject === filters.subject
    );

    console.log(filteredGrades);
    const sortedGrades = filteredGrades
      .sort((a, b) => {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return 1;
        return 0;
      })
      .splice(0, 3);

    res.send(sortedGrades);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
export default router;
