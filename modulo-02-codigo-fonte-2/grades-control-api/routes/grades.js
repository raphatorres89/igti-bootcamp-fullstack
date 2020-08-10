import express from 'express';
import { promises as fs } from 'fs';

const { writeFile, readFile } = fs;
const router = express.Router();

// id
// student (nome)
// subject (matéria)
// type (atividade)
// value
// timestamp newDate

// 1- criar
router.post('/', async (req, res) => {
  try {
    let grade = req.body;

    if (!grade.student || !grade.subject || !grade.type || grade.value == null)
      throw new Error('Student, subject, type and value are mandatory');

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 2- atualizar
router.put('/', async (req, res) => {
  try {
    const grade = req.body;

    if (
      grade.id == null ||
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    )
      throw new Error('Id, Student, subject, type and value are mandatory');

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((a) => a.id === grade.id);

    if (index === -1)
      throw new Error(`Registro não encontrado pelo id: ${grade.id}`);

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = new Date();

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 3- excluir
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// 4- consultar
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));

    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );

    if (!grade) throw new Error(`Grade not found by id: ${req.params.id}`);

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
