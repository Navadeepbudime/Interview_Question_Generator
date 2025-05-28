import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-wide py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Prepare for Your Next Interview with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Generate tailored interview questions, get instant feedback, and improve your interview skills with our AI-powered platform.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button size="lg" variant="success">Get Started Free</Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-wide py-20">
        <h2 className="heading-2 text-center mb-12">Why Choose InterviewQgen?</h2>
        <div className="grid-cards">
          <Card hover className="p-6">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Questions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI generates relevant and challenging questions based on your experience level and job role.
            </p>
          </Card>

          <Card hover className="p-6">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Practice</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Practice answering questions in real-time and get instant feedback to improve your responses.
            </p>
          </Card>

          <Card hover className="p-6">
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized question sets and learning paths based on your progress and areas for improvement.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container-wide py-16">
          <div className="text-center">
            <h2 className="heading-2 mb-6">Ready to Ace Your Next Interview?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of job seekers who have improved their interview skills with InterviewQgen.
            </p>
            <Link to="/signup">
              <Button size="lg">Start Practicing Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 