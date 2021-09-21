const mongoose = require('mongoose');
require('dotenv/config');

module.exports = () => {
  mongoose.connect(process.env.DB_CONNECT, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: true 
  }, () => console.log('Connected to DB!'));
}