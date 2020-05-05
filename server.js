const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const morgan = require('morgan')
const path = require('path');

app.listen(port, function () {
    console.log('server port', port)
})

//Imports of Schemas
const Review = require('./schemas/reviewSchema')

// App ~uses~
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));


// connection to mongodb
mongoose.connect('mongodb+srv://oleg:oleg123@cluster0-imopr.mongodb.net/Rivyoo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});
// app.use(express.static('../client/public'))




app.post('/newReview', (req, res) => {
    console.log(req.body)
    const { author, review, rating, bandName, banner } = req.body.state
    console.log('hi')
    let newReview = new Review({
        author: author,
        review: review,
        rating: rating,
        band: bandName.toUpperCase(),
        banner: banner,
    });
    newReview.save(function (err, newReview) {
        if (err) {
            return console.error(err)
        } else {
            console.log(newReview)
            res.send({ good: 'success' })
        }
    });
})
app.post('/getReviews', (req, res) => {
    Review.find({}).sort({ date: 'desc' }).exec(function (err, result) {
        if (err) {
            res.send({ err: 'error not found any' })
        }
        if (result) {
            res.send(result)
        }
    });
})
app.post('/sortfindReviews', (req, res) => {
    let { criteria, searchBy } = req.body
    let method = {};
    let order = 'desc'
    if (!searchBy) {
        if (criteria === 'Show All') {
            method = {}
        }
        if (criteria !== 'Show All') {
            method = { band: criteria.toUpperCase() }
        }
        if (criteria === 'Latest') {
            method = {}
            order = 'desc'
        }
        if (criteria === 'Oldest') {
            method = {}
            order = 'asc'
        }
    }
    if (searchBy) {
        if (searchBy === 'author') {
            method = { author: criteria }
        } else {
            method = { band: criteria.toUpperCase() }
        }
    }
    Review.find(method).sort({ date: order }).exec(function (err, result) {
        if (err) {
            console.log(err)
            res.send({ err: 'error not found any' })
        }
        if (result) {
            res.send(result)
        }
    });
})

//its should set node.env to production automatically once pushed to heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'))
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client','build', 'index.html'), function (err) {
            if (err) {
                res.status(500).send(err);
            }
        });
    });
}

