export const getMethodList = function(contract) {

    const methodList = [];

    const callFunctions = ["view"];
    const sendFunctions = ["nonpayable"];

    const functionList = contract.abi.filter((el) => {
        return el["type"] === "function";
    });

    functionList.forEach((element) => {
        let methodDefinition = {name: "", noInputs: false, textSignature:"", callorsend:""};
        methodDefinition.name = element.name;
        methodDefinition.noInputs = false;
        let methodInputs = "";
        element.inputs.forEach((el) => {
            if (methodInputs === "") {
                methodInputs = el.type;
            } else {
                methodInputs = methodInputs + "," + el.type;
            }
        })
        if (methodInputs === ""){
            methodDefinition.noInputs = true;
        }
        methodDefinition.textSignature = methodDefinition.name + "(" + methodInputs + ")";

        if (callFunctions.includes(element.stateMutability)){
            methodDefinition.callorsend = "call";
        } else if (sendFunctions.includes(element.stateMutability)) {
            methodDefinition.callorsend = "send";
        }

        methodList.push(methodDefinition);
    })

    return methodList;
}