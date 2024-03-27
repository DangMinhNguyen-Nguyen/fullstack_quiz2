const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const bodyParser = require("body-parser")

// app.use(bodyParser.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object

// const URI ="mongodb+srv://tester1:123@cluster0.mio55fa.mongodb.net/books"
// const URI = "mongodb://localhost:27017/Mybooks"
// 

// This Activitry creates the collection called activitimodels

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  try{

    // get the data from the form
    
  const newURL = await req.body.myuri
  
  console.log(newURL);

  // connect to the database and log the connection

  //build database

   mongoose
      .connect(newURL, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(()=>{
          console.log('connected to MOngodb Server')
      })
      .catch((err)=>{
          console.log('Error Connecting to MongoDB ' +err)
      });

      const Schema = mongoose.Schema

      const studentSchema = new Schema(
          {
              name:{type:String, required: true},
              studentID: {type:Number, required:true},
          }
      )

      const Student = mongoose.model("w24students", studentSchema)



      
      const newStudent = new Student(
        {name:"Dang Minh Nguyen, Nguyen",
        studentID:300364708})

        console.log()

      Student.insertMany([newStudent])
  //---
  

  

  // add the data to the database

  // send a response to the user
      await res.send(`<h1>Document  Added</h1>`);

  }
  catch(err){
    console.log("Errors message")
    // res.status(500).json({message: err.message})
  }
});

app.listen(port, () => {
  console.log(`Servers is running on port: ${port}`);
});
