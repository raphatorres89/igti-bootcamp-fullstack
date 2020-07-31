import fs from 'fs';

try {
  fs.writeFileSync('sincrono.txt', 'execução síncrona | bloqueante');
  const data = fs.readFileSync('sincrono.txt', 'utf-8');
  console.log(data);
} catch (err) {
  console.log(err);
}
