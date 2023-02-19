let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const { authenticate } = require('passport');
let passport = require('passport');

//create the Member Model instance
let memberModel = require('../models/member');
let Member = memberModel.Member;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutMe = (req, res, next) => {
    res.render('about', {title: 'About Me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjects = (req, res, next) => {
    res.render('projects', {title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServices = (req, res, next) => {
    res.render('services', {title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactMe = (req, res, next) => {
    res.render('contact', {title: 'Contact Us', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res, next) => {

    //check if user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server errr?
        if(err)
        {
            return next(err);
        }
        //is there a user login error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error: Invalid username or password.');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/user-list');
        });
    }
    )(req,res,next);
}

module.exports.displayRegisterPage = (req,res,next) => {
    //check if user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res,next) => {
    //instantiate a member object
    let newMember = new Member({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    Member.register(newMember, req.body.password, (err)=>{
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //if no error exists, then registration successful

            //redirect user and authenticate them
            return passport.authenticate('local')(req,res, () => {
                res.redirect('/user-list')
            });
        }
    });
}

module.exports.performLogout = (req,res,next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        // do something
      });
    res.redirect('/');
}