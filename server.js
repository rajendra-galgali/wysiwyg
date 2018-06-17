let express = require('express');
let datamuse = require('datamuse');
let app = express();

const port = 3000;

app.use(express.static('src'));
app.use('/lib', express.static('node_modules'));

app.get('/rajendra', function(req, res, next) {
    let request = {};
    request[req.query.synonyms] = req.query.text;
    if (req.query.max) {
        request['max'] = req.query.max;
    }
    datamuse.words(request)
        .then((json) => {
            res.send(json);
        });
})

app.listen(port, function() {
    console.log("server running on port", port);
})