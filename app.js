
var app = function(){
prePopulateCountries()

  var regionSelector = document.getElementById("regions-list")
  regionSelector.addEventListener("change", function(){
    var regionName = regionSelector.value;
    filterByRegion(regionName);
  })

  var countrySelector = document.getElementById("countries-list")
    countrySelector.addEventListener("change", function(){
    var countryName = countrySelector.value;
    countryRequest(countryName)
  })
}


window.addEventListener("DOMContentLoaded", app);
