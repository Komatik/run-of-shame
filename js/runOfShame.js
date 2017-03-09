'use strict'

var express = require('express');
var app = express();
var path = require("path")
var url = require("url")
var finisherArray = []
var mongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/test';

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/runofshame", (request, response) => {
    if(request.socket.remoteAddress == "::ffff:192.168.23.109"){
        response.sendFile(__dirname.substring(0,__dirname.length - 3) + "/index.html")
    } else {
        response.send('<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/fmz-K2hLwSI?ecver=2&rel=0&autoplay=1" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen ></iframe></div>')
    }
})

app.get("/*.js", (request, response) => {
    if(request.socket.remoteAddress == "::ffff:192.168.23.109"){
        response.sendFile( path.join(__dirname + (url.parse(request.url).pathname).substring((url.parse(request.url).pathname).lastIndexOf("/"))));
    } else {
        response.send('<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/fmz-K2hLwSI?ecver=2&rel=0&autoplay=1" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen ></iframe></div>')
    }
})

app.get("/*.css", (request, response) => {
    if(request.socket.remoteAddress == "::ffff:192.168.23.109"){
        response.sendFile( path.join(__dirname.substring(0,__dirname.length - 3) + url.parse(request.url).pathname));
    } else {
        response.send('<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/fmz-K2hLwSI?ecver=2&rel=0&autoplay=1" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen ></iframe></div>')
    }
})

app.get("/data", (request, response) => {
    if(request.socket.remoteAddress == "::ffff:192.168.23.109"){
        getMongoData(response)
    } else {
        response.send('<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/fmz-K2hLwSI?ecver=2&rel=0&autoplay=1" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen ></iframe></div>')
    }
})

app.post('/addRunner', function (req, res) {
    postMongoData(req.body)
    res.end('{"message" : "Added Successfully", "status" : 200}');
});

app.listen(8085)

function getMongoData(response){
    finisherArray.length = 0
    mongoClient.connect(mongoUrl, function (err, db) {
        console.log("Connected successfully to server");

        var collection = db.collection('records');

        collection.find().toArray(function (err, docs) {

            docs.forEach(function (element) {
                var jsonObj = {
                    naam: element.naam,
                    voornaam: element.voornaam,
                    gender: element.gender,
                    minuten: element.tijd.minuten,
                    seconden: element.tijd.seconden
                }
                finisherArray.push(jsonObj)
            });
            response.send(finisherArray)
            db.close();
        });
    });
}

function postMongoData(finisherObj){
    mongoClient.connect(mongoUrl, function(err, db) {
        var collection = db.collection('records');
        collection.insertOne({
            naam:finisherObj.l_name,
            voornaam:finisherObj.f_name,
            gender:finisherObj.gender,
            tijd:{minuten:finisherObj.m_time, seconden:finisherObj.s_time}},function(err, result){
            console.log(result.insertedCount)
        })
        db.close()
    });
}