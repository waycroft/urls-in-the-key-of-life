var mongoose = require('mongoose');

const RedirectSchema = new mongoose.Schema({
    original_url: String,
    short_url: String
})
exports.Redirect = mongoose.model('Redirect', RedirectSchema, 'redirects');