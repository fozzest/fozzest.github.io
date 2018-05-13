        //Final

        //1. Find a way to build a path by placing markers
        //2. Find a way to save these data points in a JSON 
              //Save JSON
        //3. Find a way to load JSON data into Web sketch
              //Data should represent elevatiuon in texture mapping

        //4. States, Make a main instruction page that is then entered
      function setup(){
        createCanvas(800,800);
        background(0);

      }


      google.load('visualization', '1', {packages: ['columnchart']});

      function initMap() {
        
        var path = [
            {lat: 36.579, lng: -118.292},  
            {lat: 36.606, lng: -118.0638},  
            {lat: 36.433, lng: -117.951},  
            {lat: 36.588, lng: -116.943},  
            {lat: 36.34, lng: -117.468},  
            {lat: 36.24, lng: -116.832}];  

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: path[1],
          mapTypeId: 'terrain'
        });

        
        var elevator = new google.maps.ElevationService;

        
        displayPathElevation(path, elevator, map);
      }

      function displayPathElevation(path, elevator, map) {
        // Display a polyline of the elevation path.
        new google.maps.Polyline({
          path: path,
          strokeColor: '#0000CC',
          strokeOpacity: 1,
          map: map
        });


        elevator.getElevationAlongPath({
          'path': path,
          'samples': 256 //defines how many data pointts will be held
        }, plotElevation);
      }

      function plotElevation(elevations, status) {
        var chartDiv = document.getElementById('elevation_chart');
        

        var chart = new google.visualization.ColumnChart(chartDiv);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Sample');
        data.addColumn('number', 'Elevation');
        for (var i = 0; i < elevations.length; i++) {
          data.addRow(['', elevations[i].elevation]);
        }

        chart.draw(data, {
          height: 150,
          legend: 'none',
          titleY: 'Elevation (m)'
        });
      }