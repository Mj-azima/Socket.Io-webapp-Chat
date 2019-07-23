var express = require('express');
var app = express();
var http = require('http').createServer(app);



http.listen(3000, function(){
    console.log('Server is running on port 3000');
});


app.get('/', function(req , res){
    res.send('chat');
});
