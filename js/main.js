var movies = {};
var abc = [];
var oldmarker;

var map;
var geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 37.7833,
            lng: -122.4167
        },
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress_manual(geocoder, map);
    });
}

function geocodeAddress_manual(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                icon: 'img/greenmarker.png'
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function geocodeAddress(geocoder, resultsMap, address) {
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                icon: 'img/greenmarker.png'

            });
            if (typeof oldmarker !== "undefined") {
                oldmarker.setMap(null);
            }
            oldmarker = marker;
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
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


var locations = function(a) {
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

var display2 = function(m) {
    var x = "";
    for (var name in m) {
        if (m.hasOwnProperty(name)) {
            var n = m[name];

            if (n[0] === null) {
            } else {
                x = x + '<div class="card">' +
                    '<img src="img/posters/' + name + '.jpg" alt="' + name + '" title="' + name + '" />' +
                    '<div class="name dropdown">' +

                    '<a href="#" data-toggle="dropdown" class="dropdown-toggle"><p class="movie-name">'
                    + name + '</p></a><ul class="dropdown-menu">';

                for (var j = 0; j < n.length; j++) {
                    x = x + '<li><a href="#">' + n[j] + '</a></li>';
                }
            }
            x = x + "</ul></div></div>";
        }
    }

    if (x === "") {
        x = '<div class="card"><div class="name"><p>No movies found.</p></div></div>';
    }
    return x;
}

var display2 = function(m) {
    var x = "";
    for (var name in m) {
        if (m.hasOwnProperty(name)) {
            var n = m[name];

            if (n[0] === null) {
            } else {
                x = x + '<div class="card">' +
                    '<img src="img/posters/' + name + '.jpg" alt="' + name + '" title="' + name + '" />' +
                    '<div class="name dropdown">' +

                    '<a href="#" data-toggle="dropdown" class="dropdown-toggle"><p class="movie-name">'
                    + name + '</p></a><ul class="dropdown-menu">';

                for (var j = 0; j < n.length; j++) {
                    x = x + '<li><a href="#">' + n[j] + '</a></li>';
                }
            }
            x = x + "</ul></div></div>";
        }
    }

    if (x === "") {
        x = '<div class="card"><div class="name"><p>No movies found.</p></div></div>';
    }
    return x;
}

var getData = function () {
    var url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
    $.getJSON(url, function(result) {
        movies = locations(result);
        h = display2(movies);
        $("#x").html(h);
        $('#x').on('click', '.card', function(e) {
            e.stopPropagation();
            var that = this;
            var movie_name = $(that).find('.movie-name').first().text();
            var address = movies[movie_name][0] + ", San Francisco, CA";
            geocodeAddress(geocoder, map, address);
        });
    });
}


var handleSearch = function() {
        jQuery('#search').on('input', function() {
        var search = jQuery('#search').val();
        search = search.toLowerCase().replace('-', '').replace(' ', '');
        var movies_filtered = {};

        var searchMovies = function(m) {
            for (var name in m) {
                if (m.hasOwnProperty(name)) {
                    var currname = name;
                    currname = currname.toLowerCase().replace('-', '').replace(' ', '');
                    if (currname.indexOf(search) != -1) {
                        movies_filtered[name] = m[name];
                    }
                }
            }
        }
        searchMovies(movies);
        h = display2(movies_filtered);
        $("#x").html(h);
    });
};

$(document).ready(function() {
    getData();
    handleSearch();
});
