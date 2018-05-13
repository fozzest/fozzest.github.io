 var renderer,
      scene,
      camera,
      myCanvas = document.getElementById('myCanvas');



    //RENDERER
    renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    //SCENE
    scene = new THREE.Scene();

    //LIGHTS
    var light = new THREE.AmbientLight(0xe4c4ff, 0.5);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffc4e1, 0.5);
    scene.add(light2);


    var geometry = new THREE.PlaneGeometry(100, 100);  

var curve = new THREE.SplineCurve3( [
    new THREE.Vector3( -10, 0, 10 ),
    new THREE.Vector3( -5, 5, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, -5, 5 ),
    new THREE.Vector3( 10, 0, 10 )
] );


var geometry = new THREE.TubeGeometry(
    curve,  //path
    20,    //segments
    2,     //radius
    8,     //radiusSegments
    true  //closed
);


    var material = new THREE.MeshLambertMaterial({color: 0x5f98f4});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -100;

    scene.add(mesh);


    render();

    var delta = 0;
    function render() {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;

        delta += 0.1;
        geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
        geometry.verticesNeedUpdate = true;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }