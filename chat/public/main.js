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


  var current = {
    color: 'black'
  };
  var drawing = false;
  var fillTexter = false;



socket.on('login', (data) => {
      connected = true;
  

   // canvas.addEventListener('touchdown', onTouchDown, false);
   // canvas.addEventListener('toucheup', onTouchUp, false);

   // canvas.addEventListener('touchmove', throttle(onTouchMove, 10), false);

//    // Prevent scrolling when touching the canvas
// document.body.addEventListener("touchstart", function (e) {
//   if (e.target == canvas) {
//     e.preventDefault();
//   }
// }, false);
// document.body.addEventListener("touchend", function (e) {
//   if (e.target == canvas) {
//     e.preventDefault();
//   }
// }, false);
// document.body.addEventListener("touchmove", function (e) {
//   if (e.target == canvas) {
//     e.preventDefault();
//   }
// }, false);


 
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);
  console.log(username);

});

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);
  socket.on('fillTexter', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();



function makeStamp(x1, y1, stampPrint)
    {

}





var stamp;

window.onload=function(){

  document.getElementById("parisMap").addEventListener("click", clickSelect);
  document.getElementById("parisWall").addEventListener("click", clickSelectWall);





  function clickSelect() {
    console.log('hey');
    document.getElementById("parisMap").innerHTML = "YOU CLICKED ME!"; 
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
  document.getElementById("parisWall").innerHTML = "YOU CLICKED ME!";
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
}


function drawLine(x0, y0, x1, y1, color, emit, name, stamp){

    context.strokeStyle = color;
    context.lineWidth = 0;
    context.stroke();
    context.closePath();
    context.font = "30px Verdana";




// imgArray[0] = new Image();
// imgArray[0].src = 'uploads/firstPNG.png';

// imgArray[1] = new Image();
// imgArray[1].src = 'uploads/PNGPink.png';



  console.log(x0, y0);
  stampPrint = new Image();
  //stampPrint.src = 'uploads/firstPNG.png';
  stampPrint.src = stamp;
  console.log("246 " +stampPrint.src);
  //console.log("the stamp is called" + stamp);
  // stampPrint.onload = function(x1, y1){
  //context.rotate(Math.random(-1,2));
  context.drawImage(stampPrint, x0 - 50 , y0 - 100, 200, 200);
  




  //context.drawImage(stampPrint,0, 0, 200, 200);
  console.log("print stamp");


  var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0"," magenta");
  gradient.addColorStop("0.2", "blue");
  gradient.addColorStop("0.5", "red");
// Fill with gradient
  //name = username;
  context.fillStyle = gradient;
    context.fillText(name, x0, y0);
    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;





    if(emit){
      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
        name: name,
        stamp: stamp
      });
      console.log(name);
    }


  }










  function onMouseDown(e){

    //drawing = true;
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true, username, stamp);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
    makeStamp(current.x,current.y);
  }



  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
  }


// function onTouchDown(e){

//     drawing = true;

//     current.x = e.clientX||e.touches[0].clientX;
//     current.y = e.clientY||e.touches[0].clientY;
//     makeStamp(current.x,current.y);
// //
// }

// function onTouchUp(e){
//     if (!drawing) { return; }
//     drawing = false;
// //
// }

// function onTouchMove(e){
//     if (!drawing) { return; }
//     //drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true, username, makeStamp);
//     current.x = e.clientX||e.touches[0].clientX;
//     current.y = e.clientY||e.touches[0].clientY;
//     makeStamp(current.x,current.y);
// //
// }


  function onMouseMove(e){
    if (!drawing) { return; }
    //drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true, username, makeStamp);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
    makeStamp(current.x,current.y);
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
    //stampPrint();
    console.log(data.name);
    console.log(data.stamp);
    //console.log("hello world");
    console.log("stamp data" + data.stampPrint);
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, false, data.name, data.stamp);

  }






  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

});
