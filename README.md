# idbox-landingpage
Idbox Landing page

# Access production website
Main website: https://bneiluj.github.io/idbox-landingpage/

Blog section for example: https://bneiluj.github.io/idbox-landingpage/blog.html

# How to Run Smart-Contract Methods for Testing

## Run geth

    geth --rinkeby --rpcport 8545 --rpc console --rpcapi="db,eth,net,web3,personal,web3"
    
## Run truffle with the network flag

    truffle console --network rinkeby

## Define contract variable

    var idbox = Idbox.at("0x8A3ABfB1A42311BcAdb627494Af22f507C86e1FC")
    
## Ensure that the account is unlocked

    web3.personal.unlockAccount("0x3c60d64ce5fc42ef4c825b846b7e57b4266a26a8")
    
## Now you can run the smart-contract method

    idbox.addIdboxUser("123","111")
