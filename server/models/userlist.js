let mongoose = require('mongoose');

//create a model class
let userModel = mongoose.Schema({
    fname: String,
    lname: String,
    contact: String,
    email: String,
    location: String
},
{
    collection: "userlist" 
});

module.exports = mongoose.model('Users',userModel);