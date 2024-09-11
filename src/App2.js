import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;
const CONTRACT = "0xb77c85141a538ca35c8d1bda03c7a3b34fa7102bc574b2642454d04124e9291d";

function App2() {
  const crearCuenta = async () => {
    const alicia = Account.generate();
    console.log(alicia.accountAddress);

    await aptos.fundAccount({
      accountAddress: alicia.accountAddress,
      amount: 100,
    });

    const saldoAlicia = await aptos.getAccountResource({
      accountAddress: alicia.accountAddress,
      resourceType: COIN_STORE,
    });
    
    console.log(`El saldo de alicia es: ${saldoAlicia.coin.value}`);
  }

  const helloWorld = async () => {
    const payload = {
      function: `${CONTRACT}::frontend::hello_aptos`,
    }

    let result = await aptos.view({ payload })
    alert(result)
  }

  // const hasAptogotchi = async () => {
  //   const payload = {
  //     function: "0xb686acdc6c166f92aa2090f005acc275b258c5d91653df9b3b8af21e7c104773::main::has_aptogotchi"
  //   }
  // }

  return (
    <div className="App">
      <button onClick={crearCuenta}>Crear cuenta</button>
      <button onClick={helloWorld}>Press to Hello World</button>
    </div>
  );
}

export default App2;
