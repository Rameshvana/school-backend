import './index.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import SharedComponent from '../SharedComp/index'


const teacher_headers = ['#','Name','Gender','Dob','Contact Details','Salary','Assigned Class','Actions']


const class_url = 'https://school-backend-cy1l.onrender.com'


const TeacherComponent = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    gender: '',
    dob: '',
    contactDetails: '',
    salary: '',
    assignedClass: '',
  });
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('https://school-backend-cy1l.onrender.com/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('https://school-backend-cy1l.onrender.com/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      axios.put(`https://school-backend-cy1l.onrender.com/teachers/${selectedTeacher._id}`, newTeacher)
        .then(response => {
          setTeachers(teachers.map((teacher) => teacher._id === selectedTeacher._id ? response.data : teacher));
          setNewTeacher({
            name: '',
            gender: '',
            dob: '',
            contactDetails: '',
            salary: '',
            assignedClass: '',
          });
          setIsEditing(false);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios.post('https://school-backend-cy1l.onrender.com/teachers', newTeacher)
        .then(response => {
          setTeachers([...teachers, response.data]);
          setNewTeacher({
            name: '',
            gender: '',
            dob: '',
            contactDetails: '',
            salary: '',
            assignedClass: '',
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleDelete = (teacherId) => {
    axios.delete(`https://school-backend-cy1l.onrender.com/teachers/${teacherId}`)
      .then(() => {
        setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setNewTeacher(teacher);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1>Teachers</h1>
      <table className="table-auto">
        <thead>
          <tr>
            {teacher_headers.map((each, index) => (
              <th key={index}>{each}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={teacher._id}>
              <td>{index + 1}</td>
              <td>{teacher.name}</td>
              <td>{teacher.gender}</td>
              <td>{new Date(teacher.dob).toLocaleDateString()}</td>
              <td>{teacher.contactDetails}</td>
              <td>{teacher.salary}</td>
              <td>{teacher.assignedClass ? teacher.assignedClass.className : 'N/A'}</td>
              <td>
                <button className="action-button edit-button" onClick={() => handleEdit(teacher)}>
                  <FaEdit />
                </button>
                <button className="action-button delete-button" onClick={() => handleDelete(teacher._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} className="teacher-form">
        <h3>{isEditing ? 'Update Teacher' : 'Add New Teacher'}</h3>
        <div className="form-group">
          <input
            type="text"
            value={newTeacher.name}
            onChange={(event) => setNewTeacher({ ...newTeacher, name: event.target.value })}
            className="input-field"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <select
            value={newTeacher.gender}
            onChange={(event) => setNewTeacher({ ...newTeacher, gender: event.target.value })}
            className="input-field"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value ="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="date"
            value={newTeacher.dob}
            onChange={(event) => setNewTeacher({ ...newTeacher, dob: event.target.value })}
            className="input-field"
            placeholder="DOB"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={newTeacher.contactDetails}
            onChange={(event) => setNewTeacher({ ...newTeacher, contactDetails: event.target.value })}
            className="input-field"
            placeholder="Contact Details"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            value={newTeacher.salary}
            onChange={(event) => setNewTeacher({ ...newTeacher, salary: event.target.value })}
            className="input-field"
            placeholder="Salary"
          />
        </div>
        <div className="form-group">
          <select
            value={newTeacher.assignedClass}
            onChange={(event) => setNewTeacher({ ...newTeacher, assignedClass: event.target.value })}
            className="input-field"
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>{classItem.className}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">{isEditing ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default TeacherComponent;