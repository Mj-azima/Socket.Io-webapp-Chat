var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/NodeCourse');

var User = require('./model/user');


http.listen(3000, function(){
    console.log('Server is running on port 3000');
});


app.get('/', function(req , res){
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
    console.log('a user connection');
    
    socket.on('new user' , function(data , callback){
        new User({
            name : data.name,
            email : data.email
        }).save(function(err , user){
            if (!user){
                callback(false);
                return;
            }

            callback(true);
            
            socket.username = user.name;
            socket._id = user._id;

            io.emit('new user', { username : socket.username});
        });
    });

    socket.on('disconnect' , function(){
        User.findByIdAndRemove(socket._id , function(err){
            if(err) throw err;
        });
        io.emit('disconnect' , {name : socket.username});
    });
});

