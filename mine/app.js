const express = require('express')
const mongoose = require('mongoose')
const  dotEnv = require('dotenv')
const cors = require('cors')
const app = express();

//const Student = require("./Schema/Student");
//const Students = require('./student')
const Student = require('./schema/Student')
const Class = require('./schema/Class')
const Teacher = require('./schema/Teacher')

dotEnv.config()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())

async function ConnectDb() {
  try {
    await mongoose.connect(process.env.mango_Url);
    console.log("MongoDb connection Succesfuully....");
    app.listen(PORT, () => {
      console.log(`Server is running at localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MongoDb connection failed :  ", error);
  }
}

ConnectDb()

app.get('/', (req,res) => {
   res.send('Hi Ramesh Vanaparthi')         
})








// Class crud Operations 
app.post('/classes', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).send(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating class' });
  }
});

app.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher students');
    res.send(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error getting classes' });
  }
});

app.put('/classes/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating class' });
  }
});

app.delete('/classes/:id', async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.send({ message: 'Class deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting class' });
  }
});




/// Teacher crud Operations
app.post('/teachers', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).send(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating teacher' });
  }
});

app.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('assignedClass');
    res.send(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error getting teachers' });
  }
});

app.put('/teachers/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating teacher' });
  }
});

app.delete('/teachers/:id', async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.send({ message: 'Teacher deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting teacher' });
  }
});





/// Student crud Operations
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating student' });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find().populate('class');
    res.send(students);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error getting students' });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating student' });
  }
});


app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: 'Student deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting student' });
  }
});





