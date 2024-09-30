import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import StudentCompnent from './Components/Student';
import ClassCompnent from './Components/Class';
import TeacherCompnent from './Components/Teacher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/student" element={<StudentCompnent></StudentCompnent>} />
        <Route path="/class" element={<ClassCompnent></ClassCompnent>} />
        <Route path="/teacher" element={<TeacherCompnent></TeacherCompnent>} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
