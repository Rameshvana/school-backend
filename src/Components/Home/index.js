import React from "react";
import { Link } from "react-router-dom";
import Students from "../../assets/students.png";
import "./index.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="StyledContainer">
      <div className="StyledPaper" >
        <img src={Students} alt="students" style={{ width: "60%" }} />
        <div >
          <h1 className="StyledTitle">
            Welcome to
            <br />
            School Management
            <br />
            System
          </h1>
          <p className="StyledText">
            Streamline school management, class organization, and add students
            and faculty. Seamlessly track attendance, assess performance, and
            provide feedback. Access records, view marks, and communicate
            effortlessly.
          </p>
          <Link to="/class"><button className="btn btn-warning ">Class</button></Link>
          <Link to="/student"><button className="btn btn-warning ">Student</button></Link>
          <Link to="/teacher"><button className="btn btn-warning ">Teacher</button></Link>
          
          
          
          
        </div>
      </div>
    </div>
  );
};

export default Home;
