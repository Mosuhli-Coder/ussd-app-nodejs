const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000

// MODELS
const user = require('./models/user')


// MONGOODB CONNECTION
//const database_url = 'mongodb+srv://tiger:tm19e97mt@cluster0.1b4v0.mongodb.net/test&ssl=true';
const database_url = 'mongodb+srv://lereko:lereko@cluster0.1b4v0.mongodb.net/ussdb&ssl=true'
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

app.post('/', (req, res)=>{
  const {phoneNumber, text, sessionId} = req.body;
  let response

  if(text==='')
  {
    response = 'CON Enter your first name'
  }
  if(text !== '')
  {
    let array = text.split('*');
    if(array.length === 1)
    {
      response = 'CON Enter your id number'
    }
    else if(array.length > 1)
    {
      // ID NUMBER
      if(parseInt(array[1]) > 0)
      {
        response = 'END Your fullname is '+ array[0] + 'Your id number is '+ array[1]
      }
      else {
        response = 'END Network error. Please try again.'
      }
    }
    else
    {
      response = 'END Network error, Please try again.'
    }

  }


  setTimeout(() => {
    res.send(response);
    res.end()
  }, 2000);
})






app.listen(PORT, () => {
  console.log('app running on port ' + PORT)
})
