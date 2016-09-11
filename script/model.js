var Model = function(){
	this.expression = "";
	this.result = 0;
	this.history = {},
	this.appendExpression = function(){
		this.history[this.expression] = this.result;
	},
	this.saveExpression = function(exp){
		this.expression = exp;
	}
	this.getResult = function(exp){
		this.result = calculateResult(exp);
	}
}

model = new Model();