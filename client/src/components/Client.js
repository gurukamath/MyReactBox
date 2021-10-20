// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
// Contract.setProvider('http://localhost:9545');
const SimpleStorage = require("../contracts/SimpleStorage.json"); 

let selectedAccount;
let simpleStorageContract;

export const clientInit = async function(){

    const provider = 'http://localhost:8545';

    const web3 = new Web3(provider);

    const accountsList = await web3.eth.getAccounts();
    selectedAccount = accountsList[0];
    simpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, 
                                                    SimpleStorage.networks[5777].address,
                                                    {from: selectedAccount});
    

}

export const getFunction = async function(){
    if (!simpleStorageContract){
        return "Please Connect a Client";
    }

    const result = await simpleStorageContract.methods.get().call()

    return result;

}

export const setFunction = async function(input){
    if (!simpleStorageContract){
        return "Please Connect a Client";
    }

    const result = await simpleStorageContract.methods.set(input).send({from: selectedAccount});

    return "Successful! Transaction Hash: " + result.transactionHash;

}