var myMap = L.map("map", {
	center: [38.8026, -116.4194],
	zoom: 5
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL
d3.json(url, function(response) {

 	var features = response.features;

    // console.log(features);

  	for (var i = 0; i < features.length; i++) {
    	var geometry = features[i].geometry;

     	// Conditionals for points
	 	var color = "";
	 	var mag = features[i].properties.mag;

	 	if (mag <=0) {
	    	color = "#7cff00";
		}
	 	else if (mag > 0 && mag <= 1) {
	    	color = "#7cff00";
		}
		else if (mag > 1 && mag <= 2) {
	    	color = "#d8ff00";
	    }
	    else if (mag > 2 && mag <= 3) {
	    	color = "#ffff00";
	    }
	    else if (mag > 3 && mag <= 4) {
	    	color = "#ffcd00";
	    }
	    else if (mag > 4 && mag <= 5) {
	    	color = "#ffa600";
	    }
	    else if (mag > 5) {
	    	color = "#ff0000";
	    }

		L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
		    fillOpacity: 0.75,
		    color: color,
		    fillColor: color,
		    radius: mag * 20000
		    }).bindPopup("<h2>" + features[i].properties.place + "</h2> <hr> <h3>" + mag + " Richter</h3>").addTo(myMap);

	}

	var legend = L.control({ position: "bottomright" });
	legend.onAdd = function() {
	    var div = L.DomUtil.create("div", "info legend");
	    var grades = [0,1,2,3,4,5]
	    var colors = ["#7cff00", "#d8ff00", "#ffff00", "#ffcd00", "#ffa600", "#ff0000"]

		for (var i = 0; i < grades.length; i++) {
			div.innerHTML += '<i style="background:' + 
			colors [i] + 
			'"></i>' + 
			grades[i] + (grades[i + 1]? '&ndash;' + grades[i + 1] + '<br>' : '+');
		}
		return div;
		};

	// Adding legend to the map
	legend.addTo(myMap);

});