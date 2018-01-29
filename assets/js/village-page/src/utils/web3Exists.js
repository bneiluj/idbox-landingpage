/*
 * This function is used to check if the browser has a web3 provider (e.g. MetaMask)
 */

export default function web3Exists() {
  return (typeof window.web3 !== 'undefined');
}
