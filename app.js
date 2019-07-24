var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/NodeCourse');

http.listen(3000, function(){
    console.log('Server is running on port 3000');
});


app.get('/', function(req , res){
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
    console.log('a user connection');


    socket.on('disconnect' , function(){
        console.log('disconnect user');
    });
});

