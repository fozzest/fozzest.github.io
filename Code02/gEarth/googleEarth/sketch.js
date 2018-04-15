

var map;


function initMap() {
var myLatlng = {lat: -34.397, lng: 150.644};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatlng,
    zoom: 8,
  });

//used geoJSON.io to quickly make geoJSON that could be imported to the map in one line of code
//http://geojson.io/#map=16/-37.8287/-214.9433


  map.addListener('click', function(e) {
    newMarker(e.latLng, map);
  });


  map.data.loadGeoJson('markers.json');

}




//Animation, Marker via https://developers.google.com/maps/documentation/javascript/markers

function newMarker(latLng, map) {
var houseImg  = "assets/house.png"; 		
  var marker = new google.maps.Marker({
    position: latLng,
    animation: google.maps.Animation.DROP,
    map: map,
    icon: houseImg
  });

  //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
  //"infoWindown google map"

   var journal =
   	   '<input id="textarea" type="text" name="fname">Write about this place<br>';

    var infowindow = new google.maps.InfoWindow({
          content: journal
    });

  marker.addListener('click', function() {
  infowindow.open(map, marker);
  });
}

function bounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}





