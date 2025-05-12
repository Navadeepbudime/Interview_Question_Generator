import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const FAQ = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="faq-title text-center mb-4 fw-bold" 
          style={{ 
            color: "#2c3e50",
            background: "linear-gradient(90deg, #3498db, #8e44ad)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
        Frequently Asked Questions
      </h1>
      
      <div className="faq-container shadow-lg rounded-3 p-4 bg-light">
        <div className="accordion accordion-flush" id="faqAccordion">
          {/* FAQ 1 */}
          <div className="accordion-item mb-2 border rounded-3 overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button fw-semibold" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#faq1"
                style={{ 
                  backgroundColor: "#f8f9fa",
                  color: "#2c3e50"
                }}>
                What is this website about?
              </button>
            </h2>
            <div 
              id="faq1" 
              className="accordion-collapse collapse show" 
              data-bs-parent="#faqAccordion">
              <div className="accordion-body" 
                   style={{ 
                     backgroundColor: "#ffffff",
                     color: "#34495e"
                   }}>
                This website generates interview questions based on uploaded skills and datasets. It helps users prepare efficiently for job interviews.
              </div>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="accordion-item mb-2 border rounded-3 overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button collapsed fw-semibold" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#faq2"
                style={{ 
                  backgroundColor: "#f8f9fa",
                  color: "#2c3e50"
                }}>
                How does the question generator work?
              </button>
            </h2>
            <div 
              id="faq2" 
              className="accordion-collapse collapse" 
              data-bs-parent="#faqAccordion">
              <div className="accordion-body" 
                   style={{ 
                     backgroundColor: "#ffffff",
                     color: "#34495e"
                   }}>
                The system extracts skills from uploaded PDF resumes and uses a trained dataset to generate relevant interview questions.
              </div>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="accordion-item mb-2 border rounded-3 overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button collapsed fw-semibold" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#faq3"
                style={{ 
                  backgroundColor: "#f8f9fa",
                  color: "#2c3e50"
                }}>
                Can I upload my resume?
              </button>
            </h2>
            <div 
              id="faq3" 
              className="accordion-collapse collapse" 
              data-bs-parent="#faqAccordion">
              <div className="accordion-body" 
                   style={{ 
                     backgroundColor: "#ffffff",
                     color: "#34495e"
                   }}>
                Yes! You can upload your resume as a PDF, and our AI will extract skills to generate customized interview questions.
              </div>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="accordion-item mb-2 border rounded-3 overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button collapsed fw-semibold" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#faq4"
                style={{ 
                  backgroundColor: "#f8f9fa",
                  color: "#2c3e50"
                }}>
                Is this tool free to use?
              </button>
            </h2>
            <div 
              id="faq4" 
              className="accordion-collapse collapse" 
              data-bs-parent="#faqAccordion">
              <div className="accordion-body" 
                   style={{ 
                     backgroundColor: "#ffffff",
                     color: "#34495e"
                   }}>
                Currently, this tool is free, but premium features might be introduced in the future.
              </div>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="accordion-item mb-2 border rounded-3 overflow-hidden">
            <h2 className="accordion-header">
              <button 
                className="accordion-button collapsed fw-semibold" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#faq5"
                style={{ 
                  backgroundColor: "#f8f9fa",
                  color: "#2c3e50"
                }}>
                How accurate are the generated questions?
              </button>
            </h2>
            <div 
              id="faq5" 
              className="accordion-collapse collapse" 
              data-bs-parent="#faqAccordion">
              <div className="accordion-body" 
                   style={{ 
                     backgroundColor: "#ffffff",
                     color: "#34495e"
                   }}>
                The accuracy depends on the dataset and AI training. We continuously improve it for better results.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;