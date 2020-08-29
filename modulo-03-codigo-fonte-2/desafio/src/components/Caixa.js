import React from 'react';
import Mes from './Mes';
import Valores from './Valores';
import Capital from './Capital';
import Rendimento from './Rendimento';
import Porcentagem from './Porcentagem';

export default function Caixa({ calculo }) {
  const { mes, porcentagem, rendimento, capital } = calculo;

  return (
    <div className="col s2">
      <Mes>{mes}</Mes>
      <Valores>
        <Capital valor={capital}></Capital>
        <Rendimento valor={rendimento}></Rendimento>
        <Porcentagem valor={porcentagem}></Porcentagem>
      </Valores>
    </div>
  );
}
