var express = require('express');
var router = express.Router();
var welcomeCtrl = require('./controllers/welcome');
var User = require('./models/user'); // get our mongoose model
var Welcome = require('./models/welcome');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.get('/welcome', function (req, res, next) {
    return welcomeCtrl.getMessage(req, res);
});

router.get('/setup', function (req, res) {
    // create a sample user
    var nick = new User({
        username: 'myuser',
        password: 'password'
    });

    // save the sample user
    nick.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('User saved successfully');
        }
    });

    var welcomeMessage = new Welcome({
        message: 'Welcome to the danger zone!'
    });

    welcomeMessage.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Welcome message saved successfully');
        }
    });

    res.json({ success: true });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function (req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, req.app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

router.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:3000/api');
});

module.exports = router;
