//Forrest Whitcomb

// code 2
// bfa dt
// spring 2018
// w/ bryan ma

// final


var mtEv = document.getElementById('mtEv');
var mtKi = document.getElementById('mtKi');
var mtAc = document.getElementById('mtAc');
var mtAc = document.getElementById('mtAc');
var newLat;
var newLng;
var poly;
var map;
var path;
var allTheData;
var latLng;
var myElevations = [];
var counter = 0;
var map;


var currentState = "start";

//BG colour ? #c40720


//LOAD JSON 

//JSON built with http://geojson.io/#map=4/2.90/-49.39
//polyLine coordinates set in arrays

var request;
request = new XMLHttpRequest();
request.open('GET', 'markers.json', true);
request.onload = function(event) {
allTheData = JSON.parse(event.target.responseText);
}
request.send();


      
//google.load('visualization', '1', {packages: ['columnchart']});

window.onload = function(){

  function buildCoords(arr) {
    var wholeObject = [];
  //loop through array
    for (var i = 0; i < arr.length; i++) {
      var newCoord = {};
      newCoord.lat = arr[i][0];
      newCoord.lng = arr[i][1];

      wholeObject.push(newCoord);
      } 
  // create new object with lat and lng properties for each array 
    return wholeObject;
    }
    var myCoords =  buildCoords(allTheData.features[1].geometry.coordinates);
    console.log("init");
    console.log(myCoords);
    var elevator = new google.maps.ElevationService;
    loadElevation(myCoords, elevator, map);
  }

// STATES

document.getElementById("buttonFam").addEventListener('click', function(){
checkTransition();
drawScene();

});

function drawScene(){

switch (currentState) {
    case "start":
      var myCoords =  buildCoords(allTheData.features[0].geometry.coordinates);
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);


      break;
    case "ever":
       var myCoords =  buildCoords(allTheData.features[0].geometry.coordinates);
       document.getElementById("subTitle").innerHTML = "Mt Everest";
       document.getElementById("p1").innerHTML = "The Tallest Mountain In The World";
       console.log(myCoords);
       var elevator = new google.maps.ElevationService;
       loadElevation(myCoords, elevator, map);
      break;

    case "kili":

 var myCoords =  buildCoords(allTheData.features[1].geometry.coordinates);
      document.getElementById("subTitle").innerHTML = "Mt Kilimanjaro";
      document.getElementById("p1").innerHTML = "The Tallest Mountain In Africa";
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);

      break;
    case "aco":

      var myCoords =  buildCoords(allTheData.features[2].geometry.coordinates);
      document.getElementById("subTitle").innerHTML = "Aconcagua";
      document.getElementById("p1").innerHTML = "The Tallest Mountain In South America";
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);
      break;
    case "blanc":
      var myCoords =  buildCoords(allTheData.features[3].geometry.coordinates);
      document.getElementById("subTitle").innerHTML = "Mont Blanc";
      document.getElementById("p1").innerHTML = "The Tallest Mountain In Europe";
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);
      break;
    default:
    break;
  }
}

function checkTransition() {

  mtEv.addEventListener("click", function(){
  currentState= "ever";
});

  mtKi.addEventListener("click", function(){
  currentState= "kili";
  
});

  mtAc.addEventListener("click", function(){
  currentState= "aco";
});

  mtBl.addEventListener("click", function(){
  currentState= "blanc";
});

}




//PARSING GEOJSON DATA TO BE USED BY GOOGLE ELEVATION ElevationService

function buildCoords(arr) {
  var wholeObject = [];
  //loop through array
  for (var i = 0; i < arr.length; i++) {
    var newCoord = {};
    newCoord.lat = arr[i][0];
    newCoord.lng = arr[i][1];

    wholeObject.push(newCoord);
  }
  // create new object with lat and lng properties for each array 
  return wholeObject;
  
}


//  CREATE A MAP THAT DISPLAYS ALL PATHS/MOUNTAIN ASCENTS



function initMap()  {
  var path01 =  buildCoords(allTheData.features[0].geometry.coordinates);
  var path02 =  buildCoords(allTheData.features[1].geometry.coordinates);
  var path03 =  buildCoords(allTheData.features[2].geometry.coordinates);
  var path04 =  buildCoords(allTheData.features[3].geometry.coordinates);

  //using custom styler built with
  //https://mapstyle.withgoogle.com/

  //style setting reference : https://developers.google.com/maps/documentation/javascript/styling

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 27.97617114981274, lng: 86.90394060919834},
    mapTypeId: 'terrain',
    styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
  });

  // Create an ElevationService.
  var elevator = new google.maps.ElevationService;

  // Draw the path, using the Visualization API and the Elevation service.
  var elevator = new google.maps.ElevationService;
  displayPathElevation(path01, elevator, map);
  displayPathElevation(path02, elevator, map);
  displayPathElevation(path03, elevator, map);
  displayPathElevation(path04, elevator, map);

  
  //newCenter(map.latLng, laat, lnng, map);

}


// function newCenter(latLng,laat, lnng, map) {
   
//   map.setCenter({
//     lat: laat, 
//     lng: lnng
//   });
// }

// DISPLAY POLYLINES OF PATHS

function displayPathElevation(path, elevator, map) {
  // Display a polyline of the elevation path.
  new google.maps.Polyline({
    path: path,
    strokeColor: '#d60000',
    strokeOpacity: 1,
    map: map
  });
}

// LOADING AND SAVING ELEVATION DATA FOR USE IN THREE.JS SCENE

function loadElevation(path, elevator, map){
    elevator.getElevationAlongPath({
    'path': path,
    'samples': 200
  }, saveElevations);

}


function saveElevations(elevations, status) {
  for (var i = 0; i < elevations.length; i++) {
    myElevations[i] = elevations[i].elevation;
  }
  console.log("this is where we get the data");
  console.log(myElevations);

  runThreeJS();

}



// THREE.JS

//https://threejs.org/examples/#webgl_geometry_terrain_raycast
//inspiration/example of creating data driven terrain

//https://github.com/mrdoob/three.js/issues/972
//https://stackoverflow.com/questions/31297567/how-do-you-build-a-custom-plane-geometry-in-three-js

//reference for mapping data to verices on a plane geometry

function runThreeJS(){

    var width  = window.innerWidth ,
        height = window.innerHeight*0.5;

    var scene = new THREE.Scene();

    var axes = new THREE.AxisHelper(10);
    scene.add(axes);

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(20, -80, 100);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    var geometry = new THREE.PlaneGeometry(60, 60, 9, 9);

//pump in elevation data
  for (var i = 0; i < geometry.vertices.length; i++) {
            geometry.vertices[i].z = myElevations[i] / 50 - 80;
      }

      console.log(geometry.vertices[3].z);

  // var directionalLight = new THREE.DirectionalLight( 0xb0c5e8, 10);
  //       directionalLight.position.set( 400, 400, -500);
  //       scene.add(directionalLight);

    var ambientLight = new THREE.AmbientLight(0xb0c5e8, 10 );
      scene.add(ambientLight);

    var material = new THREE.MeshPhongMaterial({
            color: 0x76c138, 
            wireframe: true
        });

    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    var controls = new THREE.TrackballControls(camera); 

    document.getElementById('three').appendChild(renderer.domElement);

    render();

    function render() {
        controls.update();    
        requestAnimationFrame(render);
        plane.rotation.z += 0.005;
        renderer.render(scene, camera);

    }

}








// EXCESS DATA AND FUNCTIONS


// function plotElevation(elevations, status) {

//   var chartDiv = document.getElementById('elevation_chart');

//   var chart = new google.visualization.ColumnChart(chartDiv);


//   //https://developers.google.com/maps/documentation/javascript/examples/elevation-simple
//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Sample');
//   data.addColumn('number', 'Elevation');
  
//   for (var i = 0; i < elevations.length; i++) {
//     data.addRow(['', elevations[i].elevation]);
//   }

//   // Draw the chart using the data within its DIV.
//   chart.draw(data, {
//     height: 150,
//     legend: 'none',
//     titleY: 'Elevation (m)'
//   });
// }    



// BUTTONS THAT WORK

// mtEv.addEventListener("click", function(){

//       var myCoords =  buildCoords(allTheData.features[0].geometry.coordinates);
//       document.getElementById("subTitle").innerHTML = "Mt Everest";
//       document.getElementById("p1").innerHTML = "The Tallest Mountain In The World";
//       console.log(myCoords);
//       var elevator = new google.maps.ElevationService;
//       loadElevation(myCoords, elevator, map);

// });
     
// mtKi.addEventListener("click", function(){

//       var myCoords =  buildCoords(allTheData.features[1].geometry.coordinates);
//       document.getElementById("subTitle").innerHTML = "Mt Kilimanjaro";
//       document.getElementById("p1").innerHTML = "The Tallest Mountain In Africa";
//       console.log(myCoords);
//       var elevator = new google.maps.ElevationService;
//       loadElevation(myCoords, elevator, map);

//       //newLocation(40.7033127,-73.979681);
//       //newCenter(latLng, -32.67587306721499, 25, map);

//       //map.setCenter({lat: -3.0658595973827465, lng: 37.355638965477624});

// });

// mtAc.addEventListener("click", function(){
      
//       var myCoords =  buildCoords(allTheData.features[2].geometry.coordinates);
//       document.getElementById("subTitle").innerHTML = "Aconcagua";
//       document.getElementById("p1").innerHTML = "The Tallest Mountain In South America";
//       console.log(myCoords);
//       var elevator = new google.maps.ElevationService;
//       loadElevation(myCoords, elevator, map);

// });

// mtBl.addEventListener("click", function(){

//       var myCoords =  buildCoords(allTheData.features[3].geometry.coordinates);
//       document.getElementById("subTitle").innerHTML = "Mont Blanc";
//       document.getElementById("p1").innerHTML = "The Tallest Mountain In Europe";
//       console.log(myCoords);
//       var elevator = new google.maps.ElevationService;
//       loadElevation(myCoords, elevator, map);

// });




///DATA FOR MAP DISPLAY

// var path01 = [
//     {lat: 27.971168184193534, lng: 86.90273897955967},  // Mt. Everest
//     {lat: 27.97617114981274, lng: 86.90394060919834},  
//     {lat: 27.97617114981274, lng: 86.91561358283116},  
//     {lat: 27.981022288820355, lng: 86.92230837653233},  
//     {lat: 27.98738907761479, lng: 86.92230837653233},  
//     {lat: 27.98678273297395, lng: 86.92556994269444}
//    ];

  //  var path02 = [
  //   {lat: -3.0658595973827465, lng: 37.355638965477624},  // Mt. Kilimanjaro
  //   {lat: -3.0744303470598213, lng: 37.33006142031161},  
  //   {lat: -3.1261962042486244, lng: 37.40713737856356},  
  //   {lat: -3.148478736306024, lng: 37.402330860008874},  
  //   {lat: -3.214980676700896, lng: 37.398210986962},  
  //   {lat: -3.3136971848615584, lng:   37.44490288149325}
  //  ];

  // var path03 = [
  //   {lat: -32.65217291861357, lng: -70.0094836463461},  // Aconcagua
  //   {lat: -32.65795402216703, lng: -70.01703674693204},  
  //   {lat: -32.667492025685355, lng: -70.01703674693204},  
  //   {lat: -32.682808506997425, lng: -70.01223022837735},  
  //   {lat: -32.67587306721499, lng: -69.97412140269375},  
  //   {lat: -32.71949957588005, lng: -69.95970184702969}
  //  ];

  // var path04 = [
  //   {lat: 25.971168184193534, lng: 86.90273897955967},  // Mt. Whitney
  //   {lat: 25.97617114981274, lng: 86.90394060919834},  
  //   {lat: 25.97617114981274, lng: 86.91561358283116},  
  //   {lat: 25.981022288820355, lng: 86.92230837653233},  
  //   {lat: 25.98738907761479, lng: 86.92230837653233},   
  //   {lat: 25.98678273297395, lng: 86.92556994269444}
  //  ];
