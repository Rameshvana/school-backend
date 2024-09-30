
import './index.css'



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';


const class_url = `https://school-backend-cy1l.onrender.com`


const ClassComponent = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ className: '', year: '', teacher: '', studentFees: '' });
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get(`${class_url}/classes`)
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`${class_url}/teachers`)
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newClass.className || !newClass.year || !newClass.teacher ||  !newClass.studentFees) {
      alert('Please fill in all fields');
      return;
    }

    if (editing) {
      console.log(newClass)
      axios.put(`${class_url}/classes/${newClass._id}`, newClass)
        .then(response => {
          setClasses(classes.map((classItem, index) => index === currentIndex ? response.data : classItem));
          setEditing(false);
          setNewClass({ className: '', year: '',  teacher: '', studentFees: '' });
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log(newClass)
      axios.post(`${class_url}/classes`, newClass)
        .then(response => {
          setClasses([...classes, response.data]);
          setNewClass({ className: '', year: '',  teacher: '', studentFees: '' });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${class_url}/classes/${id}`)
      .then(response => {
        setClasses(classes.filter((classItem) => classItem._id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = (index) => {
    setEditing(true);
    setCurrentIndex(index);
    setNewClass(classes[index]);
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">Classes</h1>
      <table className="table-auto w-full mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Class Name</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Teacher</th>
            <th className="px-4 py-2">Student Fees</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={classItem._id}>
              <td className="border px-4 py-2">{classItem.className}</td>
              <td className="border px-4 py-2">{classItem.year}</td>
              <td className="border px-4 py-2">{classItem.teacher ? classItem.teacher.name : 'N/A'}</td>
              <td className="border px-4 py-2">{classItem.studentFees}</td>
              <td className="border px-4 py-2">
                <button className="edit-button" onClick={() => handleEdit(index)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDelete(classItem._id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} className="mb-4">
        <h3>{editing ? 'Update Class' : 'Add New Class'}</h3>
        <input
          type="text"
          value={newClass.className}
          onChange={(event) => setNewClass({ ...newClass, className: event.target.value })}
          placeholder=" Class Name"
          className="input-field"
        />
        <input
          type="number"
          value={newClass.year}
          onChange={(event) => setNewClass({ ...newClass, year: event.target.value })}
          placeholder="Year"
          className="input-field"
        />
        <select
          value={newClass.teacherId}
          onChange={(event) => {
            const selectedTeacherId = event.target.value;
            const selectedTeacher = teachers.find((teacher) => teacher._id === selectedTeacherId);
            setNewClass({ ...newClass, teacher: selectedTeacherId });
          }}
          className="input-field"
        >
          <option value="">Select a teacher</option>
          { teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={newClass.studentFees}
          onChange={(event) => setNewClass({ ...newClass, studentFees: event.target.value })}
          placeholder="Student Fees"
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {editing ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ClassComponent;