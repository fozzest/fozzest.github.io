
//see previous example of maps from wk 09
//additonally, haevay referencing of elevation: https://developers.google.com/maps/documentation/elevation/intro#CreatingElevationCharts
//as a way of creating waypoints


//inspired by draggable polygons on map https://developers.google.com/maps/documentation/javascript/examples/directions-draggable


var map;
var home;
var journal = '<input id="textarea" type="text" name="fname">Write about this place<br>'
var marker1;
var marker2;
var poly1;
var poly2;

function setup() {
  initMap();
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8
      
    });


  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('info'));

    marker1 = new google.maps.Marker({
      map: map,
      draggable: true,
      position: {lat: 40.741895, lng: -73.989308} //NYC
    });

    marker2 = new google.maps.Marker({
      map: map,
      draggable: true,
      position: {lat: -33.8688197, lng: 151.20929550000005} //Sydney
    });

        // marker3 = new google.maps.Marker({
        //   map: map,
        //   draggable: true,
        //   position: {lat: 20.741895, lng: -20.989308} //NYC
        // });

  var bounds = new google.maps.LatLngBounds(
    marker1.getPosition(), marker2.getPosition());
    map.fitBounds(bounds);

    google.maps.event.addListener(marker1, 'position_changed', update);
    google.maps.event.addListener(marker2, 'position_changed', update);
        //google.maps.event.addListener(marker3, 'position_changed', update);

// reference for simple Polylines https://developers.google.com/maps/documentation/javascript/examples/polyline-simple

    poly1 = new google.maps.Polyline({
      strokeColor: '#f49e42',
      strokeOpacity: 1.0,
      strokeWeight: 5,
      map: map,
    });

    poly2 = new google.maps.Polyline({
      strokeColor: '#3725bc',
      strokeOpacity: 1.0,
      strokeWeight: 5,  
        //geodesic computes to curve of earth's true surface

      geodesic: true,
      map: map
    });

  update();
  }

function update() {
  var path = [marker1.getPosition(), marker2.getPosition()];
// setPath ref https://stackoverflow.com/questions/5954691/can-polygon-setpath-be-used-to-completely-redefine-polygon

  poly1.setPath(path);
  poly2.setPath(path);
  var directs = google.maps.geometry.spherical.computeHeading(path[0], path[1]);

  // https://stackoverflow.com/questions/33346203/convert-string-to-google-maps-paths

  //pass data back to HTML so three.js can view it?? probably a more efficient way....

  // toString https://www.w3schools.com/jsref/jsref_tostring_number.asp

        document.getElementById('heading').value = directs;
        document.getElementById('origin').value = path[0].toString();
        document.getElementById('destination').value = path[1].toString();
        //document.getElementById('new').value = path[2].toString();
}





