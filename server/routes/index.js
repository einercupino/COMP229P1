//Einer Cupino - 301233614 - COMP229 Section 004 - Feb 3, 2022

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* HOME */
router.get('/', indexController.displayHomePage);

/* HOME */
router.get('/home', indexController.displayHomePage);

/* ABOUT US */
router.get('/about', indexController.displayAboutMe);

/* PRODUCTS */
router.get('/projects', indexController.displayProjects);

/* SERVICES */
router.get('/services', indexController.displayServices);

/* CONTACT US */
router.get('/contact', indexController.displayContactMe);

/* GET Route for the displaying Login page - ACCESS Operation */
router.get('/login', indexController.displayLoginPage);

/* POST Route for the processing the Login page - ACCESS Operation */
router.post('/login', indexController.processLoginPage);

/* GET Route for the displaying Register page - ACCESS Operation */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for the processing the Register page - ACCESS Operation */
router.post('/register', indexController.processRegisterPage);

/* GET request to perform Logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
