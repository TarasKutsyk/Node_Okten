const {Schema, model} = require('mongoose');

const {USER} = require('../../constants/databaseTables');

const userScheme = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    avatar: {type: String},
    docs: [{type: String}],
    products: [{type: Schema.Types.ObjectId}]
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

userScheme.virtual('userProducts', {
    ref: 'Product',
    localField: 'products',
    foreignField: '_id'
});

userScheme
    .pre(/^find/, function() {
        this.populate('userProducts');
    });

module.exports = model(USER, userScheme);
