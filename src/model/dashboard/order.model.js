const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: String,
  quantity: Number,
});

const MealSchema = new Schema({
  meals: [String],
});

const BillSchema = new Schema({
  totalAmount: { type: Number },
  mealsChosen: { type: [MealSchema] },
  mealsPerWeek: { type: Number },
  itemsPicked: { type: [ItemSchema] },
  servingPlan: { type: String },
});

const OrderSchema = new Schema({
  Fname: { type: String },
  Lname: { type: String },
  email: { type: String },
  address: { type: String },
  phone: { type: Number },
  billData: { type: [BillSchema] },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
