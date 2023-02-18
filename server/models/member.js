//require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//create a model class
let memberModel = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default:'',
            trim: true,
            required: 'username is required'
        },
        /*
        password:
        {
            type: String,
            default: '',
            trime: true,
            required: 'password is required'
        }
        */
        email:
        {
            type: String,
            default:'',
            trim: true,
            required: 'email address is required'
        },
        displayName:
        {
            type: String,
            default:'',
            trim: true,
            required: 'displayname is required'
        },
        created:
        {
            type: Date,
            default:Date.now
        },
        updated:
        {
            type: Date,
            default:Date.now
        }
    },
    {
        collection: "members" 
    }
);

//configure options for members model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});
memberModel.plugin(passportLocalMongoose, options);
module.exports.Member = mongoose.model('Member',memberModel);