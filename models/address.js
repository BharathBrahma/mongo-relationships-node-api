const mongoose = require('mongoose');
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const AddressModel = mongoose.model('address', AddressSchema);

module.exports = AddressModel;
