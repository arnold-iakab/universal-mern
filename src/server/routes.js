import express from 'express';
import welcomeCtrl from './controllers/welcome';
import User from './models/user';
import Welcome from './models/welcome';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.get('/welcome', (req, res, next) => {
    return welcomeCtrl.getMessage(req, res);
});

router.get('/setup', (req, res) => {
    // create a sample user
    let nick = new User({
        username: 'myuser',
        password: 'password'
    });

    // save the sample user
    nick.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('User saved successfully');
        }
    });

    let welcomeMessage = new Welcome({
        message: 'Welcome to the danger zone!'
    });

    welcomeMessage.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Welcome message saved successfully');
        }
    });

    res.json({ success: true });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', (req, res) => {

    // find the user
    User.findOne({
        username: req.body.username
    }, (err, user) => {

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
                let token = jwt.sign(user, req.app.get('superSecret'), {
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

router.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
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

router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

router.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:3000/api');
});

export default router;
