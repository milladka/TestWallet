import { Web3 } from 'web3';
import { apiKey } from './config';

export const web3Handler = new Web3(`https://mainnet.infura.io/v3/${apiKey}`);