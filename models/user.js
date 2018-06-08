const mongoose = require('mongoose');
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    addresses: [{
        type: Schema.Types.ObjectId,
        ref: 'address'
    }]
});


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
