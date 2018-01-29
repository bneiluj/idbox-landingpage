/*
 * The function is used to create an instance of the idbox village contract.
 * NOTE: it exists in utils to avoid redundancy throughout different components
 */

import getWeb3 from './getWeb3'; // Import web3 helper from utils folder
let IdBoxABI = require('../constants/contracts/Idbox.json');

export default () => new Promise((resolve, reject) => {
  return getWeb3().then(Web3 => {
    return resolve(new Web3.eth.Contract(IdBoxABI.abi, '0x676f9bb76cc6b14be31d6c31b3712eb4cd4d665a'));
  }, err => {
    reject(err);
  });
});
