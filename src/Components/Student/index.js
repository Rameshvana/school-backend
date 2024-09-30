import './index.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const class_url = `'https://school-backend-cy1l.onrender.com`

const StudentComponent = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    gender: '', 
    dob: '', 
    contactDetails: '', 
    class: '', 
    feesPaid: '' 
  });
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});
  const [classes, setClasses] = useState([]);
  console.log(classes)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://school-backend-cy1l.onrender.com/students');
        setStudents(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('https://school-backend-cy1l.onrender.com/classes');
        setClasses(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        const res = await axios.put(`https://school-backend-cy1l.onrender.com/students/${currentStudent._id}`, newStudent);
        //setStudents([...students, res.data]);
        setEditing(false);
      } else {
        const response = await axios.post('https://school-backend-cy1l.onrender.com/students', newStudent);
        setStudents([...students, response.data]);
      }
      setNewStudent({ 
        name: '', 
        gender: '', 
        dob: '', 
        contactDetails: '', 
        class: '', 
        feesPaid: '' 
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  const handleEdit = (student) => {
    setEditing(true);
    setCurrentStudent(student);
    setNewStudent({ 
      name: student.name, 
      gender: student.gender, 
      dob: student.dob, 
      contactDetails: student.contactDetails, 
      class: student.class, 
      feesPaid: student.feesPaid 
    });
  };

  const handleDelete = async (student) => {
    try {
      await axios.delete(`https://school-backend-cy1l.onrender.com/students/${student._id}`);
      setStudents(students.filter((s) => s._id !== student._id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Students</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Contact Details</th>
            <th>Class</th>
            <th>Fees Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.contactDetails}</td>
              <td>{student.class ? student.class.className : 'N/A'}</td>
              <td>{student.feesPaid}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(student)}>
                  <FaEdit />
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(student)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <h3>{editing ? 'Update Student' : 'Add New Student'}</h3>
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="form-control"
        />
        <select
          name="gender"
          value={newStudent.gender}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="date"
          name="dob"
          value={newStudent.dob}
          onChange={handleInputChange}
          placeholder="DOB"
          className="form-control"
        />
        <input type="text"
          name="contactDetails"
          value={newStudent.contactDetails}
          onChange={handleInputChange}
          placeholder="Contact Details"
          className="form-control"
        />
        <select
          name="class"
          value={newStudent.class}
          onChange={handleInputChange}
          className="form-control"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>{cls.className}</option>
          ))}
        </select>
        <input
          type="text"
          name="feesPaid"
          value={newStudent.feesPaid}
          onChange={handleInputChange}
          placeholder="Fees Paid"
          className="form-control"
        />
        <button type="submit" className="btn btn-success">
          {editing ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default StudentComponent;