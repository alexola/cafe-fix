const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  pickupDate: Date,
  category: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fixer: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
        type: String,
        enum: ['fixed', 'broken'],
        default: 'broken'
    },
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;