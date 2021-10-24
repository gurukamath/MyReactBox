// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { getMethodList, defineFunction, handleErrorMessage } from './utils';
const contractJSON = require("../contracts/SimpleStorage.json"); 


let selectedAccount;
let contractInstance;
let web3;

export const clientInit = async function(){


// Initiate the Web3 Provider
    const provider = await detectEthereumProvider();

    if (provider === window.ethereum) {
        web3 = new Web3(provider);
    } else {
        web3 = new Web3('http://localhost:8545'); // Local Ganache
    }


    let netId = await provider.request({ method: 'net_version' });

    let accounts = await provider.request({method: 'eth_requestAccounts'});
    selectedAccount = accounts[0];

    contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);

    // Listen in case something changes

    provider.on('networkChanged', (_netId) => {
        netId = _netId;
        contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);
    })

    provider.on('accountsChanged', (accounts) => {
        selectedAccount = accounts[0];
        // nonce = web3.eth.getTransactionCount(selectedAccount);
        contractInstance = defineNewContractInstance(contractJSON, netId, selectedAccount);
    })

}

function defineNewContractInstance(jsonObj, id, account) {
    return new web3.eth.Contract(jsonObj.abi, 
                                jsonObj.networks[id].address,
                                                    {from: account});
}

const initiateMethodList = getMethodList(contractJSON);

initiateMethodList.forEach((element) => {
    element.functionDef = function(inputs){
        return defineFunction(inputs, contractInstance, element);
    }
    
})

export const contractMethodList = initiateMethodList;