import * as types from '../actions/identityInfo-types';

const initialState = {
  cardScanned: false, // This field keeps track of what was most recently done: a card scanned OR a phone number entered.
                      //  - "true" means a card was just scanned (aka a card phone number was NOT just entered)
                      //  - "false" means ether a phone number was just inputted (aka a card was NOT just scanned) OR nothing has been entered/scanned (nether a card or phone number)
  address: '', // The user's ethereum address
  weiBalance: 0, // The user's ether balance
  etherUSDRate: 0, // The value of one ether in USD
  USDLocalCurrencyRate: 0, // The value of one USD in the user's local currency
  scanningError: false, // Whether there was an error scanning a QR code
  loading: false, // Whether something is loading (the QR code scanning, the smart contract methods being called, etc.)
  phoneNumber: '', // The user's phone number
  ethAmount: 0, // The amount of ETH the user would like to donate to the address/phone number
  transactionProcessing: false, // Whether the user's MetaMask transaction is currently processing
  transactionError: false, // Whether the user's MetaMask transaction encountered an error
  transactionHash: '', // The returned hash of the user's MetaMask transaction
  networkType: '' // The type of network that MetaMask is connected to (e.g.: mainnet or Rinkeby)
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CARD_SCANNED:
      return {
        ...state,
        cardScanned: action.cardScanned
      };
    case types.SET_ADDRESS:
      return {
        ...state,
        address: action.address
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case types.LOAD_ETHER_BALANCE_BEGIN:
      return {
        ...state,
        loading: true,
        scanningError: false
      };
    case types.LOAD_ETHER_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        weiBalance: (isNaN(action.payload.result) ? // Set balance to zero if not set
          0 : parseFloat(action.payload.result, 10)
        )
      };
    case types.SET_ZERO_ETHER_BALANCE:
      return {
        ...state,
        weiBalance: 0
      };
    case types.LOAD_ETHER_BALANCE_FAILURE:
      return {
        ...state,
        loading: false,
        scanningError: true,
        weiBalance: 0
      };
    // case types.LOAD_ETHER_USD_RATE_BEGIN:
    case types.LOAD_ETHER_USD_RATE_SUCCESS:
      return {
        ...state,
        etherUSDRate: ((action.payload.length > 0 && !isNaN(action.payload[0]['price_usd'])) ? // Check that the value has been returned and is numeric
          parseFloat(action.payload[0]['price_usd'], 10) : 0
        )
      };
    // case types.LOAD_ETHER_USD_RATE_FAILURE:
    // case types.LOAD_USD_LOCAL_CURRENCY_RATE_BEGIN:
    case types.LOAD_USD_LOCAL_CURRENCY_RATE_SUCCESS:
      return {
        ...state,
        USDLocalCurrencyRate: (('USD_PGK' in action.payload && !isNaN(action.payload['USD_PGK']['val'])) ? // Check that the value has been returned and is numeric
          parseFloat(action.payload['USD_PGK']['val'], 10) : 0
        )
      };
    // case types.LOAD_USD_LOCAL_CURRENCY_RATE_FAILURE:
    case types.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.phoneNumber
      };
    case types.SET_ETH_AMOUNT:
      return {
        ...state,
        ethAmount: action.ethAmount
      };
    case types.SET_TRANSACTION_PROCESSING:
      return {
        ...state,
        transactionProcessing: action.transactionProcessing
      };
    case types.SET_TRANSACTION_ERROR:
      return {
        ...state,
        transactionError: action.transactionError
      };
    case types.SET_TRANSACTION_HASH:
      return {
        ...state,
        transactionHash: action.transactionHash
      };
    case types.SET_NETWORK_TYPE:
      return {
        ...state,
        networkType: action.networkType
      }
    default:
      return state;
  }
};