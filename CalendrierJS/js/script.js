(function(){
	window.dayOnMonth = [31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28];
	window.monthList = ["Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février"];
	window.dayList = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
	window.onload = function()
	{
		Calendar = new Calc();
		Calendar.initialize();	
	}


	function Calc() {}
	
	Calc.prototype.initialize = function() {
		window.object = this;

		this.calendarType = 'gregorien';
		this.today = new Date();
		this.month = (this.today.getMonth() + 1) - 2 < 1 ? 10 + (this.today.getMonth + 1) : (this.today.getMonth() + 1) - 2;
		this.fullYear = this.today.getFullYear();
		this.century = (Math.floor(this.today.getFullYear()/100))
		this.years = (Math.floor(this.today.getFullYear()%100));
		this.day = this.today.getDate();
		this.bissextile = this.isBissextile()

		document.getElementById('year-left').onclick = function() {
			Calendar.fullYear += - 1;
			Calendar.century = (Math.floor(Calendar.fullYear/100))
			Calendar.years = (Math.floor(Calendar.fullYear%100));
			console.log(Calendar.fullYear);
			Calendar.run();
		}

		document.getElementById('year-right').onclick = function() {
			Calendar.fullYear += 1;
			Calendar.century = (Math.floor(Calendar.fullYear/100))
			Calendar.years = (Math.floor(Calendar.fullYear%100));
			console.log(Calendar.fullYear);
			Calendar.run();
		}

		document.getElementById('month-left').onclick = function() {
			if(Calendar.month - 1 === 10) {
				Calendar.fullYear += - 1;
				Calendar.century = (Math.floor(Calendar.fullYear/100))
				Calendar.years = (Math.floor(Calendar.fullYear%100));
			}

			(Calendar.month - 1) < 1 ? Calendar.month = 12 : Calendar.month = Calendar.month - 1;
			Calendar.run();
		}
		
		document.getElementById('month-right').onclick = function() {
			if(Calendar.month + 1 === 11) {
				Calendar.fullYear += 1;
				Calendar.century = (Math.floor(Calendar.fullYear/100))
				Calendar.years = (Math.floor(Calendar.fullYear%100));
			} 

			(Calendar.month + 1) > 12 ? Calendar.month = 1 : Calendar.month = Calendar.month + 1;
			Calendar.run();
		}

		this.run();
	}
	
	Calc.prototype.run = function() {
		spanYears = document.querySelector('#years span') ? document.querySelector('#years span') : document.createElement('span');
		spanYears.innerHTML = this.fullYear;
		document.getElementById('years').appendChild(spanYears);

		spanMonth = document.querySelector('#month span') ? document.querySelector('#month span') : document.createElement('span');
		spanMonth.innerHTML = monthList[this.month - 1];
		document.getElementById('month').appendChild(spanMonth);

		this.date = calendrier(this.day, this.month, this.century, this.years, this.bissextile);
		console.log(this.years);

		each('tr td div', function($this, i, object){
			var _temp = (Calendar.today.getMonth() + 1) - 2 < 1 ? 10 + (Calendar.today.getMonth + 1) : (Calendar.today.getMonth() + 1) - 2;
			position = i + 1;


			if(position < Calendar.date + 1) {
				/*console.log("Old-month", "position : " + position);*/
				$this.childNodes[1].className = "old-month";
				$this.childNodes[1].innerHTML = dayOnMonth[Calendar.month - 2 < 0 ? 11 : Calendar.month - 2] - (Calendar.date - position);

			} else if(position > (dayOnMonth[Calendar.month - 1] + Calendar.date)) {
				/*console.log("Next-month", "position : " + position);*/
				$this.childNodes[1].className = "next-month";
				$this.childNodes[1].innerHTML = (position - dayOnMonth[Calendar.month - 1]) - Calendar.date;
			} else {
				/*console.log("Actual-month", "position : " + position);*/
				if(position - Calendar.date === Calendar.day && (Calendar.fullYear === Calendar.today.getFullYear() && Calendar.month === _temp)) {
					$this.className = "cal-today-cell";
				} else {
					if(document.querySelector(".cal-today-cell") != null && (Calendar.fullYear === Calendar.today.getFullYear() && Calendar.month === _temp) === false) {
						document.querySelector('.cal-today-cell').className = "";
					}
				}
				$this.childNodes[1].className = "";
				$this.childNodes[1].innerHTML = position - Calendar.date;
			}
		})
	}

	Calc.prototype.initCalendar = function() {

	}

	Calc.prototype.isBissextile = function() {
		if(this.calendarType == 'julien') {

		} else {
			if((this.getFullYear%4 === 0 && this.getFullYear%100 !== 0) || this.getFullYear%400 === 0)
				return 1;
			else
				return 0;
		}
	}

	/* 

		Fonction global

	*/

	function calendrier(j, m, c, a, b) {
		var day = Math.floor(((a/4) + a + (((2.6*m - 0.2) - (1 + b)*(m/11) - 2)%7) + j + (5*c) + (c/4) + 2)%7);
		return day;
	}

	function each(query, callback) {
		var divs = document.querySelectorAll(query),
	    l = divs.length, i, cur;

		for(i=0; i<l; i++) {
    		cur = divs[i];

    		if(typeof(callback) === 'function')
    			callback(cur, i);
    		else
		    	console.log(cur);
		}
	}

})()

