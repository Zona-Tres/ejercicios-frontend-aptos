import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from 'axios';

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }))
const ADDRESS = "0xcb8b57d6f98f4295fc261eddca12af69988e5a2a02e0359e5f2ab71e57277de4"
const URL = "https://api.testnet.aptoslabs.com/v1/graphql"

function App7() {
  const { connect, account, connected, disconnect, signAndSubmitTransaction } = useWallet();

  const conexionWallet = async () => {
    if(connected) {
      await disconnect()
    } else {
      await connect("Petra")
    }
  }

  const crearToDoList = async () => {
    const response = await signAndSubmitTransaction({
      sender: account.address,
      data: {
        function: `${ADDRESS}::advanced_todo_list::create_todo_list`,
        typeArguments: [],
        functionArguments: [],
      }
    })

    try {
      await aptos.waitForTransaction({ transactionHash: response.hash })
    } catch (error) {
      console.log(error)
    }
  }

  const tieneList = async () => {
    const payload = {
      function: `${ADDRESS}::advanced_todo_list::has_todo_list`,
      functionArguments: [`${account.address}`, 0]
    }

    let result = await aptos.view({ payload })
    alert(result)
  }

  const queryIndexer = async () => {
    try {
      const response = await axios.post(URL, {
        query: `query MyQuery {
          account_transactions(
            where: {account_address: {_eq: "0xe4d1cd0ca60e881ed31d1d0f5a5ceb2ed4c7e83a9744983d298232ba7efd2764"}}
          ) {
            account_address
            user_transaction {
              block_height
              entry_function_id_str
              epoch
              expiration_timestamp_secs
              gas_unit_price
              max_gas_amount
              parent_signature_type
              sender
              sequence_number
              timestamp
              version
            }
            transaction_version
          }
        }`
      })

      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <p>{connected ? `Cuenta conectada: ${account?.address}` : "No hay ninguna cuenta conectada"}</p>
      <button onClick={conexionWallet}>{connected ? "Desconectar" : "Conectar"}</button>
      <button hidden={!connected} onClick={crearToDoList}>Crear To Do List</button>
      <button hidden={!connected} onClick={tieneList}>Tiene To Do List?</button>
      <button onClick={queryIndexer}>Query Indexer</button>
    </div>
  );
}

export default App7;
