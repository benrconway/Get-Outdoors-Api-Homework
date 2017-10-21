var MapWrapper = function (container, coords, zoom) {

  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
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
