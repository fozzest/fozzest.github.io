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
var wM = document.getElementById('wM');
var so = document.getElementById('so');
var newLat;
var newLng;
var poly;
var map;
var path;
var latLng;
var myElevations = [];
var counter = 0;
var map;

var wire = true;

var currentState = "start";

//LOAD JSON 

//GEOJSON for coordinates and JSON that houses map syle data
//polyLine coordinates set in arrays

//load multiple local JSON files in a single array
//reference
//https://stackoverflow.com/questions/28690096/load-multiple-json-files-in-pure-javascript
var loadFile = function (filePath, done) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () { return done(this.responseText) }
    xhr.open("GET", filePath, true);
    xhr.send();
}
var myFiles = [ "markers.json", "mapStyles.json" ];
// stores data
var jsonData = [];

  myFiles.forEach(function (file, i) {
      loadFile(file, function (responseText) {
          jsonData[i] = JSON.parse(responseText);
      });
  });

//OLD style of single json load and parse

// var request;
// request = new XMLHttpRequest();
// request.open('GET', 'markers.json', true);
// request.onload = function(event) {
// jsonData[0] = JSON.parse(event.target.responseText);
// }
// request.send();


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
    var myCoords =  buildCoords(jsonData[0].features[1].geometry.coordinates);
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
      var myCoords =  buildCoords(jsonData[0].features[0].geometry.coordinates);
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);
      break;

    case "ever":
       var myCoords =  buildCoords(jsonData[0].features[0].geometry.coordinates);
       document.getElementById("subTitle").innerHTML = "Mt Everest";
       document.getElementById("p1").innerHTML = "The Tallest Mountain In The World. Everest grows by nearly a centimetre every year.";
       console.log(myCoords);
       var elevator = new google.maps.ElevationService;
       loadElevation(myCoords, elevator, map);
      break;

    case "kili":
      var myCoords =  buildCoords(jsonData[0].features[1].geometry.coordinates);
      document.getElementById("subTitle").innerHTML = "Mt Kilimanjaro";
      document.getElementById("p1").innerHTML = "The Tallest Mountain In Africa. It is the highest freestanding mountain in the world.";
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);
      break;

    case "aco":
      var myCoords =  buildCoords(jsonData[0].features[2].geometry.coordinates);
      document.getElementById("subTitle").innerHTML = "Aconcagua";
      document.getElementById("p1").innerHTML = "The Tallest Mountain In South America. It is also the highest point outside of Asia, as well as the entire Southern and Western Hemispheres.";
      console.log(myCoords);
      var elevator = new google.maps.ElevationService;
      loadElevation(myCoords, elevator, map);
      break;

    case "blanc":
      var myCoords =  buildCoords(jsonData[0].features[3].geometry.coordinates);
      document.getElementById("subTitle").innerHTML = "Mont Blanc";
      document.getElementById("p1").innerHTML = "The Tallest Mountain In Europe. Over 20,000 climbers summit every year.";
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
  var path01 =  buildCoords(jsonData[0].features[0].geometry.coordinates); // Mt. Everest
  var path02 =  buildCoords(jsonData[0].features[1].geometry.coordinates); // Mt. Kilimanjaro
  var path03 =  buildCoords(jsonData[0].features[2].geometry.coordinates); // Aconcagua
  var path04 =  buildCoords(jsonData[0].features[3].geometry.coordinates); // Mt. Whitney

  //using custom styler built with
  //https://mapstyle.withgoogle.com/
  //style setting reference : https://developers.google.com/maps/documentation/javascript/styling

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 27.97617114981274, lng: 86.90394060919834},
    mapTypeId: 'terrain',
    styles: jsonData[1]
  });

  // Create an ElevationService.
  var elevator = new google.maps.ElevationService;

  // Draw the path, using the Visualization API and the Elevation service.
  var elevator = new google.maps.ElevationService;
  displayPathElevation(path01, elevator, map);
  displayPathElevation(path02, elevator, map);
  displayPathElevation(path03, elevator, map);
  displayPathElevation(path04, elevator, map);


//SET NEW CENTER

  function newLocation(newLat,newLng)
  {
    map.setCenter({
      lat : newLat,
      lng : newLng
    });
  }

  mtEv.addEventListener("click", function(){
    newLocation(27.97617114981274,86.90394060919834);
  });

  mtKi.addEventListener("click", function(){
    newLocation(-3.0658595973827465,37.355638965477624); 
  });


  mtAc.addEventListener("click", function(){
    newLocation(-32.65217291861357,-70.0094836463461);
  });

  mtBl.addEventListener("click", function(){
    newLocation(45.832749717059826,6.864912473727145);
  });


}

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

    //https://stackoverflow.com/questions/30105141/three-js-custom-geometry-lighting-does-not-work
    //reference for allowing light to apply to a PlaneGeometry

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

//pump in elevation data
  for (var i = 0; i < geometry.vertices.length; i++) {
            geometry.vertices[i].z = myElevations[i] / 50 - 80;
      }

      console.log(geometry.vertices[3].z);

    var light = new THREE.PointLight(0xffffff);
    light.position.set(100,200,100);
    scene.add(light);
    light  = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(0, 0, 0);
    scene.add(light);
    light  = new THREE.AmbientLight(0x404040);
    scene.add(light);



    var material = new THREE.MeshPhongMaterial({
            color: 0xd60000,
            wireframeLinewidth: 10,
            wireframe: wire

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

//TOGGLE MATERIAL


    wM.addEventListener("click", function(){
      if (wire == true){
        wire = false;
      } else if (wire ==false){
        wire = true;
      }
      console.log(wire);
      
    });








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

//       var myCoords =  buildCoords(jsonData[0].features[0].geometry.coordinates);
//       document.getElementById("subTitle").innerHTML = "Mt Everest";
//       document.getElementById("p1").innerHTML = "The Tallest Mountain In The World";
//       console.log(myCoords);
//       var elevator = new google.maps.ElevationService;
//       loadElevation(myCoords, elevator, map);

// });
     
// mtKi.addEventListener("click", function(){

//       var myCoords =  buildCoords(jsonData[0].features[1].geometry.coordinates);
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
      
//       var myCoords =  buildCoords(jsonData[0].features[2].geometry.coordinates);
//       document.getElementById("subTitle").innerHTML = "Aconcagua";
//       document.getElementById("p1").innerHTML = "The Tallest Mountain In South America";
//       console.log(myCoords);
//       var elevator = new google.maps.ElevationService;
//       loadElevation(myCoords, elevator, map);

// });

// mtBl.addEventListener("click", function(){

//       var myCoords =  buildCoords(jsonData[0].features[3].geometry.coordinates);
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
