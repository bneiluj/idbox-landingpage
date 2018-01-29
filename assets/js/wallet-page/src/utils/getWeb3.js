/*
 * This function is used to access the browser's web3 provider (e.g. MetaMask)
 */

import Web3 from 'web3';

export default () => new Promise((resolve, reject) => {
  if (typeof window.web3 === 'undefined') {
    // No web3, use fallback...
    console.error("Please use a web3 browser!");
    return reject("Please use a web3 browser!");
  } else {
    // window.web3 == web3 most of the time, so we don't override the provided web3 and instead just wrap it in Web3
    var myWeb3 = new Web3(window.web3.currentProvider); 

    // The default account doesn't seem to be persisted, so copy it to our new instance
    myWeb3.eth.defaultAccount = window.web3.eth.defaultAccount;
    // Return web3
    return resolve(myWeb3);
  }
});
