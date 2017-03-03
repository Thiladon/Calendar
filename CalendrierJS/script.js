(function(){
	window.dayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	var Calc = function() {}
	
	Calc.prototype.initialize = function() {
		today = new Date();
		this.month = (today.getMonth() + 1) - 2 < 1 ? 10 + (today.getMonth + 1) : (today.getMonth() + 1) - 2;
		this.century = (Math.floor((today.getFullYear()/10)%10) + (today.getFullYear()%10));
		this.day = today.getDate();
		
		this.run();
	}
	
	Calc.prototype.run = function() {
		
	}
}