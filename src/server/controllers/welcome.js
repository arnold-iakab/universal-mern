import Welcome from '../models/welcome';

const getMessage = (req, res) => {
    let query = Welcome.find();

    query.exec((err, results) => {
        res.end(JSON.stringify({ results: results[0] }));
    });
};

export default { getMessage };
