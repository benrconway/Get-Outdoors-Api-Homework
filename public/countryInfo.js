var prePopulateRegions = function(countries) {
  var regionArray = [];
    countries.forEach(function(country) {
      if (!regionArray.includes(country.region)) {
        regionArray.push(country.region);
      }
    })
    addRegionsDropDown(regionArray);
}

var addRegionsDropDown = function(regionArray) {
  var selector = document.getElementById("regions-list");
  var firstOption = document.createElement("option");
  firstOption.selected = true;
  firstOption.disabled = true;
  firstOption.innerText = "Choose a region";
  selector.appendChild(firstOption);


  regionArray.forEach(function(region){
    var option = document.createElement("option")
    option.innerText = region;
    selector.appendChild(option);
  })
}

var filterByRegion = function(regionName){
  var countriesInRegion = [];
  var url = "https://restcountries.eu/rest/v2/all";
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText);
    countries.forEach(function(country) {
      if(country.region === regionName) {
        countriesInRegion.push(country)
      }
    })
    addCountriesToSelect(countriesInRegion);
  })
  request.send();
}

var reloadLastCountry = function(map) {
  if(localStorage.getItem('savedSelection')){
    var savedCountry = JSON.parse(localStorage.getItem("savedSelection"));
    countryRequest(savedCountry.alpha3Code, map);
  }
}

var save = function(itemToSave) {
  var jsonString = JSON.stringify(itemToSave);
  localStorage.setItem("savedSelection", jsonString)
}

var displayBordering = function(country){
  var parentDiv = document.getElementById("secondary");
  while(parentDiv.firstChild){parentDiv.removeChild(parentDiv.firstChild)}

  var div = document.createElement("div");
  var details = document.createElement("p")
  details.innerHTML = "<b>" + country.name + "</b><br>Population: " +
   country.population + ".<br>Languages spoken:";
  div.appendChild(details);

  var languages = country.languages;
  var ul = document.createElement("ul");
  languages.forEach(function(language){
    var li = document.createElement("li");
    li.innerText = language.nativeName + " (" + language.name + ").";
    ul.appendChild(li)
  })
  div.appendChild(ul);
  var img = document.createElement("img");
  img.className = "flag-image";
  img.src = country.flag;
  div.appendChild(img);
  parentDiv.appendChild(div)
}

var bordering = function(bordersWithArray){
bordersWithArray.forEach(function(bordering){
    var url = "https://restcountries.eu/rest/v2/alpha/"+ bordering;
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.addEventListener("load", function() {
      var country = JSON.parse(this.responseText);

      displayBordering(country);
    })
    request.send()
  })
}


var displayCountryDetails = function(country) {
var parentDiv = document.getElementById("p-info");
while(parentDiv.firstChild){parentDiv.removeChild(parentDiv.firstChild)}

var details = document.createElement("p")
details.innerHTML = "<b>" + country.name + "</b><br>Population: " +
 country.population + ".<br>Native Language: " + country.languages[0].nativeName
 + " (" + country.languages[0].name +").";
parentDiv.appendChild(details);

var img = document.createElement("img");
img.className = "flag-image";
img.src = country.flag;
parentDiv.appendChild(img);

}

var countryRequest = function (countryName, map) {
  var queryUrl = "https://restcountries.eu/rest/v2/alpha/" + countryName
  var request = new XMLHttpRequest();
  request.open("GET", queryUrl);

  request.addEventListener("load", function() {
    var country = JSON.parse(this.responseText);
    displayCountryDetails(country[0]);

    var lat = country[0].latlng[0];
    var long = country[0].latlng[1];
    var area = country[0].area;
    var coords = {lat: lat, lng: long};
    map.addMarker(coords, country[0].name)
    map.adjustZoom(area)
    map.googleMap.setCenter(coords)
    weatherRequest(lat, long);
    save(country[0])
    bordering(country[0].borders)
  })
  request.send();
}

var addCountriesToSelect = function(countries) {
  var selector = document.getElementById("countries-list")
  while (selector.firstChild) {
    selector.removeChild(selector.firstChild)
  }
  var firstOption = document.createElement("option");
  firstOption.selected = true;
  firstOption.disabled = true;
  firstOption.innerText = "Choose a country";
  selector.appendChild(firstOption);

  countries.forEach(function(country){
    var option = document.createElement("option");
    option.innerText = country.name;
    option.value = country.alpha3Code;
    selector.appendChild(option);
  })
}


var prePopulateCountries = function() {
  var url = "https://restcountries.eu/rest/v2/all";
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText);
    addCountriesToSelect(countries);
    prePopulateRegions(countries);
  });

  request.send();
}
