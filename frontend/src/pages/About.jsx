import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const About = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container-wide py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About InterviewQgen
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to revolutionize interview preparation by making it more accessible, effective, and personalized through AI technology.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-2 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              At InterviewQgen, we believe that everyone deserves the opportunity to showcase their best self during interviews. Our AI-powered platform is designed to help job seekers practice and improve their interview skills in a safe, supportive environment.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Whether you're a fresh graduate or a seasoned professional, our platform adapts to your needs and helps you prepare for your next career move with confidence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card hover className="p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</h3>
              <p className="text-gray-600 dark:text-gray-300">Active Users</p>
            </Card>
            <Card hover className="p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</h3>
              <p className="text-gray-600 dark:text-gray-300">Questions Generated</p>
            </Card>
            <Card hover className="p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</h3>
              <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
            </Card>
            <Card hover className="p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</h3>
              <p className="text-gray-600 dark:text-gray-300">Support</p>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="container-wide py-16">
          <h2 className="heading-2 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="p-6">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up and tell us about your experience, target role, and industry. We'll customize your interview preparation accordingly.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Generate Questions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI generates relevant interview questions based on your profile and the latest industry trends.
              </p>
            </Card>

            <Card hover className="p-6">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Practice & Improve</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice answering questions, get instant feedback, and track your progress over time.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container-wide py-16">
        <div className="text-center">
          <h2 className="heading-2 mb-6">Start Your Interview Preparation Journey</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join our community of successful job seekers and take your interview skills to the next level.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link to="/faq">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;