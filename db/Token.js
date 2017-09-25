const mongoose = require('mongoose');
const User = require('./User');
const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            unique: true
        },
        expiry: {
            type: String,
            trim: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        access: {
            type: String
        },
        client: {
            type: String
        }
    },
    {
        timestamps: true,
        autoIndex: true
    }
);
const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;