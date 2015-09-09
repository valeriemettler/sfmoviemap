var movies;

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
            console.log("null value");
        } else {
            x = x + '<div class="card"><div class="name">' + name + '</div><div class="info">  ';
            for (var j = 0; j < n.length; j++) {
                x = x + '<div class="location">' + n[j] + '</div>';
            }
        }
        x = x + "</div></div>";
    }
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
    movies = {};
    //movies = result;
    var b = locations(result);
    //console.log(b);
    //display(b); //display new movies dictionary locations to display function

    var y = display2(b);
    $("#x").html(y);
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





