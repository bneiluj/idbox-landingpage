/*
 * The function is used to create an instance of the idbox village contract.
 * NOTE: it exists in utils to avoid redundancy throughout different components
 */

import web3 from './web3'; // Import web3 helper from utils folder

export default () => {
  return new web3.eth.Contract(
    '', // < -- NEEDS ABI OF DEPLOYED CONTRACT
    '' // < -- NEEDS CONTRACT ADDRESS
    // {
    //   /* ... various configurations ... */
    // }
  );
};
