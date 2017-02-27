const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// CONNECTING TO THE DATABASE AND LISTENING ON PORT 3000
MongoClient.connect('mongodb://test_database_01:H2s04_db@ds135069.mlab.com:35069/quotes-test', (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});

// CREATE
app.post('/quotes', (req, res) => {
    db.collection('quotes')
        .save(req.body, (err, result) => {
            if (err) return console.log(err);
            console.log('saved to database');
            res.redirect('/');
        });
});

// READ
app.get('/', (req, res) => {
    db.collection('quotes')
        .find().toArray((err, result) => {
            if (err) return console.log(err);
            res.render('index.ejs', { quotes: result });
            console.log('display index.ejs with new entry');
        });
});

// UPDATE
app.put('/quotes', (req, res) => {
    db.collection('quotes')
        .findOneAndUpdate({ name: 'Foo' }, {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, {
            sort: { _id: -1 },
            upsert: true
        }, (err, result) => {
            if (err) return res.send(err);
            res.send(result);
        });
});

//DELETE
app.delete('/quotes', (req, res) => {
    db.collection('quotes')
        .findOneAndDelete({ name: req.body.name },
            (err, result) => {
                if (err) return res.send(500, err);
                res.json('A Bar quote got deleted');
            });
});
