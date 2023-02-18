let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

// connect to our Book Model
let userController = require('../controllers/user')

//helper function for guard purposes
function requireAuth(req,res,next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ Operation */
router.get('/', userController.displayUserList);

/* GET Route for the displaying Add page - CREATE Operation */
router.get('/add', requireAuth, userController.displayAddPage);

/* POST Route for the processing the Add page - CREATE Operation */
router.post('/add', requireAuth, userController.processAddPage);

/* GET Route for the displaying Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, userController.displayEditPage);

/* POST Route for the processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, userController.processEditPage);

/* GET request to perform book deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, userController.performDelete);


module.exports = router; //db