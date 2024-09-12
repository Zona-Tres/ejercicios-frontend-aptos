import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
import { useEffect, useState } from "react";
import { ABI } from "./abi.ts"
import { createSurfClient } from "@thalalabs/surf";

export const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }))
export const surfClient = createSurfClient(aptos).useABI(ABI)

function App6() {
  const [cuenta, setCuenta] = useState()
  const [listaCreada, setListaCreada] = useState(false)
  const [lastTodo, setLastTodo] = useState(["",""])

  useEffect(() => {
    setCuenta(Account.generate())
  }, [])

  useEffect(() => {
    console.log(`${cuenta?.accountAddress}`)
  }, [cuenta])

  const crearListaTodo = async () => {
    const result = await surfClient.entry.create_todo_list({
        typeArguments: [],
        functionArguments: [],
        account: cuenta,
    })

    console.log(result)
    setListaCreada(true)
  }

  const crearTodo = async (e) => {
    e.preventDefault()
    const result = await surfClient.entry.create_todo({
      typeArguments: [],
      functionArguments: [0, `${e.target.elements.todo.value}`],
      account: cuenta,
    })

    console.log(result)
  }

  const getTodoList = async () => {
    const result = await surfClient.view.get_todo_list({
      typeArguments: [],
      functionArguments: [`${cuenta?.accountAddress}`, 0],
    })

    console.log(result)
  }

  const getTodo = async () => {
    const result = await surfClient.view.get_todo({
      typeArguments: [],
      functionArguments: [`${cuenta?.accountAddress}`, 0, 0],
    })

    setLastTodo(result)
    console.log(result)
  }

  const completarTodo = async () => {
    const result = await surfClient.entry.complete_todo({
      typeArguments: [],
      functionArguments: [0, 0],
      account: cuenta,
    })

    console.log(result)
  }

  return (
    <div>
      <button onClick={crearListaTodo}>Crear Lista TODO</button>
      <div>{listaCreada ? 
        (<div>
          <form onSubmit={crearTodo}>
            <input type="text" name="todo"/>
            <button>Crear To Do</button>
          </form>
          <button onClick={getTodoList}>Obtener Lista To Do</button>
          <button onClick={getTodo}>Obtener To Do</button>
          <p>Tarea: {lastTodo[0]}</p>
          <p>Completado: {`${lastTodo[1]}`}</p>
          <button onClick={completarTodo}>Completar To Do</button>
        </div>) : 
        (<p>No se ha creado lista.</p>)}
      </div>
    </div>
  );
}

export default App6;
