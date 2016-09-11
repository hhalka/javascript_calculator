var View = function(model){
	this.model = model;
	this.showResult = function(){
		$("#userInput").val(model.result);
	},
	this.generatePrevious = function(){
		var previous = $("#previous");
		var exprList = $("<ol></ol>");
		for(var i in model.history){
			var li = $("<li>"+ i + " = " + model.history[i] + "</li>")
			exprList.append(li);
		}
		previous.html(exprList);
	}
}

var view = new View(model);
