const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 name: String,
 email: String,
 password: String,
 isFixer: { type: Boolean, default: false },
 fee: { type: Number, default: null },
 postcode_localities: String,
 location: { type: { type: String }, coordinates: [Number] }
});



userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
