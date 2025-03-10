import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({ submitting: false, success: false, error: error.message });
    }
  };

  return (
    <section id="contact" className="contact-section py-32 px-5 bg-black">
      <div className="contact-container max-w-6xl mx-auto">
        <h2 className="section-title text-4xl text-white font-semibold mb-16 text-center">Contact Us</h2>
        
        <div className="contact-content grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="contact-info text-gray-300">
            <div className="mb-10">
              <h3 className="text-2xl font-medium text-green-500 mb-4">Get in Touch</h3>
              <p className="mb-8">
                Have questions about our waste management initiatives? Want to collaborate or suggest improvements? 
                We'd love to hear from you! Fill out the form or reach us through the contact details below.
              </p>
              
              <div className="contact-details space-y-6">
                <div className="flex items-start">
                  <div className="text-green-500 mr-4 text-xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Location:</h4>
                    <p>123 Green Street, Kathmandu</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-green-500 mr-4 text-xl">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email:</h4>
                    <p>info@wastelink.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-green-500 mr-4 text-xl">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Phone:</h4>
                    <p>+977-1-4789123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
              {status.success && (
                <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-6 rounded">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {status.error && (
                <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 rounded">
                  Error: {status.error}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500" 
                    placeholder="Your Email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group mb-6">
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500" 
                  placeholder="Subject" 
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group mb-6">
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500" 
                  placeholder="Your Message" 
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="inline-block px-8 py-4 bg-green-600 text-white font-medium text-lg rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                  disabled={status.submitting}
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
