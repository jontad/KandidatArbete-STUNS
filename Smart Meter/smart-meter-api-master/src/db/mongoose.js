require('dotenv').config();
/* const mongoose = require('mongoose');*/
/* ===================== */
/* === CONFIGURATION === */
/* ===================== */

/* MongoDB Connection Details */
const DB_ADDR = `${process.env.DB_ADDR}`;
const DB_PORT = `${process.env.DB_PORT}`;

/* MongoDB Authentication Details */
const DB_USER = `${process.env.DB_USER}`;
const DB_PASS = `${process.env.DB_PASS}`;

/* MongoDB Database */
const DB_NAME = `${process.env.DB_NAME}`;

/* mongodb://${DB_USER}:${DB_PASS}@${DB_ADDR}:${DB_PORT}/${DB_NAME} */
/*
mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_ADDR}:${DB_PORT}/${DB_NAME}`, {
   useNewUrlParser: true, 
   useCreateIndex: true,
   useUnifiedTopology: true
});
*/

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0.ab29i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
