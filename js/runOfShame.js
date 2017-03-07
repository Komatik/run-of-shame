'use strict'

var express = require('express');
var app = express();

app.get("/runofshame", (request, response) => {
    if(request.socket.remoteAddress == "::ffff:192.168.23.109"){
        response.sendFile(__dirname + "/index.html")
    } else {
        response.send('<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/fmz-K2hLwSI?ecver=2&rel=0&autoplay=1" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen ></iframe></div>')
    }
})
 
app.listen(8085)