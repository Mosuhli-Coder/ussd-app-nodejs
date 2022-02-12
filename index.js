const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000

// MODELS
const User = require('./models/user')


// MONGOODB CONNECTION
const database_url = 'mongodb://localhost:27017/ussd';
//const database_url = 'mongodb+srv://lereko:lereko@cluster0.1b4v0.mongodb.net/ussdb&ssl=true'
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
    else if(array.length === 2)
    {
      // ID NUMBER
      if(parseInt(array[1]) > 0)
      {
        //response = 'END Your fullname is '+ array[0] + '\n Your id number is '+ array[1]
        response = 'CON Please confirm if you want to save the data\n1. Confirm\n2. Cancel\n3. View Users'
      }
      else {
        response = 'END Network error. Please try again.'
      }
    }
    else if(array.length === 3){
      if(parseInt(array[2]) === 1)
      {
        let data = new User();
        data.fullname = array[0];
        data.id_number = array[1];
        data.save(() => {
          response = 'END Your data was saved successfully.'
        })
      }
      else if(parseInt(array[2]) === 2)
      {
        response = 'END Sorry, Data was not saved'
      }
      else if(parseInt(array[2]) === 3){
        User.find({},(err,users) => {
          let users_data = `${
            users.length < 1 ?
            `No data found`
            :
            `${
              users.map((item,index)=>{
                return `${index+1}, ${item.fullname}\n`
              }
            )}`
          }`
          response = `END Current users.\n${users_data}`
        })
      }
      else{
        response = "END Invalid input."
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
