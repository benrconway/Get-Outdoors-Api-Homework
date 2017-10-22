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
  switch (integer){
    case integer > 10000000:
      this.googleMap.setZoom(3.5)
      break;
    case integer > 9550000:
      this.googleMap.setZoom(4.5);
      break;
    default:
      this.googleMap.setZoom(6);



    }
};
