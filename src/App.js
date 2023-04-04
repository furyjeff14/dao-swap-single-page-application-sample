import "./App.css";
import { useState } from "react";
import { providers, ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { SwapWidget } from "@uniswap/widgets";

const infuraId = process.env.REACT_APP_INFURA_ID;
const JsonRpcEndpoint = `https://mainnet.infura.io/v3/${infuraId}`;
const JsonRpcProvider = new providers.JsonRpcProvider(JsonRpcEndpoint);
const provider = new ethers.providers.Web3Provider(JsonRpcProvider);

function App() {
  const [account, setAccount] = useState({
    address: "",
    provider: provider,
  });

  async function connectWallet() {
    const ethereumProvider = await detectEthereumProvider();

    if (ethereumProvider) {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount({
        address: address[0],
        provider: ethereumProvider,
      });
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div className="Uniswap">
        {/**Notes: Jeffrey Luna, I just used a widget for now since the requirement stated we can use APIs to get the rates, **/
        /** if this is insufficient for the test then I would just point out some parts of the logic which is on src/TokenTrade.js **/
        /** due to I do not want to recreate the whole widget similar to uniswap as it takes much much longer to do
        /** I will provide only the logic for getting the price for a token which is on TokenTrade.js script**/
        /** The logic is as follows, 1. We get the RouterAddress to get liquidity pools/tokens **/
        /** 2.We get token pairs we want to trade (tokens that already have liquidity) **/
        /** 3. We call amounts out function on the router on line 21 of TokenTrade.js or getReserves on the factory to calculate this manually **/}
        <SwapWidget
          provider={account.provider}
          JsonRpcEndpoint={JsonRpcEndpoint}
        />
      </div>
    </div>
  );
}

export default App;
