var movies = {};

// var map;
// function initMap() {
// var myLatLng = {lat: 37.764222, lng: -122.423369};
// map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 37.7833, lng: -122.4167},
//     zoom: 12
//   });
//    var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
    //title: 'SF Movie Map'
//   });
// }

/*
var map;
var markers = [];

function initMap() {

var myLatLng = {lat: 37.764222, lng: -122.423369};

map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 12
  });

//event listener calls addMarker when map is clicked:
map.addListener('click', function(event)){
    addMarker(event.latLng);
}

//adds marker to map and pushes to markers array:
function addMarker(location){
   var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    //title: 'SF Movie Map'
  });
 markers.push(marker);
}

//sets the map on all markers in the array??
function setMapOnAll(map){
    for(var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

//deletes all markers in the array
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
}*/

var map;
function initMap() {
var myLatLng = {lat: 37.764222, lng: -122.423369};
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7833, lng: -122.4167},
    zoom: 12
  });


var geocoder = new google.maps.Geocoder();

//change this to link to address of movie clicked
document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

 //makes google map responsive when not given a specified width
 google.maps.event.addDomListener(window, 'load', initialize);
 google.maps.event.addDomListener(window, "resize", function() {
 var center = map.getCenter();
 google.maps.event.trigger(map, "resize");
 map.setCenter(center);
 });

}

//original display function with name, year, and location and location pin image:
// var display = function () {
//     $('#x').html("");
//     for (var i = 0; i < movies.data.length; i++) {
//         $('#x').append('<div class="card"><div class="name">' + movies.data[i][8]
//                        + '</div><div class="info"><div class="location"><img src="img/mappin2.png"></img>  '  + movies.data[i][10]
//                        + '</div><div class="year">' + movies.data[i][9]
//                        + '</div></div></div>');
//     }
// };

//displays movies with null locations:
// var display2 = function (m) {
//     var x = "";
//       for (var name in m) {
//         if (m.hasOwnProperty(name)){

//         x = x + '<div class="card"><div class="name">' + name
//         + '</div><div class="info">  ';

//         var n = m[name];
//         for (var j = 0; j < n.length; j++) {
//             x = x + '<div class="location">' + n[j]  + '</div>';
//         }
//         x = x + "</div></div>";
//       }
//      }
//    return x;
// };

//displays movies without null locations, but has duplicate locations per movie
var display2 = function(m) {
    var x = "";
    for (var name in m) {
        if (m.hasOwnProperty(name)) {
            var n = m[name];
        }
        if (n[0] === null) {
            console.log("movies with null location values");
        } else {
            x = x + '<div class="card"><div class="name dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle"><p>' + name + '</p><span class="caret"></span></a><ul class="dropdown-menu">  ';
            for (var j = 0; j < n.length; j++) {
                x = x + '<li><a href="#">' + n[j] + '</a></li>';
            }
        }
        x = x + "</ul></div></div>";
    }
    if (x === "") {x = '<div class="card"><div class="name"><p>No movies found.</p></div></div>';}
    return x;
}

var locations = function (a) {
    var output = {};
    for (var i = 0; i < a["data"].length; i++) {
         if (a["data"][i][8] in output) {
             output[a["data"][i][8]].push(a["data"][i][10]);
         } else {
        output[a["data"][i][8]] = [a["data"][i][10]];
         }
    }
    return output;
};



var url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
$.getJSON(url, function(result) {
    //console.log(result);///take from result and put into temp
    //movies = result;
    movies = locations(result);
    //console.log(b);
    //display(b); //display new movies dictionary locations to display function
    h = display2(movies);
    $("#x").html(h);

});

jQuery('#search').on('input', function() {
  console.log("in filtering fn");
   var search = jQuery('#search').val();
   search = search.toLowerCase().replace('-','').replace(' ','');
   console.log(search);

  function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  var b = toTitleCase(search);

  var movies_filtered = {};
  //fn to iterate over movies dictionary and create movies_filtered dictionary
    var searchMovies = function (m) {
      for (var name in m) {
        if (m.hasOwnProperty(name)) {
          //name = name.toLowerCase().replace('-','').replace(' ','');
          //console.log(name);
          //console.log(search);
          var currname = name;
          currname = currname.toLowerCase().replace('-','').replace(' ','');
          if (currname.indexOf(search) != -1) {
            movies_filtered[name] = m[name];
          }
        }
      }
    }
    searchMovies(movies);

  //movies_filtered = {meow:[]};
  h = display2(movies_filtered);
  $("#x").html(h);

});


// $('#sort-year').click(function(){
//     movies.data.sort(function (a,b) {
//         var j = parseInt(a[9]);
//         var k = parseInt(b[9]);
//         if (j < k) {return -1};
//         if (j > k) {return 1};
//         if (j === k) {return 0};
//     });
//     display();
// });





