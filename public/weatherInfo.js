//put script here for gathering weather information
var displayWeather = function(weather) {
  var parentDiv = document.getElementById("p-secondary");
  while(parentDiv.firstChild){parentDiv.removeChild(parentDiv.firstChild)}
  var details = document.createElement("p");
  details.innerHTML = "<b>Current Weather Summary</b><br>" + weather.currently.summary
  + "<br>Temperature: " + weather.currently.temperature + '&#176;' + "C";
  parentDiv.appendChild(details);
}


var weatherRequest = function(lat,long){
  var url = "https://api.darksky.net/forecast/a048e42340dcb2a4065d8076283123c1/"
  + lat +"," + long + "?&units=si";
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var weather = JSON.parse(this.responseText);
    displayWeather(weather);
    console.log("Weather is here:", weather);
  })

  request.send()

}
