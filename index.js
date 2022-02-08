const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000


// MONGOODB CONNECTION
const database_url = 'mongodb://localhost:27017/ussd';
mongoose.connect(database_url);
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err)
})
db.once('open', () => {
  console.log('Database is running.')
})

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=>{
  res.send('Success Message')
})






app.listen(PORT, () => {
  console.log('app running on port ' + PORT)
})
