
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
    var countryName = countrySelector.value;
    countryRequest(countryName, mainMap);
  })

  reloadLastCountry(mainMap);



  //
  // var moveCentre = function(lat, long) {
  //   // var mapDiv = document.getElementById("p-map");
  //   // var mainMap = new MapWrapper(mapDiv);
  //   console.log(lat);
  //   console.log(long);
  //   mainMap.panTo(lat, long)
  //   console.log(mainMap);
  // }


}


window.addEventListener("DOMContentLoaded", app);
