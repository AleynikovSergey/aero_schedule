var state_isArrive = false;
var state_isToday = true;
var state_isHold = false;
var mask = "";

var App = {
	model: {},
	control: {},
	route: {}
};

$(document).ready(function() {
	new App.control.FlightList('#content');
});

setInterval(function() {
	new App.control.FlightList('#content');
}, 60000);


