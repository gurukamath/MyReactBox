// var Contract = require('web3-eth-contract');
import Web3 from 'web3';
import { getMethodList } from './utils';
const contractJSON = require("../contracts/SimpleStorage.json"); 


let selectedAccount;
let contractInstance;

export const clientInit = async function(){

    const provider = 'http://localhost:8545';

    const web3 = new Web3(provider);

    const accountsList = await web3.eth.getAccounts();
    selectedAccount = accountsList[0];
    contractInstance = new web3.eth.Contract(contractJSON.abi, 
                                contractJSON.networks[5777].address,
                                                    {from: selectedAccount});
    

}

const initiateMethodList = getMethodList(contractJSON);

initiateMethodList.forEach((element) => {
    element.functionDef = async function(inputs){
        if (!contractInstance){
            return "Please Connect a Client";
        }
        let result; 
        if (element.callorsend === "call") {
            if (element.noInputs){
                result = await contractInstance.methods[element.textSignature]().call();
            } else {
                result = await contractInstance.methods[element.textSignature](...inputs).call();
            }
            
        } else if (element.callorsend === "send") {
            let t;
            if (element.noInputs) {
                t = await contractInstance.methods[element.textSignature]().send();
            } else {
                t = await contractInstance.methods[element.textSignature](...inputs).send();
            }
            result = t.transactionHash;
            
        }

        return result;
    
    }
})

export const contractMethodList = initiateMethodList;