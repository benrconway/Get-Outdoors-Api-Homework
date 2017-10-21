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


var displayCountryDetails = function(country) {
var parentDiv = document.getElementById("p-info");
var details = document.createElement("p")
details.innerHTML = "<b>" + country.name + "</b><br>Population: " +
 country.population + ".<br>Native Language: " + country.languages[0].nativeName
 + " (" + country.languages[0].name +").";
parentDiv.appendChild(details);
}

var countryRequest = function (countryName) {
  var queryUrl = "https://restcountries.eu/rest/v2/name/" + countryName.toLowerCase() + "?fullText=true"
  var request = new XMLHttpRequest();
  request.open("GET", queryUrl);

  request.addEventListener("load", function() {
    var country = JSON.parse(this.responseText);
    displayCountryDetails(country[0]);
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
  // reloadLastCountry();
}
