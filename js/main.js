var url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
$.getJSON(url, function(data) {
    for (var i = 0; i < data.data.length; i++) {
        $('#x').append("<div>Movie Name: " + data.data[i][8]
                       + "<ul><li>Movie Year: " + data.data[i][9]
                       + "</li><li>Movie Location: " + data.data[i][10]
                       + '</li></ul></div>');
    }
});