
var depart1 = JSON.parse(dep1); //считыванние данных
var depart2 = JSON.parse(dep2);
var arrive1 = JSON.parse(arr1);
var arrive2 = JSON.parse(arr2);

function getDepart(isToday, isHold) { //получение улетающих рейсов
	var copyData = isToday ? depart1 : depart2;
	var dataToOut = [];

	for (var i = 0; i < copyData[0].scheduledFlights.length; i++) {
		if (!isHold) //для рейсов с новым временем итерация пропускается, если выводится только не задержанные
			if (copyData[0].scheduledFlights[i].newDepartureTime)
				continue;

		if (isHold) //аналогично
			if (!copyData[0].scheduledFlights[i].newDepartureTime)
				continue;


		var text = "{";
		var time = copyData[0].scheduledFlights[i].departureTime.substr(copyData[0].scheduledFlights[i].departureTime.indexOf('T') + 1, 5);
		if (copyData[0].scheduledFlights[i].newDepartureTime) {
			var time2 = copyData[0].scheduledFlights[i].newDepartureTime.substr(copyData[0].scheduledFlights[i].newDepartureTime.indexOf('T') + 1, 5);
			text += '"time" : "' +  '<span class=lt>' + time + '</span>  ' + '<span class=red>' + time2 + '</span>' + '",';
		}
		else {
			text += '"time" : "' +  time + '",';
		}

		var number = copyData[0].scheduledFlights[i].carrierFsCode + copyData[0].scheduledFlights[i].flightNumber;
		text += '"flightNumber" : "' + number + '",';
		var flag = true;

		if (mask != "")
			for (var j = 0; j < mask.length; j++)
				if (mask[j] != number[j])
					flag = false;

		if (!flag)
			continue;

		

		text += '"airline" : "' +  getAirlineByCode(copyData, copyData[0].scheduledFlights[i].carrierFsCode) + '",';
		text += '"airportFsCode" : "' +  getCountryByCode(copyData, copyData[0].scheduledFlights[i].arrivalAirportFsCode) + '",';
		text += '"terminal" : "' + copyData[0].scheduledFlights[i].departureTerminal + '",';

		var today = new Date();
		var h = today.getHours().length == 1 ? today.getHours() : '0' + today.getHours();
  		var m = today.getMinutes();

  		if (!isToday)
  			text += '"status" : "Не прибыл" }';
  		else if (isHold) {
  			if (time2 < h + ':' + m)
			text += '"status" : "Прибыл" }';
			else text  += '"status" : "Не прибыл" }';
  		}
  		else {
  			if (time < h + ':' + m)
			text += '"status" : "Прибыл" }';
			else text  += '"status" : "Не прибыл" }'
  		}
			

		dataToOut.push(JSON.parse(text));
	}

	return dataToOut;
}

function getArrive(isToday, isHold) { //получение прибывающих рейсов
	var copyData = isToday ? arrive1 : arrive2;
	var dataToOut = [];

	for (var i = 0; i < copyData[0].scheduledFlights.length; i++) {
		if (!isHold) //для рейсов с новым временем итерация пропускается, если выводится только не задержанные
			if (copyData[0].scheduledFlights[i].newArrivalTime)
				continue;

		if (isHold) //аналогично
			if (!copyData[0].scheduledFlights[i].newArrivalTime)
				continue;


		var text = "{";
		var time = copyData[0].scheduledFlights[i].arrivalTime.substr(copyData[0].scheduledFlights[i].arrivalTime.indexOf('T') + 1, 5);
		if (copyData[0].scheduledFlights[i].newArrivalTime) {
			var time2 = copyData[0].scheduledFlights[i].newArrivalTime.substr(copyData[0].scheduledFlights[i].newArrivalTime.indexOf('T') + 1, 5);
			text += '"time" : "' +  '<span class=lt>' + time + '</span>  ' + '<span class=red>' + time2 + '</span>' + '",';
		}
		else {
			text += '"time" : "' +  time + '",';
		}

		var number = copyData[0].scheduledFlights[i].carrierFsCode + copyData[0].scheduledFlights[i].flightNumber;
		text += '"flightNumber" : "' + number + '",';
		var flag = true;
		
		if (mask != "")
			for (var j = 0; j < mask.length; j++)
				if (mask[j] != number[j])
					flag = false;

		if (!flag)
			continue;
		

		text += '"airline" : "' +  getAirlineByCode(copyData, copyData[0].scheduledFlights[i].carrierFsCode) + '",';
		text += '"airportFsCode" : "' +  getCountryByCode(copyData, copyData[0].scheduledFlights[i].departureAirportFsCode) + '",';
		text += '"terminal" : "' + copyData[0].scheduledFlights[i].arrivalTerminal + '",';

		var today = new Date();
		var h = today.getHours().length == 1 ? today.getHours() : '0' + today.getHours();
  		var m = today.getMinutes();

  		if (!isToday)
  			text += '"status" : "Не улетел" }';
		else if (isHold) {
  			if (time2 < h + ':' + m)
			text += '"status" : "Улетел" }';
			else text  += '"status" : "Не улетел" }';
  		}
  		else {
  			if (time < h + ':' + m)
			text += '"status" : "Улетел" }';
			else text  += '"status" : "Не улетел" }'
  		}

		dataToOut.push(JSON.parse(text));
	}

	return dataToOut;
}

function getFlight(id) { //получение полета по id
	var copyData;
	var dataToOut = [];
	if (state_isArrive && state_isToday)
		copyData = arrive1;
	else if (state_isArrive && !state_isToday)
		copyData = arrive2;
	else if (!state_isArrive && state_isToday)
		copyData = depart1;
	else if (!state_isArrive && !state_isToday)
		copyData = depart2;

	for (var i = 0; i < copyData[0].scheduledFlights.length; i++) {
		var text = "{";

		var number = copyData[0].scheduledFlights[i].carrierFsCode + copyData[0].scheduledFlights[i].flightNumber;
		text += '"flightNumber" : "' + number + '",';
		var flag = true;

		if (id != number)
			continue;

		text += '"airline" : "' +  getAirlineByCode(copyData, copyData[0].scheduledFlights[i].carrierFsCode) + '",';
		text += '"airportDepFsCode" : "' +  getCountryByCode(copyData, copyData[0].scheduledFlights[i].departureAirportFsCode) + '",';
		text += '"airportArriveFsCode" : "' +  getCountryByCode(copyData, copyData[0].scheduledFlights[i].arrivalAirportFsCode) + '",';
		text += '"plane" : "' + getPlaneByCode(copyData, copyData[0].scheduledFlights[i].flightEquipmentIataCode) + '",';

		var timeArrive = copyData[0].scheduledFlights[i].arrivalTime.substr(copyData[0].scheduledFlights[i].arrivalTime.indexOf('T') + 1, 5);
		if (copyData[0].scheduledFlights[i].newArrivalTime) {
			var time2 = copyData[0].scheduledFlights[i].newArrivalTime.substr(copyData[0].scheduledFlights[i].newArrivalTime.indexOf('T') + 1, 5);
			text += '"time_arrive" : "' +  '<span class=lt>' + timeArrive + '</span>  ' + '<span class=red>' + time2 + '</span>' + '",';
		}
		else {
			text += '"time_arrive" : "' +  timeArrive + '",';
		}

		var timeDep = copyData[0].scheduledFlights[i].departureTime.substr(copyData[0].scheduledFlights[i].departureTime.indexOf('T') + 1, 5);
		if (copyData[0].scheduledFlights[i].newDepartureTime) {
			var time2 = copyData[0].scheduledFlights[i].newDepartureTime.substr(copyData[0].scheduledFlights[i].newDepartureTime.indexOf('T') + 1, 5);
			text += '"time_departure" : "' +  '<span class=lt>' + timeDep + '</span>  ' + '<span class=red>' + time2 + '</span>' + '"';
		}
		else {
			text += '"time_departure" : "' +  timeDep + '"';
		}

		text += '}';

		dataToOut.push(JSON.parse(text));
	}

	return dataToOut;
}


function getCountryByCode(data, code) {
  for (var i = 0; i < data[0].appendix.airports.length; i++) {
  	if (data[0].appendix.airports[i].fs == code)
  		return data[0].appendix.airports[i].name;
  }
}

function getAirlineByCode(data, code) {
  for (var i = 0; i < data[0].appendix.airlines.length; i++) {
  	if (data[0].appendix.airlines[i].fs == code)
  		return data[0].appendix.airlines[i].name;
  }
}

function getPlaneByCode(data, code) {
  for (var i = 0; i < data[0].appendix.equipments.length; i++) {
  	if (data[0].appendix.equipments[i].iata == code)
  		return data[0].appendix.equipments[i].name;
  }
}


