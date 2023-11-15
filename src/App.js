import logo from './logo.svg';
import './App.css';
const TronWeb = require('tronweb');

function App() {
  const sendTRC20Token = async (network, fromAddress, toAddress, amount, privateKey, AppKey, CONTRACT) => {
    let url = null;
    if (network === "shasta") {
      url = "https://api.shasta.trongrid.io";
    } else if (network === "nile") {
      url = "https://nile.trongrid.io";
    } else {
      url = "https://api.trongrid.io";
    }
    const tronWeb = new TronWeb({
      fullHost: url,
      headers: { "TRON-PRO-API-KEY": AppKey },
      privateKey: privateKey,
    });

    const options = {
      feeLimit: 10000000,
      callValue: 0
    };

    const tx = await tronWeb.transactionBuilder.triggerSmartContract(
      CONTRACT, 'transfer(address,uint256)', options,
      [{
        type: 'address',
        value: toAddress
      }, {
        type: 'uint256',
        value: amount * 1000000
      }],
      tronWeb.address.toHex(fromAddress)
    );

    const signedTx = await tronWeb.trx.sign(tx.transaction);
    const broadcastTx = await tronWeb.trx.sendRawTransaction(signedTx);
    return broadcastTx;
  }

  const CallApi = async () => {
    const fromAddress = "TNbjEnUPCsNLT7iZ7VGjEsNmKzK8V83RLw";
    // const fromAddress = "TGihHToJJ9B1NFi2Vx5bTM8muRmsbdAaJ8";
    const toAddress = "TWFMJtCYkBvkoYw7pSuJ7TTxmeWgrnFiWS";
    // const toAddress = "TNbjEnUPCsNLT7iZ7VGjEsNmKzK8V83RLw";
    const amount = 1000;
    const privateKey = "f2c281bfee980ac5d1b5a740602339db349c610dbc18bd3ac4806ea1551a1217";
    // const privateKey = "e5f4a4acb3ecef9e8589d69c1aa9fa5723b04ff724b1c04ebe6cd746b241ad04";
    const AppKey = "ab7a8ff1-2ca8-4dbb-a053-ba8d7acd9624";
    const usdt_contract = "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf";
    const network = "nile";
    await sendTRC20Token(network, fromAddress, toAddress, amount, privateKey, AppKey, usdt_contract);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => { CallApi() }}>test</button>
      </header>
    </div>
  );
}

export default App;