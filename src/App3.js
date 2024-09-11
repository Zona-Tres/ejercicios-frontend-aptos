import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

function App3() {
  const [alicia, setAlicia] = useState();
  const [cuentaCreada, setCuentaCreada] = useState(false);
  const [fondeada, setFondeada] = useState(false);

  useEffect(() => {
    console.log(alicia)
  }, [alicia])

  const crearCuenta = async () => {
    const a = Account.generate();
    setAlicia(`${a.accountAddress}`);
    setCuentaCreada(true)
  }

  const fondearCuenta = async () => {
    console.log(alicia.accountAddress)
    await aptos.fundAccount({
      accountAddress: alicia,
      amount: 100,
    });
    setFondeada(true);
  }

  const consultarSaldo = async () => {
    const saldoAlicia = await aptos.getAccountResource({
      accountAddress: alicia,
      resourceType: COIN_STORE,
    });
    
    console.log(`El saldo de alicia es: ${saldoAlicia.coin.value}`);
  }

  return (
    <div className="App">
      <button onClick={crearCuenta}>Crear cuenta</button>
      <button disabled={!cuentaCreada} onClick={fondearCuenta}>Fondear Cuenta</button>
      <button hidden={!fondeada} onClick={consultarSaldo}>Consultar Saldo</button>
    </div>
  );
}

export default App3;
