"use strict"

function infixToPostfix(infixexpr) {
    var priorities = {
        // unary should have higher priorty than binary
        "sqrt": 5,
        "cos": 5,
        "sin": 5,
        // binary
        "^": 4,
        "*": 3,
        "/": 3,
        "-": 2,
        "+": 2,
        "(": 1
    };
    var functions = ["sqrt", "cos", "sin"];
    var opStack = [];
    var postfixList = [];
    var digits = ".0123456789";    
    for (var i=0; i < infixexpr.length; i++){
        var symbol = infixexpr[i];
        var token = symbol;
        if(digits.indexOf(token) !== -1){
            while(i+1 < infixexpr.length && digits.indexOf(infixexpr[i+1]) !== -1) {
                token += infixexpr[i+1];
                i++;
            }
            postfixList.push(token);
        }else if(token === "("){
            opStack.push(token);
        }else if(token === ")"){
            var toptoken = opStack.pop();
            while(toptoken !== "("){
                postfixList.push(toptoken);
                toptoken = opStack.pop();
            }
        }else{
            functions.forEach(function(f, index) {
                if (infixexpr.slice(i).startsWith(f) === true) {
                    token = f;
                    i += f.length - 1;
                }
            });
            while(opStack.length > 0 && priorities[opStack[opStack.length - 1]] >= priorities[token]){
                postfixList.push(opStack.pop());
            }
            opStack.push(token);
        }
    }
    while (opStack.length !== 0){
        postfixList.push(opStack.pop());
    }
    return postfixList.join(" ");
}

function postfixEval(postfixExpr){
    var result;
    var functions = ["sin", "cos", "sqrt"];
    var operandStack = [];
    var tokenList = postfixExpr.split(" ");
    for(var i = 0; i < tokenList.length; i++){
        var token = tokenList[i];
        if (/^[0-9.]+$/.test(token) === true) {
            operandStack.push(parseFloat(token));
        }else if (functions.indexOf(token) !== -1) {
            if (token === "sin") {
                var operand = operandStack.pop();
                result = Math.sin(operand);
                operandStack.push(result);
            }else if (token === "cos") {
                var operand = operandStack.pop();
                result = Math.cos(operand);
                operandStack.push(result);
            }else if (token === "sqrt"){
                var operand = operandStack.pop();
                result = Math.sqrt(operand);
                operandStack.push(result);
            }
        }else{
            var operand2 = operandStack.pop();
            var operand1 = operandStack.pop();
            result = doMath(token, operand1, operand2);
            operandStack.push(result);
        }
    }
    return operandStack.pop();
}

function doMath(operator, operand1, operand2){
    if(operator === "^"){
        return Math.pow(operand1, operand2);
    }else if(operator === "*") {
        return operand1 * operand2;
    }else if(operator === "/"){
        return operand1 / operand2;
    }else if(operator === "+") {
        return operand1 + operand2;
    }else {
        return operand1 - operand2;
    }
}
//console.log(postfixEval(infixToPostfix("2 * 5 + 3 * 4")));
//console.log(postfixEval(infixToPostfix("( 3 + 5 ) * 4 - ( 1 - 6 ) * ( 9 + 1 )")));
//console.log(postfixEval('7 8 + 3 2 + /'));
//console.log(postfixEval(infixToPostfix('5 * 3 ^ ( 4 - 2 )')));
//console.log(postfixEval(infixToPostfix("2 + 5 * sqrt ( 9 )")));
console.log(postfixEval(infixToPostfix("2.0+5.15*sin(1.38+2.05)")));
console.log(postfixEval(infixToPostfix("+sin(0)+")));