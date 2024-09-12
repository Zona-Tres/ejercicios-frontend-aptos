import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);
const CONTRACT = "0xb686acdc6c166f92aa2090f005acc275b258c5d91653df9b3b8af21e7c104773"

function App4() {
  const hasAptogotchi = async () => {
    const payload = {
      function: `${CONTRACT}::main::has_aptogotchi`,
      functionArguments: ["0x42dc3d650c02ecae3a9ce7e8d4e73d85ebe08730cb3e7fb1ee1f7beea2244f5b"]
    }

    let result = await aptos.view({ payload })
    alert(result)
  }

  return (
    <div>
      <button onClick={hasAptogotchi}>Tiene Aptogotchi?</button>
    </div>
  );
}

export default App4;
