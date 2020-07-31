import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

pergunta();

function pergunta() {
  rl.question('Digite um número: ', (numero) => {
    console.log(numero);
    rl.close();
  });
}
