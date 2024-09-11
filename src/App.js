import {useState} from 'react';

function App() {

  const [valor, setValor] = useState(0)

  const aumentarContador = () => {
    setValor(valor + 1)
  }
  
  const decrementarContador = () => {
    setValor(valor - 1)
  }

  const reset = () => {
    setValor(0)
  }

  return (
    <div className="App">
      <p>{valor}</p>
      <button onClick={aumentarContador}>+</button>
      <button onClick={decrementarContador}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
