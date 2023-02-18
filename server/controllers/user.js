let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the DB schema

let User = require('../models/userlist');

module.exports.displayUserList = (req,res,next) => {
    User.find((err,UserList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('users/userlist', 
            {title: 'Users', 
            UserList: UserList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req,res,next) => {
    res.render('users/add', {title: 'Add User', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req,res,next) => {
    let newUser = User({
        "fname": req.body.fname,
        "lname": req.body.lname,
        "contact": req.body.contact,
        "email": req.body.email,
        "location": req.body.location
    });

    User.create(newUser,(err,Book) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh user list
            res.redirect('/user-list');
        }
    });
}

module.exports.displayEditPage = (req,res,next) => {
    let id = req.params.id;
    User.findById(id,(err,userToEdit) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('users/edit', {title: 'Edit User Details', user: userToEdit,
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id;

    let updatedUser = User({
        "_id":id,
        "fname": req.body.fname,
        "lname": req.body.lname,
        "contact": req.body.contact,
        "email": req.body.email,
        "location": req.body.location
    });

    User.updateOne({_id: id}, updatedUser, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the user list
            res.redirect('/user-list');
        }
    });
}

module.exports.performDelete = (req,res,next) => {
    let id = req.params.id;

    User.remove({_id: id},(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the user list
            res.redirect('/user-list');
        }
    });
}