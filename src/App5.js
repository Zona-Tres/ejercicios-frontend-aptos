import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);
const DIRECCION = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"

function App5() {
  const [cuenta, setCuenta] = useState()

  useEffect(() => {
    setCuenta(Account.generate())
  }, [])

  useEffect(() => {
    console.log(`${cuenta?.accountAddress}`)
  }, [cuenta])

  const crearListaTodo = async () => {
    const transaction = await aptos.transaction.build.simple({
      sender: cuenta.accountAddress,
      data: {
        function: `${DIRECCION}::advanced_todo_list::create_todo_list`,
        functionArguments: []
      }
    })

    const pending = await aptos.signAndSubmitTransaction({
      signer: cuenta,
      transaction
    })

    const execute = await aptos.waitForTransaction({
      transactionHash: pending.hash
    })

    console.log(execute)
  }

  return (
    <div>
      <button onClick={crearListaTodo}>Crear Lista TODO</button>
    </div>
  );
}

export default App5;
