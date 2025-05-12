import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Assuming you're using Bootstrap

const About = () => {
  return (
    <div className="container my-5">
      <h1 
        className="text-center mb-5 fw-bold"
        style={{
          color: "#2c3e50",
          background: "linear-gradient(90deg, #3498db, #8e44ad)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "1px"
        }}
      >
        About the Interview Question Generator
      </h1>
      <p 
        className="text-center mb-5 lead"
        style={{ 
          color: "#34495e",
          maxWidth: "800px",
          margin: "0 auto"
        }}
      >
        Our system extracts skills from resumes and generates relevant interview questions.
      </p>

      <div className="row g-4 justify-content-center">
        {/* Box 1: Features */}
        <div className="col-lg-4 col-md-6">
          <div 
            className="p-4 rounded-3 shadow-lg h-100"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
            }}
          >
            <h2 
              className="mb-3 fw-semibold"
              style={{ color: "#2c3e50" }}
            >
              Why Choose Us?
            </h2>
            <ul className="list-unstyled">
              {[
                "Personalized interview questions based on your resume.",
                "Helps candidates prepare with real-world mock interviews.",
                "Saves recruiters time by automating question generation.",
                "Ensures a fair and skill-based interview process.",
                "Customizable difficulty levels for beginners & experts.",
                "Useful for students, job seekers, and hiring managers."
              ].map((item, index) => (
                <li 
                  key={index}
                  className="mb-2"
                  style={{ color: "#34495e" }}
                >
                  <span style={{ color: "#28a745", marginRight: "8px" }}>✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Box 2: Interviewers Benefits */}
        <div className="col-lg-4 col-md-6">
          <div 
            className="p-4 rounded-3 shadow-lg h-100"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
            }}
          >
            <h2 
              className="mb-3 fw-semibold"
              style={{ color: "#2c3e50" }}
            >
              Benefits for Interviewers
            </h2>
            <ul className="list-unstyled">
              {[
                "Automates interview question generation based on job role.",
                "Saves time in preparing structured interviews.",
                "Reduces bias and ensures skill-based assessments.",
                "Customizable difficulty levels for different job positions.",
                "Increases efficiency in hiring the right talent."
              ].map((item, index) => (
                <li 
                  key={index}
                  className="mb-2"
                  style={{ color: "#34495e" }}
                >
                  <span style={{ color: "#007bff", marginRight: "8px" }}>✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Box 3: Candidates Benefits */}
        <div className="col-lg-4 col-md-6">
          <div 
            className="p-4 rounded-3 shadow-lg h-100"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
            }}
          >
            <h2 
              className="mb-3 fw-semibold"
              style={{ color: "#2c3e50" }}
            >
              Benefits for Candidates
            </h2>
            <ul className="list-unstyled">
              {[
                "Get AI-generated questions tailored to your skills.",
                "Practice with realistic mock interview scenarios.",
                "Identify your strengths and areas for improvement.",
                "Gain confidence before real interviews.",
                "Access questions based on difficulty level."
              ].map((item, index) => (
                <li 
                  key={index}
                  className="mb-2"
                  style={{ color: "#34495e" }}
                >
                  <span style={{ color: "#007bff", marginRight: "8px" }}>✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;