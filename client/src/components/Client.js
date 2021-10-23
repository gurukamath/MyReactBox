import Web3 from 'web3';
import { getMethodList, defineFunction } from './utils';
const contractJSON = require("../contracts/SimpleStorage.json"); 


let selectedAccount;
let contractInstance;
let web3;

export const clientInit = async function(){

    const provider = 'http://localhost:8545';

    web3 = new Web3(provider);

    const accountsList = await web3.eth.getAccounts()
                            .catch(e => console.log('Error Web3 Accounts: ', e.message));
    selectedAccount = accountsList[0];
    contractInstance = new web3.eth.Contract(contractJSON.abi, 
                                contractJSON.networks[5777].address,
                                                    {from: selectedAccount});
    

}

const initiateMethodList = getMethodList(contractJSON);

initiateMethodList.forEach((element) => {
    element.functionDef = function(inputs){
        return defineFunction(inputs, contractInstance, element);
    }   
})

export const contractMethodList = initiateMethodList;