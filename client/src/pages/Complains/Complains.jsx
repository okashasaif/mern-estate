import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Navbar from "../../Components/Navbar/Header.jsx";
import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import  {  useEffect } from 'react';
import PreloaderComponent from '../../Components/Pre-loader/Pre-loader.jsx';
import SUCCESS from "../icons/success.png";
import '../scrollbar.css';

const Home = () => {

  const handleClose = () => {
    // Close the success message
    setSubmitted(false);
  };
  const {loading} = useSelector((state) => state.user)
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    email: '',
    message: ''
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your EmailJS service ID, template ID, and user ID
    const serviceID = 'service_7piaqff';
    const templateID = 'template_66u50bk';
    const userID = 'EkaLADU5V9eSlX6sx';

    

    // Send email using EmailJS
    emailjs.sendForm(serviceID, templateID, e.target, userID)
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      setSubmitted(true);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });

    // Clear form fields after submission
    setFormData({
      number: '',
      email: '',
      message: ''
    });
  };



  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (


    <div>
    {isLoading ? (
      <PreloaderComponent />
    ) : (
      <div>
           <div className="home">
     <Sidebar/>
     <div className="homeContainer">
      <Navbar/>
      <div className="max-w-md mx-auto">
    
      <div className="max-w-lg mx-auto pt-20">
      <form onSubmit={handleSubmit} className="bg-transparent shadow- rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Meter Number(13 Digit Reference Number):
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="number"
            placeholder="Meter Number"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Register Your complain regarding to Meter Malfunctioning/Delay In update/Upgradation of Load
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 
               uppercase hover:opacity-98 disabled:opacity-80'>{loading ? 'loading......':'Update'}</button>
        </div>
      </form>
    </div>
    {submitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white border bg-opacity-60 border-slate-700 text-slate-700 px-4 py-3 rounded relative">
          <button
              onClick={handleClose}
              className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex items-center justify-center">
            <img src={SUCCESS} alt="Success" className="h-14 w-14 mr-2" />
            </div>
            <div className="flex items-center mt-5">
            <div>
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your Complaint has been registered successfully.</span>
            </div>
    </div>
          
          </div>
        </div>
      )}
     </div>
   
    </div>
    
      </div>
      </div>
    )}
  </div>
);
};
 


export default Home