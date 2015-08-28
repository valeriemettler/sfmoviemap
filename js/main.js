var url = 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD';
$.getJSON(url, function(data) {
    console.log(data.data[10][8]);
    console.log(data.data[10][9]);
    console.log(data.data[10][10]);
});