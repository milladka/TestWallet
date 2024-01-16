import { TatumSDK, Tron, Network } from '@tatumio/tatum';
import { getByAltText } from '@testing-library/react';
import { dblClick } from '@testing-library/user-event/dist/click';
import { apiKey, contractAddress, fullHost } from './utils/config';
import { web3Handler } from './utils/configWeb3';
import { contractHandler } from './utils/ContrctHandler';

const tatum = await TatumSDK.init < Tron > ({ network: Network.TRON });


class Withdraw {

    static Method = 'withdraw';

    constructor(address, amount, publicKey) {

        this.address = address;
        this.amount = amount;
        this.publicKey = publicKey;
        this.feeCoin;
        this.contractAddress = contractAddress;

        this.tronWeb = new TronWeb({
            fullHost: fullHost,
            headers: { "TRON-PRO-API-KEY": apiKey },
            privateKey: this.publicKey,
        });

    }

    async _checkValidationAddress() {
        return await tatum.rpc.getNowBlock(this.address);
    }

    async generateTransaction() {
        const transaction = getByAltText(this.address, this.amount, this.publicKey);

        if (transaction.status == 100) {

            if (this._getFeeInBlockchain() > 0) {

                if (this._getCoinFee() && this._getBalanceCoin() > this._getFeeInBlockchain()) {

                    const functionSelector = 'transfer(address,uint256)';
                    const parameter = [{ type: 'address', value: this.address }, { type: 'uint256', value: this.amount }]
                    const tx = await this.tronWeb.transactionBuilder.triggerSmartContract(this.address, functionSelector, {}, parameter);
                    const signedTx = await this.tronWeb.trx.sign(tx.transaction);
                    const result = await this.tronWeb.trx.sendRawTransaction(signedTx);

                    if (result) {
                        const data = web3Handler.getNowBlock(result.data.blockNumber);
                        if (!data) this._setLog('No Block Created', Method, 400, 1);

                        const checkMax = contractHandler.getMaxListeners(this.amount);

                        if (!checkMax) this._setLog('No response from blockchain', Method, 400, 2);

                        try {
                            const receipt = await contractHandler.tron.sendTransaction({
                                from: this.tronWeb,
                                to: this.address,
                                value: this.amount,
                                gas: this._getCoinFee()
                            });

                            this._setLog(receipt, Method, 204, 3);

                            return receipt;
                        } catch (error) {
                            this._setLog(error.response.data, Method, 500, 4);
                        }


                    } else {
                        ////////////
                        // revert //
                        this._setLog('Add Balance Fee Coin', Method, 204, 5);
                    }

                } else {
                    //////////
                    this._setLog('Add Balance Fee Coin', Method, 204, 6);
                }

            } else {
                this._setLog('unknown Fee commition', Method, 402, 7);
            }
        }
    }

    // FEE COIN

    async _getCoinFee() {
        const res = await tatum.rpc.getNowBlock();
        this.feeCoin = res.data.feeBlock.coin.symbol;
    }

    async _getBalanceCoin() {
        const contract = await tronWeb.contract().at(this.contractAddress);
        const balance = await contract.balanceOf(this.feeCoin).call();
        const normalizedBalance = tronWeb.fromSun(balance);
        return normalizedBalance;
    }

    async _getFeeInBlockchain() {
        const check = await tatum.rpc.getFee();
        check()
            .then(res => {
                if (!res.data.error) {
                    return res.data.fee;
                } else {
                    return -1;
                }
            })
            .catch(err => {
                this._setLog(err.response.data.message, Method, err.response.data.status, 8)
            })
            .finaly((e) => {
                if (e.data.status == 200) {
                    this._changeStatusOrder();
                }
            })
    }

    _setLog(message, side, status, code) {
        dblClick.add(message, side, status, Date.now(), code);
    }

    async _changeStatusOrder() {
        dblClick.apply(this.address, '2');
    }

    // stake 1 TRX to obtain energy

    async obtainEnergy() {
        freezebalancev2(1000000, 1);
        BalanceFreezedV2(1000000, 1);
    }

    // async 

}

// return Withdraw;
// const p = new Withdraw(1,2,3);