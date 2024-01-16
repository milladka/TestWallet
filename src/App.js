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
      [
        {
          type: 'address',
          value: toAddress
        },
        {
          type: 'uint256',
          value: amount * 1000000
        }
      ],
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

    const amount = 100;

    const privateKey = "f2c281bfee980ac5d1b5a740602339db349c610dbc18bd3ac4806ea1551a1217";
    // const privateKey = "e5f4a4acb3ecef9e8589d69c1aa9fa5723b04ff724b1c04ebe6cd746b241ad04";

    const AppKey = "ab7a8ff1-2ca8-4dbb-a053-ba8d7acd9624";
    const usdt_contract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    // const network = "nile";
    const network = "main";
    await sendTRC20Token(network, fromAddress, toAddress, amount, privateKey, AppKey, usdt_contract);
  }

  const SendApi = async () => {
    const tronWeb = new TronWeb({
      fullHost: "https://api.trongrid.io", // https://api.trongrid.io // https://nile.trongrid.io
      headers: { "TRON-PRO-API-KEY": "ab7a8ff1-2ca8-4dbb-a053-ba8d7acd9624" },
      privateKey: "86f9f91ccf63010e9549b3a3b4ab5abcb5bd1d3f27a5ebfb0f1c95dc0168dbbf",
    });

    const functionSelector = 'transfer(address,uint256)';
    const parameter = [{ type: 'address', value: 'TWNTEp3XHmPdHFSSjaEY28WYxfUCd8fukY' }, { type: 'uint256', value: 1000000 }]
    const tx = await tronWeb.transactionBuilder.triggerSmartContract('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', functionSelector, {}, parameter);
    const signedTx = await tronWeb.trx.sign(tx.transaction);
    const result = await tronWeb.trx.sendRawTransaction(signedTx);
    console.log(result);
  }



  const getTRC20TokenBalance = async () => {

    const tronWeb = new TronWeb({
      fullHost: "https://nile.trongrid.io",
      headers: { "TRON-PRO-API-KEY": "ab7a8ff1-2ca8-4dbb-a053-ba8d7acd9624" },
      privateKey: "f2c281bfee980ac5d1b5a740602339db349c610dbc18bd3ac4806ea1551a1217",
    });

    try {

      const contract = await tronWeb.contract().at('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
      const balance = await contract.balanceOf("TNbjEnUPCsNLT7iZ7VGjEsNmKzK8V83RLw").call();
      const normalizedBalance = tronWeb.fromSun(balance);
      console.log(`The TRC20 token balance is: ${normalizedBalance}`);

    } catch (error) {
      console.error('Error:', error);
    }

  }

  // 736a1f9f8110a3c743847ba98ef19a0cb3ec429590ef2a2025c1525d074e292f
  // a523eb46d31a251314002896b36bd9e3a9f849318b505f63b63180b3c7d5ec38

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => { SendApi() }}>test</button>
        <div>maryam</div>
      </header>
    </div>
  );
}

export default App;

// ----------------------------------- //
// Main Net Smart Contract USDT        //
// TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t  //
// ----------------------------------- //

// ----------------------------------- //
//  Smart Contract USDT        //
// TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf  //
// ----------------------------------- //


// Main
// TTzEnrvU3AsoNVrcvxjSagXM9zPHgJ9fx9
// 86f9f91ccf63010e9549b3a3b4ab5abcb5bd1d3f27a5ebfb0f1c95dc0168dbbf






// maryam wallet tronLink = TWFMJtCYkBvkoYw7pSuJ7TTxmeWgrnFiWS