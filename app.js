
var app = function(){
  prePopulateCountries()

  var mapDiv = document.getElementById("p-map");
  var mainMap = new MapWrapper(mapDiv);

  var regionSelector = document.getElementById("regions-list")
  regionSelector.addEventListener("change", function(){
    var regionName = regionSelector.value;
    filterByRegion(regionName);
  })

  var countrySelector = document.getElementById("countries-list")
    countrySelector.addEventListener("change", function(){
    var countryCode = countrySelector.value;
    console.log(countrySelector.value);
    countryRequest(countryCode, mainMap);
  })

  reloadLastCountry(mainMap);
}


window.addEventListener("DOMContentLoaded", app);
