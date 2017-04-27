var Welcome = require('../models/welcome');

exports.getMessage = function (req, res) {
    var query = Welcome.find();

    query.exec(function (err, results) {
        res.end(JSON.stringify({ results: results[0] }));
    });
};