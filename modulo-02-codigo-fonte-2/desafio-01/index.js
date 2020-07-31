import { promises as fs } from 'fs';

init();

async function init() {
  try {
    const cidades = JSON.parse(await fs.readFile('Cidades.json'));
    const estados = JSON.parse(await fs.readFile('Estados.json'));

    criarArquivos(cidades, estados);

    console.log(await quantidadeDeCidadesPorUF('SC'));
    console.log(await topCincoEstadosComMaisCidades(estados));
    console.log('foi');
  } catch (err) {
    console.log(err);
  }
}

function criarArquivos(cidades, estados) {
  estados.forEach((estado) => {
    const cidadesEncontradas = cidades.filter(
      (cidade) => cidade.Estado === estado.ID
    );
    fs.writeFile(`${estado.Sigla}.json`, JSON.stringify(cidadesEncontradas));
  });
}

async function quantidadeDeCidadesPorUF(uf) {
  try {
    const data = JSON.parse(await fs.readFile(`${uf}.json`));
    return data.length;
  } catch (err) {
    console.log(err);
  }
}

async function topCincoEstadosComMaisCidades(estados) {
  try {
    const estadoCidade = estados.map((estado) => {
      const quantidade = await quantidadeDeCidadesPorUF(estado.Sigla);
      return {
        nomeQtd: `${estado.Sigla} - ${quantidade}`,
        quantidade: quantidade,
      };
    });
  } catch (err) {
    console.log(err);
  }
}
