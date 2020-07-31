import fs from 'fs';

fs.writeFile('teste.txt', 'Teste de texto \n', (err) => {
  if (err) {
    console.log(err);
  } else {
    fs.appendFile('teste.txt', 'teste append file', (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.readFile('teste.txt', 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});
