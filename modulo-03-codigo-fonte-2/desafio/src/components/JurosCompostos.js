import React, { useEffect } from 'react';

export default function JurosCompostos() {
  const [capitalInicial, setCapitalInicial] = React.useState(1000);
  const [taxaJurosMensal, setTaxaJurosMensal] = React.useState(0.5);
  const [periodo, setPeriodo] = React.useState(1);
  const [meses, setMeses] = React.useState([]);

  const handleCapitalInicialChange = (event) => {
    const newCapitalInicial = event.target.value;
    setCapitalInicial(newCapitalInicial);
  };

  const handleTaxaDeJurosMensalChange = (event) => {
    const newTaxaDeJurosMensal = event.target.value;
    setTaxaJurosMensal(newTaxaDeJurosMensal);
  };

  const handlePeriodoChange = (event) => {
    const newPeriodo = event.target.value;
    setPeriodo(newPeriodo);
  };

  useEffect(() => {
    setMeses(new Array(periodo));
  }, [periodo]);

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>

      <div className="row">
        <div className="input-field col s4">
          <label htmlFor="montante_inicial" className="active">
            Montante inicial
          </label>
          <input
            id="montante_inicial"
            type="number"
            min={100}
            step={100}
            value={capitalInicial}
            onChange={handleCapitalInicialChange}
          />
        </div>
        <div className="input-field col s4">
          <label htmlFor="taxa_juros_mensal" className="active">
            Taxa de juros mensal
          </label>
          <input
            id="taxa_juros_mensal"
            type="number"
            min={-12}
            max={12}
            step={0.1}
            value={taxaJurosMensal}
            onChange={handleTaxaDeJurosMensalChange}
          />
        </div>
        <div className="input-field col s4">
          <label htmlFor="periodo" className="active">
            Período (meses)
          </label>
          <input
            id="periodo"
            type="number"
            min={1}
            value={periodo}
            onChange={handlePeriodoChange}
          />
        </div>
      </div>

      <div className="row">
        {meses.map((mes, index) => {
          return <div style={{ backgroundColor: 'blue' }}>{index}</div>;
        })}
      </div>
    </div>
  );
}
