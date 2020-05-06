const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: String,
    },
    review: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Review', reviewSchema);