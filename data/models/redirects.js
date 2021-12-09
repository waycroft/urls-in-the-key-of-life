var mongoose = require('mongoose');

const RedirectSchema = new mongoose.Schema({
    _id: String,
    original_url: String,
})
exports.Redirect = mongoose.model('Redirect', RedirectSchema, 'redirects');