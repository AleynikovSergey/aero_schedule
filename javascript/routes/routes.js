(function () {
	var routes = { //список route
		flightsListDeparture: '/departure', 
		flightsListArrival: '/arrival',
		hold: '/hold',
		today_yesterday: '/today_yesterday',
		search: '/search'
	}

	var actions = { //действия на каждый route
		flightsListDeparture: function() {
			state_isArrive = false;
			state_isToday = true;
			state_isHold = false;

			new App.control.FlightList('#content');
		}, 
		flightsListArrival: function() {
			state_isArrive = true;
			state_isToday = true;
			state_isHold = false;

			new App.control.FlightList('#content');
		},

		hold: function() {
			state_isHold = !state_isHold;
			

			new App.control.FlightList('#content');
		},

		today_yesterday: function() {
			state_isHold = false;
			state_isToday = !state_isToday;

			

			$('#a_hold').css('color', '#000');

			new App.control.FlightList('#content');
		},

		search: function() {
			mask = $('input').val();

			new App.control.FlightList('#content');
		}
	}

	for (var name in routes) {
		App.route[name] = crossroads.addRoute(routes[name]);
	}

	for (var name in routes) {
		App.route[name].matched.add(actions[name]);
	}

	$(document).on('click', 'a', function(e) { 
		e.preventDefault();

		var url = $(e.currentTarget).attr('href');
		
		crossroads.parse(url);
		colorLinks();
	});	

})();

function colorLinks() { //для окраски ссылок
	if (!state_isToday)
		$('#a_today_yes').css('color', '#ffac02');
	else
		$('#a_today_yes').css('color', '#000');

	if (state_isHold)
		$('#a_hold').css('color', '#ffac02');
	else
		$('#a_hold').css('color', '#000');

	if (state_isArrive) {
		$('a_departure').css('color', '#000');
		$('a_arrival').css('color', '#ffac02');
	}
	else {
		$('a_arrival').css('color', '#000');
		$('a_departure').css('color', '#ffac02');
	}
}
