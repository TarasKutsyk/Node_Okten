const {Schema, model} = require('mongoose');

const userScheme = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
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

module.exports = model('User', userScheme);
