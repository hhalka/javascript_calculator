var Controll = function(view, model){
	this.model = model;
	this.view = view;
	this.showButtonClick = function(){
		var buttons = $(".reflected");
		for (var i = 0; i < buttons.length; i++) {
			$(buttons[i]).on("click", function () {
				var innerValue = $("#userInput").val();
				innerValue += $(this).attr("value");
				$("#userInput").val(innerValue);
			})
		}
	},
	this.findResult = function(){
		$("#result").on("click", function() {
			var expr = $("#userInput").val();
			model.saveExpression(expr);
			model.getResult(expr);
			model.appendExpression();
			view.showResult();
			view.generatePrevious();
		});
	},
	this.clearInput = function(){
		$("#clear").on("click", function() {
			$("#userInput").val("")
		});
	},
	this.showPrevious = function(){
		$("#previousBtn").on("click",function() {
			$("#previous").css({display: "block"});
		})
	}
}

var controll = new Controll(view, model);
controll.showButtonClick();
controll.clearInput();
controll.findResult();
controll.showPrevious();