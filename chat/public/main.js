$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms


  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box

  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page
  var ok;








  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;
  
  var RADIUS = 70;
  
  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 1.5;
  
  // The number of particles that are used to generate the trail
  var QUANTITY = 20;

  var canvas;
  var context;
  var particles;
  
  var mouseX = Math.random(SCREEN_WIDTH,0);
  var mouseY = Math.random(SCREEN_HEIGHT,0);
  var mouseIsDown = false;




  // init();





/* ... more images ... */




  // Prompt for setting a username
  var username;
  var realusername;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();



  // Sets the client's username
  const setUsername = () => {
    username = cleanInput($usernameInput.val());
    

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      //
      //
      socket.emit('add user', username);
      //
      //
      //

      //realusername = username;

    }
  }

  // Prevents input from having injected markup
  const cleanInput = (input) => {
    return $('<div/>').text(input).html();
  }

  $window.keydown(event => {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }




    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });



 

  socket.on('disconnect', () => {
    log('you have been disconnected');
  });

  socket.on('reconnect', () => {
    log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', () => {
    log('attempt to reconnect has failed');
  });


  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');






      context = canvas.getContext('2d');
      
      canvas.addEventListener('touchstart', TouchStartHandler, false);
      canvas.addEventListener('touchmove', TouchMoveHandler, false);
      window.addEventListener('resize', windowResizeHandler, false);
      canvas.addEventListener('mousemove', onMouseMove, false);
//document.getElementById("parisMortar").addEventListener("ontouchstart", safeSelect03);
      canvas.addEventListener('ontouchstart', TouchClick, false);
      canvas.addEventListener('touchend', TouchStartHandler, false);
      canvas.addEventListener('mousedown', onMouseDown, false);
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('mouseout', onMouseUp, false);
      canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
      console.log(username);

      // createParticles((window.innerWidth - SCREEN_WIDTH) * .5, (window.innerHeight - SCREEN_HEIGHT) * .5);
      windowResizeHandler();
      // setInterval( lol, 1000 / 60 );
    



  

  

  
  


  var current = {
    color: 'black'
  };
  var drawing = false;
  var fillTexter = false;
  var mouseX = false;



socket.on('login', (data) => {
      connected = true;
  

});

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);
  socket.on('fillTexter', onDrawingEvent);
  socket.on('mouseX', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();



function makeStamp(x1, y1, stampPrint)
    {

}





var stamp;

window.onload=function(){

  


  //BUTTONS


  document.getElementById("parisMap").addEventListener("click", clickSelect);
  document.getElementById("parisMap").addEventListener("ontouchstart", safeSelect01);


  document.getElementById("parisWall").addEventListener("click", clickSelectWall);
    document.getElementById("parisWall").addEventListener("ontouchstart", safeSelect02);

    document.getElementById("parisMortar").addEventListener("click", clickSelectMortar);
  document.getElementById("parisMortar").addEventListener("ontouchstart", safeSelect03);

      document.getElementById("paris04").addEventListener("click", clickSelect04);
  document.getElementById("paris04").addEventListener("ontouchstart", safeSelect04);




function safeSelect01() {
console.log('hey');
    document.getElementById("parisMap").innerHTML = "GO!"; 
    stamp = 'uploads/firstPNG.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }

  //console.log("button 01");
}



  function clickSelect() {
    console.log('hey');
    document.getElementById("parisMap").innerHTML = "GO!"; 
    stamp = 'uploads/firstPNG.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }

  //console.log("button 01");
}


function clickSelectWall() {
  document.getElementById("parisWall").innerHTML = "GO";
  console.log("button 02");
  stamp = 'uploads/PNGPink.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }


  }

  function safeSelect02() {
console.log('hey');
    document.getElementById("parisMap").innerHTML = "GO"; 
    stamp = 'uploads/PNGPing.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }

  //console.log("button 01");
}

function clickSelectMortar() {
  document.getElementById("parisMortar").innerHTML = "GO!";
  console.log("button 03");
  stamp = 'uploads/PNG03.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }


  }

  function safeSelect03() {
console.log('hey');
    document.getElementById("parisMortar").innerHTML = "GO!"; 
    stamp = 'uploads/PNG03.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }

  //console.log("button 01");
}

function clickSelect04() {
  document.getElementById("paris04").innerHTML = "GO!";
  console.log("button 04");
  stamp = 'uploads/PNG04.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }


  }

  function safeSelect04() {
console.log('hey');
    document.getElementById("paris04").innerHTML = "GO!"; 
    stamp = 'uploads/PNG04.png';

      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }

  //console.log("button 01");
}




}


function drawLine(x0, y0, x1, y1, mouseX, mouseY, color, emit, name, stamp){

    context.strokeStyle = color;
    context.lineWidth = 0;
    context.stroke();
    context.closePath();
    context.font = "bolder 70px Arial";

createParticles(x1, y1);
setInterval( lol, 100);










  function createParticles(mouseX, mouseY) {
    particles = [];
    
    for (var i = 0; i < QUANTITY; i++) {
      var particle = {
        position: { x: mouseX, y: mouseY },
        shift: { x: mouseX, y: mouseY },
        size: 1,
        angle: 0.01+Math.random()*0.04,
        speed: 0.01+Math.random()*0.04,
        targetSize: 1,
        fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
        orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
      };
      
      particles.push( particle );
    }
    lol();
  }

function lol() {
    
    context.shadowBlur = 3;
    
    if( mouseIsDown ) {
      // Scale upward to the max scale
      RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.1);
    }
    else {
      // Scale downward to the min scale
      RADIUS_SCALE += ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
    }
    
    RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );

parUpdate(mouseX, mouseY);

  }




  function parUpdate(x1, y1){
    
    for (i = 0, len = particles.length; i < len; i++) {
      var particle = particles[i];
      
particle.angle += particle.speed;
      
      // Follow mouse with some lag
      particle.shift.x += ( x1 - particle.shift.x) * (particle.speed);
      particle.shift.y += ( y1 - particle.shift.y) * (particle.speed);
      
      // Apply position
      particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
      particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
      
      // Limit to screen bounds
      particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
      particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );
      
      particle.size += ( particle.targetSize - particle.size ) * 0.05;
      
      if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
        particle.targetSize = 1 + Math.random() * 7;
      }
      
      context.beginPath();
      context.fillStyle = particle.fillColor;;
      context.moveTo(particle.position.x, particle.position.y);
      context.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI*2, true);
      context.fill();

    }
  }











                //stamp



  console.log(x0, y0);
  stampPrint = new Image();
  //stampPrint.src = 'uploads/firstPNG.png';
  stampPrint.src = stamp;
  console.log("246 " +stampPrint.src);


     context.mouseX = current.x;
     context.mouseY = current.y;

     current.x = x1;
     current.y = y1;

  context.drawImage(stampPrint, x1 - 100 , y1 - 200, 400, 400);
  




  //context.drawImage(stampPrint,0, 0, 200, 200);
  console.log("print stamp");



              //canvas style



  var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0"," magenta");
  gradient.addColorStop("0.2", "blue");
  gradient.addColorStop("0.5", "magenta");
// Fill with gradient
  //name = username;
  
  context.fillStyle = gradient;

  context.fillText(name, x0, y0);
    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;



  // parUpdate(w, h)

    if(emit){
      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        mouseX: mouseX,
        mouseY: mouseY,
        color: color,
        name: name,
        stamp: stamp
      });
      console.log(name);
      console.log(mouseX);

      parUpdate(mouseX, mouseY);
    }


  }



  function touchend(e){


//       drawing = true;
// drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, mouseX, mouseY, current.color, true, username, stamp);
//       mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
//       mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;

//       drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, mouseX, mouseY, current.color, true, username, stamp);
//       //makeStamp(current.x,current.y);
      
    

//   //}
}



  function onMouseDown(e){


    drawing = true;
mouseIsDown = true;
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, mouseX, mouseY, current.color, true, username, stamp);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
    //makeStamp(current.x,current.y);
    


    mouseX = current.x;
    mouseY = current.y;
  }



  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    mouseIsDown = false;
  }






  function TouchStartHandler(e) {
    event.touches.length == 1;
    event.preventDefault();
      drawing = true;
      mouseIsDown = true;
      // mouseX = Math.random(0, 1000);
      // mouseY = Math.random(0, 1000);
     //parUpdate(current.x, current.y)


      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;

    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;

      drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, mouseX, mouseY, current.color, true, username, stamp);
      //makeStamp(current.x,current.y);
      current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
     event.touches.length == 0;
     drawing = true;

    
  }

    function TouchClick(e) {
    event.touches.length == 1;
    event.preventDefault();
      drawing = true;
      mouseIsDown = true;
      // mouseX = Math.random(0, 1000);
      // mouseY = Math.random(0, 1000);
     //parUpdate(current.x, current.y)


      mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;

    // current.x = e.clientX||e.touches[0].clientX;
    // current.y = e.clientY||e.touches[0].clientY;

      drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, mouseX, mouseY, current.color, true, username, stamp);
      //makeStamp(current.x,current.y);
      current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
     event.touches.length == 0;
     drawing = true;
}
  
  function TouchMoveHandler(e) {
    event.touches.length == 1;
    //event.preventDefault();
      drawing = true;
mouseIsDown = true;

    // mouseX = event.clientX;
    // mouseY = event.clientY;
      // mouseX = Math.random(0, 1000);
      // mouseY = Math.random(0, 1000);
     //parUpdate(current.x, current.y)
      drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, mouseX, mouseY, current.color, true, username, stamp);
      //makeStamp(current.x,current.y);
      current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
     event.touches.length == 0;
     drawing = true;

    
  }
  
  function windowResizeHandler() {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
  }


  function onMouseMove(e){
    




    // console.log(mouseX , mouseY);
    

  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }






  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
     //     mouseX = event.clientX;
     // mouseY = event.clientY;
    //stampPrint();
    console.log(data.name);
    console.log(data.stamp);
    //console.log("hello world");
    //parUpdate(data.mouseX, data.mouseY);
    //console.log(parUpdate);
    console.log("stamp data" + data.stampPrint);
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.mouseX, data.mouseY, data.color, false, data.name, data.stamp);
    //loop(mouseX, mouseY);
  }






  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


  }    






});







 // var particles = {},
 //          particleIndex = 0,
 //          settings = {
 //            density: 20,
 //            particleSize: 10,
 //            startingX: canvas.width / 2,
 //            startingY: canvas.height / 4,
 //            fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
 //            gravity: 0.1
 //          };




 //      // Set up a function to create multiple particles
 //      function Particle() {
 //        // Establish starting positions and velocities
 //        this.x = settings.startingX;
 //        this.y = settings.startingY;

 //        // Determine original X-axis speed based on setting limitation
 //        this.vx = Math.random() * 20 - 10;
 //        this.vy = Math.random() * 20 - 5;

 //        // Add new particle to the index
 //        // Object used as it's simpler to manage that an array
 //        particleIndex ++;
 //        particles[particleIndex] = this;
 //        this.id = particleIndex;
 //        this.life = 0;
 //        this.maxLife = 100;
 //      }

 //      // Some prototype methods for the particle's "draw" function
 //      Particle.prototype.draw = function() {
 //        this.x += this.vx;
 //        this.y += this.vy;

 //        // Adjust for gravity
 //        this.vy += settings.gravity;

 //        // Age the particle
 //        this.life++;

 //        // If Particle is old, it goes in the chamber for renewal
 //        if (this.life >= this.maxLife) {
 //          delete particles[this.id];
 //        }

 //        // Create the shapes
 //        context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
 //        context.beginPath();
 //        context.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
 //        // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
 //        context.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2, true); 
 //        context.closePath();
 //        context.fill();

 //      }

 //      setInterval(function() {
 //        //context.fillStyle = "rgba(10,10,10,0.8)";
 //        //context.fillRect(0, 0, canvas.width, canvas.height);
 //          context.shadowBlur = 3;
 //        // Draw the particles
 //        for (var i = 0; i < settings.density; i++) {
 //          if (Math.random() > 0.99) {
 //            // Introducing a ran9om chance of creating a particle
 //            // corresponding to an chance of 1 per second,
 //            // per "density" value
 //            new Particle();
 //          }
 //        }

 //        for (var i in particles) {
 //          particles[i].draw();
 //        }
 //      }, 30);
 //    //init();





