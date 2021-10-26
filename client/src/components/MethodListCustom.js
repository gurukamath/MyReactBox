import { getMethodList } from './utils';

export const customizeMethodList = async function(contract, contractInstance, web3){
    
    let initiateMethodList = getMethodList(contract, contractInstance);

    return initiateMethodList
} 
