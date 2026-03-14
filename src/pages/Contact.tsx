import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeader from '../components/SectionHeader';
import OptimizedImage from '../components/OptimizedImage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app would send to backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
      });
    }, 5000);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-amber-600" />,
      title: 'Call Us',
      description: 'Speak directly with our friendly team',
      details: '077 055 7257',
      action: 'Call Now',
      link: 'tel:+94770557257'
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: 'WhatsApp',
      description: 'Quick responses via messaging',
      details: '077 055 7257',
      action: 'Send Message',
      link: 'https://wa.me/94770557257?text=Hello%20Amaluna%2C%20I%27d%20like%20to%20get%20in%20touch'
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: 'Email',
      description: 'Send detailed enquiries',
      details: 'reservations@amalunaresorts.com',
      action: 'Send Email',
      link: 'mailto:reservations@amalunaresorts.com'
    }
  ];

  const subjectOptions = [
    'Room Reservation',
    'Day-Pass Booking',
    'Event Planning',
    'Special Offers',
    'General Enquiry',
    'Feedback',
    'Other'
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <OptimizedImage
          src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg"
          alt="Contact Amaluna Resorts"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-body">
            We're here to help make your Amaluna experience exceptional
          </p>
        </div>
      </section>

      <div className="container-luxury section-padding">

        {/* Quick Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={index} delay={index * 100} direction="up">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:shadow-luxury-lg transition-all duration-300 shadow-luxury hover:-translate-y-1">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-3 font-body">{method.description}</p>
              <p className="text-sm text-gray-800 font-medium mb-4">{method.details}</p>
              <a 
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary inline-block text-sm"
              >
                {method.action}
              </a>
            </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-luxury p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 mb-4">
                  <Send className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for contacting Amaluna Resorts. We'll get back to you within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder="Please provide details about your enquiry, including dates if relevant..."
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                    I consent to Amaluna Resorts storing my details and contacting me regarding my enquiry. 
                    We'll never share your information with third parties. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information & Hours */}
          <div className="space-y-8">
            {/* Resort Information */}
            <div className="bg-white rounded-2xl shadow-luxury p-6">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Resort Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">
                      276, Pamunugama Road<br />
                      Kepungoda, 11370<br />
                      Negombo, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+94770557257" className="text-amber-600 hover:text-amber-700 text-sm">
                      077 055 7257
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:reservations@amalunaresorts.com" className="text-amber-600 hover:text-amber-700 text-sm">
                      reservations@amalunaresorts.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="h-6 w-6 text-amber-600 mr-2" />
                Response Times
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Phone calls:</span>
                  <span className="font-medium text-gray-900">Immediate during office hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">WhatsApp:</span>
                  <span className="font-medium text-gray-900">Within 1 hour (24/7)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Email:</span>
                  <span className="font-medium text-gray-900">Within 4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Contact form:</span>
                  <span className="font-medium text-gray-900">Within 4 hours</span>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-luxury p-6">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Sunday:</span>
                  <span className="font-medium text-gray-900">8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Emergency contact:</span>
                  <span className="font-medium text-gray-900">24/7 via WhatsApp</span>
                </div>
                <p className="text-gray-600 mt-3 text-xs">
                  * Office hours are Sri Lanka Time (GMT+5:30)
                </p>
              </div>
            </div>

            {/* Getting Here */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Getting Here</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• 15 minutes from Bandaranaike International Airport</p>
                <p>• 45 minutes from Colombo city center</p>
                <p>• 10 minutes to Negombo Beach</p>
                <p>• Free parking available on-site</p>
              </div>
              <div className="mt-4">
                <a 
                  href="/location"
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  View detailed directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;