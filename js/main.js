var url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
$.getJSON(url, function(data) {
    for (var i = 0; i < data.data.length; i++) {
        $('#x').append('<div class="card"><div class="name">' + data.data[i][8]
                       + '</div><div class="info"><div class="location"><img src="img/mappin2.png"></img>  '  + data.data[i][10]
                       + '</div><div class="year">' + data.data[i][9]
                       + '</div></div></div>');
    }
});