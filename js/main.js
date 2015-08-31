var movies;

var display = function () {
    $('#x').html("");
    for (var i = 0; i < movies.data.length; i++) {
        $('#x').append('<div class="card"><div class="name">' + movies.data[i][8]
                       + '</div><div class="info"><div class="location"><img src="img/mappin2.png"></img>  '  + movies.data[i][10]
                       + '</div><div class="year">' + movies.data[i][9]
                       + '</div></div></div>');
    }
}

var url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
$.getJSON(url, function(result) {
    movies = result;
    display();
});


$('#sort-year').click(function(){
    movies.data.sort(function (a,b) {
        var j = parseInt(a[9]);
        var k = parseInt(b[9]);
        if (j < k) {return -1};
        if (j > k) {return 1};
        if (j === k) {return 0};
    });
    display();
});



