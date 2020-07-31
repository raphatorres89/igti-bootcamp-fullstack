import { promises as fs } from 'fs';

init();

async function init() {
  try {
    await fs.writeFile('promise.txt', 'teste com promise');
    await fs.appendFile('promise.txt', '\nteste append file');
    const data = await fs.readFile('promise.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
