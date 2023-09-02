const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    library: {
        type: [String],
        required: true
    },
    // Define your schema fields here
});

module.exports  = mongoose.model('Library', librarySchema);