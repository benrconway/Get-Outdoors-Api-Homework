var MapWrapper = function (container) {
  this.googleMap = new google.maps.Map(container, {
    center: {lat: 55.945752, lng: -3.20381},
    zoom: 10
  })
  this.adjustZoom = this.adjustZoom.bind(this)
}

MapWrapper.prototype.addMarker = function(coords, infoWindowContent) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  })
  if (infoWindowContent){
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    })
  marker.addListener("click", function(){
      infoWindow.open(this.map, this)
    })
  }
}

MapWrapper.prototype.adjustZoom = function (integer) {
if(integer > 10000000) {this.googleMap.setZoom(3.5)};

if(integer < 99999999 && integer > 9550000) this.googleMap.setZoom(4);
if(integer < 95499999 && integer > 7500000) this.googleMap.setZoom(5);
if(integer < 74999999 && integer > 200000) this.googleMap.setZoom(5.7);
if(integer < 1999999 && integer > 150000) this.googleMap.setZoom(6);
if(integer < 1499999 && integer > 100000) this.googleMap.setZoom(6.5);
if(integer < 999999 && integer > 80000) this.googleMap.setZoom(7);
if(integer < 79999 && integer > 50000) this.googleMap.setZoom(7.5);
if(integer < 49999 &&  integer > 15000) this.googleMap.setZoom(8);
if(integer < 14900) this.googleMap.setZoom(8.5);
};
