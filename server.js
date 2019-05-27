const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use(function (req, res, next) {
    console.log('req.url', req.url);
    next();
});

let quizzlist = {};
app.get('/ws/quizzlist', (req, res, next) => {
    res.json(quizzlist);
});

app.post('/ws/quizzlist', (req, res, next) => {
    quizzlist = req.body;
    res.status(204).end();
});

const htdocs = '../quizz/dist/quizz';
app.use(express.static(htdocs));
app.use(serveIndex(htdocs, {
    icons: true
}));

app.use('/', (req, res, next) => {
    res.sendFile('./quizz/index.html', {
        root: __dirname,
    });
});

app.use(function (req, res, next) {
    console.log('404: Page not Found', req.url);
    next();
});

const port = 5000;
app.listen(port, function () {
    console.log('server started on port ' + port);
});
