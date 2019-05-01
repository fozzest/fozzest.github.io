var JSONURL = 'https://spreadsheets.google.com/feeds/list/1WH-7s6cqXnHE_KmZWvOUO0kSFxTHzRaOG-QKCjgvy6o/1/public/basic?alt=json';

https://spreadsheets.google.com/feeds/cells/1WH-7s6cqXnHE_KmZWvOUO0kSFxTHzRaOG-QKCjgvy6o/1/od6/public/basic?alt=json




// console.log("Go find Talia Cotton");

$(document).on("scroll", function() {
  if($(".filters").hasClass("opened")){
    // do nothing
  } else {
    if ($(document).scrollTop() > 100) {
      $("header").addClass("shrink");
    } else {
      $("header").removeClass("shrink");
    }
  }

});

$(document).on('click', '.shrink', function(){
  $("header").removeClass("shrink");
})




$(document).ready(function() {

  var filtersAdded = false;
  var is_mobile = false;
  var opened = false;
  var filters = [];
  var schools = [];
  var everything = ["semester"];
  var schoolSelected = "timestamp";

  var path = document.querySelector('#wave');
  var animation = document.querySelector('#moveTheWave');
  var m = 0.54;
  var allSchools = true;

  if( $('.row.headerRow').css('display')=='none') {
        is_mobile = true;
  }

    // function headerHeight(mobileBool, height){
    //   var headerHeight;
    //   if (mobileBool == true){
    //     headerHeight = 15 + height;
    //   } else {
    //     headerHeight = 30 + height;
    //   }
    //   return headerHeight;
    // }
    //
    // headerHeight(is_mobile, $("header").innerHeight());


  function buildWave(w, h) {
    var a = h / 4;
    var y = h / 2;
    var pathData = [
      'M', w * 0, y + a / 2,
      'c',
        a * m, 0,
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,

      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a,
      's',
        -(1 - a) * m, a,
        a, a,
      's',
        -(1 - a) * m, -a,
        a, -a
    ].join(' ');
    path.setAttribute('d', pathData);
  }
  buildWave(90, 60);


  $.ajax({
    url: JSONURL,
    success: function(data) {
      callback(data, everything);
    }
  });

  $(".mainContent").css({"margin-top": $("header").innerHeight() + "px"});

  $('header').hover(function(){
    $(this).removeClass("shrink");
  });

  $(".dropbtn").hover(function(){
    $(".dropdown-content").css({"display":"inherit"});
  });

  $(".dropbtn").click(function(){
    $(".dropdown-content").addClass("opened");
  });

  $(".dropdown-content, .headerContent").mouseleave(function(){
    $(".dropdown-content").css({"display":"none"});
  })

  $(".dropdown-content a").click(function(event) {
    var href = $(this).attr('name');
    $(".dropdown-content").removeClass("opened");
    $("#schoolSelected").html(href);
    $("#semester").css({"display":"inherit"});
    $(".dropdown-content").css({"display":"none"});

    schoolSelected = $(this).attr('id');

    $.ajax({
      url: JSONURL,
      success: function(data) {
        callback(data, [schoolSelected]);
      }
    });

    event.preventDefault();
  });

  $(document).on('click', '#info', function() {
      $('.info').css({"left":"0px"});
      $('.mainContent').css({"display":"none"});
  });

  $(document).on('click', '#back', function() {
      $('.mainContent').css({"display":"inherit"});
      $('.info').css({"left":"-200vw"});
  });

  $(document).on('click', '.done', function() {
      $('.filters').removeClass("opened");
  });


  $(document).on('click', '.filter', function() {
            // console.log(filters);
      var text = $(this).attr('id');
      var insertHTML="";

      if (is_mobile==true){

         if($(this).hasClass("selected")){
            // console.log("mobile, just deselected");
            $(this).removeClass("selected");
            var idx = filters.indexOf(text);
            if (idx != -1) filters.splice(text, 1);
         } else {
           $(this).addClass("selected");
          //  console.log("mobile, just selected");
           filters.push(text);
          //  console.log(filters);
         }
         $(".mainContent").css({"margin-top": $("header").innerHeight() + 30 + "px"});

       } else{
        //  console.log("not mobile");
           filters.push(text);
          //  $(".mainContent").css({"margin-top": $("header").innerHeight() + "px"});
           $(this).css({"display":"none"});
       }

       sentenceFilters(filters, insertHTML);

      $.ajax({
        url: JSONURL,
        success: function(data) {
          callback(data, filters);
        }
      });

      if (filters.length > 0){
        $(".clearAll").css({"display":"inherit"});
      }
      if(filters.length == 0){
        $('#insertFiltersHere').html("<span class='orangeText' id='everything'>everything</span>");
        $(".clearAll").css({"display":"none"});
        $.ajax({
          url: JSONURL,
          success: function(data) {
            callback(data, everything);
          }
        });
        $("#loading").fadeIn(10);

      }

      event.preventDefault();
  });

  $(document).on('click', '.orangeText', function() {
    if(is_mobile){
      $(".filters").addClass("opened");
      // $(".mainContent").css({"overflow":"hidden"});
    } else  {
      var filterId = $(this).attr('id');

      var idx = filters.indexOf(filterId);
      if (idx != -1) filters.splice(idx, 1);

      $(".filter").each(function(){
        if ($(this).attr('id') == filterId){
            $(this).css({"display":"inherit"});
        };
      })

      var insertHTML="";
      sentenceFilters(filters, insertHTML);

      $.ajax({
        url: JSONURL,
        success: function(data) {
          callback(data, filters);
        }
      });

      if(filters.length == 0){
        $('#insertFiltersHere').html("<span class='orangeText' id='everything'>everything</span>");
        $(".clearAll").css({"display":"none"});
        $.ajax({
          url: JSONURL,
          success: function(data) {
            callback(data, everything);
          }
        });
        $("#loading").fadeIn(10);
      }
    };


  });

  $(document).on('click','.clearAll', function(){
      filters = [];
      $('#insertFiltersHere').html("<span class='orangeText' id='everything'>everything</span>");
      $(".filter").each(function(){
           $(this).css({"display":"inherit"});
           $(this).removeClass("selected");
      })

      $.ajax({
        url: JSONURL,
        success: function(data) {
          callback(data, everything);
        }
      });

  });

  // $(document).on('click', '.orangeText', function(){
  //   if(is_mobile){
  //     $(".filters").addClass("opened");
  //     // console.log("true");
  //   };
  // });

  $(document).on('click', '.done', function() {
      $(".filters").removeClass("opened");
  });

  $(document).on('click', '.headerRow .thirdCol', function() {
      if (opened == false){
        $(".sort").addClass("opened");
        $("#bySchool").css({"display":"inherit"});
        $(".headerRow .thirdCol").addClass("opened");
        $(".sort").css({"height":"220px"});
        opened = true;
      } else {
        $(".sort").removeClass("opened");
        $(".headerRow .thirdCol").removeClass("opened");
        $("#byType").css({"display":"none"});
        $("#bySchool").css({"display":"none"});
        $(".sort").css({"height":"0px"});

        opened = false;
      }
  });

  $(document).on('click', '.headerRow .fourthCol', function() {
      if (opened == false){
        $(".sort").addClass("opened");
        $("#byType").css({"display":"inherit"});
        $("#bySchool").css({"display":"none"});
        $(".headerRow .fourthCol").addClass("opened");
        $(".sort").css({"height":"50px"});
        opened = true;
      } else {
        $(".sort").removeClass("opened");
        $(".headerRow .fourthCol").removeClass("opened");
        $("#byType").css({"display":"none"});
        $(".sort").css({"height":"0px"});
        opened = false;
      }
  });


  $(document).on('click','#bySchool ul li', function(){

    var schoolId = $(this).attr('id');
    // console.log(schoolId);
    if($(this).is(".disabled")){
      // do nothing
    } else {



    if(allSchools){
      allSchools = false;
      $("#bySchool ul li").addClass("unchecked");
      $(this).removeClass("unchecked");
      schools.push(schoolId);
    } else if($(this).hasClass("unchecked")){
      $(this).removeClass("unchecked");
      schools.push(schoolId);
    } else {
      $(this).addClass("unchecked");
      var idx = schools.indexOf(schoolId);
      if (idx != -1) schools.splice(idx, 1);
      $(".filter").each(function(){
        if ($(this).attr('id') == schoolId){
            $(this).css({"display":"inherit"});
        };
      })
    }


    var arr = filters.concat(schools);

    $.ajax({
      url: JSONURL,
      success: function(data) {
        callback(data, arr);
      }
    });

  }
  });

  $(document).on('click','#byType ul li', function(){
    // $(this).toggleClass("unchecked");
    var schoolId = $(this).attr('id');

    if(allSchools){
      allSchools = false;
      $("#byType ul li").addClass("unchecked");
      $(this).removeClass("unchecked");
      schools.push(schoolId);
    } else if($(this).hasClass("unchecked")){
      $(this).removeClass("unchecked");
      schools.push(schoolId);
    } else {
      $(this).addClass("unchecked");
      var idx = schools.indexOf(schoolId);
      if (idx != -1) schools.splice(idx, 1);
      $(".filter").each(function(){
        if ($(this).attr('id') == schoolId){
            $(this).css({"display":"inherit"});
        };
      })
    }


    var arr = filters.concat(schools);

    $.ajax({
      url: JSONURL,
      success: function(data) {
        callback(data, arr);
      }
    });
  });

  $(document).on('click','#byType ul li', function(){
    $(this).toggleClass("unchecked");
  });


  function sentenceFilters(array, htmlText){


      for (var i=0;i<array.length;i++){

        if (array.length < 2){
            htmlText = "<span class='orangeText' name='" + document.getElementById(array[0]).getAttribute("name") + "' id=" + array[0] + ">" + document.getElementById(array[0]).getAttribute("name") + "</span>";
            // console.log(htmlText);
        } else {
          // console.log(array[i]);
          // var test1=array[i]
          // var test2= "#"
          // var test3='#'+test1;
          // console.log(test3);

          // console.log( document.getElementById(array[i]));
          // console.log( document.getElementById(array[i]).getAttribute("name"));

           htmlText += "<span class='orangeText' name='" + document.getElementById(array[i]).getAttribute("name") + "' id=" + array[i] + ">" + document.getElementById(array[i]).getAttribute("name") + "</span>";

           if (i == array.length - 2){
              htmlText += " and ";
           } else if  (i < array.length - 1){
              htmlText += ", ";
            }
        }
      }

      $("#insertFiltersHere").html(htmlText);

  }


  function callback(data, keywords) {
    var rows = [];
    var insertedHTML = [];
    var cells = data.feed.entry;

    // console.log(cells);


    var lastUpdated = cells[0].updated.$t;

    for (var i = 0; i < cells.length; i++) {
      var rowObj = {};
      rowObj.timestamp = cells[i].title.$t;

      var rowCols = cells[i].content.$t.split(',');
      for (var j = 0; j < rowCols.length; j++) {
        var keyVal = rowCols[j].split(':');
        rowObj[keyVal[0].trim()] = keyVal[1].trim();
      }
      rows.push(rowObj);
    }

    var stringified = JSON.stringify(rows);
    var obj = JSON.parse(stringified);

    // console.log(obj);

    var indexes = [];

          for (var i = 0; i < obj.length; i++) {
                for (var a = 0; a < keywords.length; a++){

                  var lookFor = keywords[a];

                  if (obj[i][lookFor] && obj[i][schoolSelected]){

                    if (contains.call(indexes, i) == false) {

                      insertedHTML+=' <div class=" img col"> <img src="http://'+obj[i].pic+'" width="90%"></div> <div class="row col clearfix"> <div class="col firstCol">' + obj[i].timestamp + '</div><div class="col secondCol"><span>' + obj[i].description + '</span></div><div class="col thirdCol">' + obj[i].school + '</div><div class="col fourthCol">' + obj[i].type + '</div><div class="col fifthCol"><a target="_blank" href=http://' + obj[i].link + '><div class="goToLink"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1"xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons/Go-To-Link/Active" transform="translate(-1.000000, 0.000000)" fill="#FFC86C"><path d="M9.46417054,7.33656114 C9.4596705,7.34106117 9.45367045,7.33956116 9.44917041,7.34256119 C9.34866958,7.43856199 9.21366845,7.5000625 9.06216719,7.5000625 C8.7516646,7.5000625 8.4996625,7.2480604 8.4996625,6.93755781 L8.4996625,5.40604505 C6.81664848,5.64304702 5.3556363,7.04705872 4.45712881,8.87557396 C4.45712881,8.86507387 4.45712881,8.86057384 4.45262878,8.86507387 C4.40612839,8.94757456 4.33412779,9.000075 4.25012709,9.000075 C4.11362595,9.000075 3.999625,8.85457379 3.999625,8.67457229 C3.999625,5.33254444 5.94064118,2.5680214 8.4996625,1.98451654 L8.4996625,0.562504687 C8.4996625,0.2520021 8.7516646,0 9.06216719,0 C9.22716856,0 9.37116976,0.0720006 9.47317061,0.184501537 C10.478179,1.04700872 12.6216969,2.97452479 12.6216969,2.97452479 C13.121201,3.40202835 13.121201,4.09653414 12.6216969,4.5240377 C12.6216969,4.5240377 10.4496788,6.49055409 9.46417054,7.33656114 M11.4996875,12.0001 L2.4996125,12.0001 C1.67310561,12.0001 0.9996,11.3295944 0.9996,10.5000875 L0.9996,1.5000125 C0.9996,0.6720056 1.67310561,0 2.4996125,0 L6.99965,0 L6.99965,1.5000125 L2.87461563,1.5000125 C2.6676139,1.5000125 2.4996125,1.6680139 2.4996125,1.87501562 L2.4996125,10.1250844 C2.4996125,10.3320861 2.6676139,10.5000875 2.87461563,10.5000875 L11.1246844,10.5000875 C11.3316861,10.5000875 11.4996875,10.3320861 11.4996875,10.1250844 L11.4996875,8.25006875 L12.9997,6.75005625 L12.9997,10.5000875 C12.9997,11.3295944 12.3291944,12.0001 11.4996875,12.0001" id="Fill-1"></path></g></g></svg></div></a></div></div>'

                      indexes.push(i);

                    }

                  }

                }

          }



    $('.pulledContent').html(insertedHTML);

    $('.rightSidebar span').html(lastUpdated);

    $(".secondCol span").each(function() {
      var text = $(this).text();
      $(this).text(text.replace(/&&&&/g, ','));
    });

    $('#loading').fadeOut();

  }


  //var tooltipSpan = document.getElementById('level');

  window.onmousemove = function (e) {
      var x = e.clientX,
          y = e.clientY;
      document.getElementById('level').style.top = (y - 40) + 'px';
      document.getElementById('level').style.left = (x + 5) + 'px';
      document.getElementById('school').style.top = (y - 40) + 'px';
      document.getElementById('school').style.left = (x + 5) + 'px';
      document.getElementById('prereqs').style.top = (y - 40) + 'px';
      document.getElementById('prereqs').style.left = (x + 5) + 'px';
      document.getElementById('emmettBrown').style.top = (y + 5) + 'px';
      document.getElementById('emmettBrown').style.left = (x + 5) + 'px';

      document.getElementById('comingSoon1').style.top = (y - 40) + 'px';
      document.getElementById('comingSoon1').style.left = (x + 5) + 'px';
      document.getElementById('comingSoon2').style.top = (y - 40) + 'px';
      document.getElementById('comingSoon2').style.left = (x + 5) + 'px';
      document.getElementById('comingSoon3').style.top = (y - 40) + 'px';
      document.getElementById('comingSoon3').style.left = (x + 5) + 'px';
      document.getElementById('comingSoon4').style.top = (y - 40) + 'px';
      document.getElementById('comingSoon4').style.left = (x + 5) + 'px';

  };



    var contains = function(needle) {
        // Per spec, the way to identify NaN is that it is not equal to itself
        var findNaN = needle !== needle;
        var indexOf;

        if(!findNaN && typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var i = -1, index = -1;

                for(i = 0; i < this.length; i++) {
                    var item = this[i];

                    if((findNaN && item !== item) || item === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(this, needle) > -1;
    };


});
