const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
let port = process.env.PORT ||  3000;
const client = new MongoClient(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  module.exports = client 
  const app = require('./index') 
  app.listen(port) 
});



