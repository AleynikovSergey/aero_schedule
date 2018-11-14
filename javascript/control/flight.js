App.control.FlightList = can.Control.extend({

}, {
	init: function(element , options) { //вывод списка полетов
		var flights = state_isArrive ? getArrive(state_isToday, state_isHold) : getDepart(state_isToday, state_isHold);
		mask = "";
		$('#flight_list_head').show();
		this.element.html(can.view('flightList.mustache', {flights: flights}));
		
	},

	'.flight click': function(e) { //вывод полета по id
		var id = e[0].id;
		var flight = getFlight(id);
		$('#flight_list_head').hide();
		$('#content').html(can.view('flight.mustache', {flight: flight}));
	}
});


