var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name :  { type: String , require:true },
    email : { type: String , require:true },
    created_at : Date,
    updated_at : Date
});

UserSchema.pre('save',function(next){
    var currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at)
        this.created_at = currentDate;

    next();
});


var User = mongoose.model('User' , UserSchema);

module.exports = User;