import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  MapPin, 
  Clock, 
  Award, 
  Shield, 
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Calendar,
  Phone,
  Search
} from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({
    donors: 0,
    donations: 0,
    livesSaved: 0,
    bloodBanks: 0
  });

  const [formData, setFormData] = useState({
    bloodType: '',
    urgency: '',
    location: ''
  });

  // Animate stats on component mount
  useEffect(() => {
    const animateStats = () => {
      const targets = { donors: 15420, donations: 8750, livesSaved: 26250, bloodBanks: 156 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setStats({
          donors: Math.floor(targets.donors * progress),
          donations: Math.floor(targets.donations * progress),
          livesSaved: Math.floor(targets.livesSaved * progress),
          bloodBanks: Math.floor(targets.bloodBanks * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, stepTime);
    };

    animateStats();
  }, []);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      text: "Donating blood has become a meaningful part of my life. Knowing that I'm helping save lives gives me incredible satisfaction.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Emergency Physician",
      text: "BloodConnect has revolutionized how we access blood supplies. Their efficient system has helped us save countless lives.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Blood Recipient",
      text: "I received blood during my surgery last year. I'm forever grateful to the donors who made my recovery possible.",
      rating: 5
    }
  ];

  const upcomingEvents = [
    {
      title: "Community Blood Drive",
      date: "Dec 15, 2024",
      location: "Central Community Center",
      time: "9:00 AM - 5:00 PM",
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Corporate Donation Event",
      date: "Dec 18, 2024",
      location: "Tech Hub Downtown",
      time: "10:00 AM - 4:00 PM",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "University Blood Campaign",
      date: "Dec 22, 2024",
      location: "State University Campus",
      time: "11:00 AM - 6:00 PM",
      color: "bg-blue-100 text-blue-700"
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Save Lives,
                <span className="block text-yellow-300">Donate Blood</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100 leading-relaxed">
                Every donation can save up to three lives. Join our community of heroes 
                and make a difference in someone's life today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span>Donate Now</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Blood Request</h3>
                <form onSubmit={handleFormSubmit} className="hero-form space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <select 
                      value={formData.bloodType}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 backdrop-blur-sm"
                    >
                      <option value="" style={{background: 'var(--primary-700)', color: 'white'}}>Blood Type</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type} style={{background: 'var(--primary-700)', color: 'white'}}>{type}</option>
                      ))}
                    </select>
                    <select 
                      value={formData.urgency}
                      onChange={(e) => handleInputChange('urgency', e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white backdrop-blur-sm"
                    >
                      <option value="" style={{background: 'var(--primary-700)', color: 'white'}}>Urgency</option>
                      <option value="emergency" style={{background: 'var(--primary-700)', color: 'white'}}>Emergency</option>
                      <option value="urgent" style={{background: 'var(--primary-700)', color: 'white'}}>Urgent</option>
                      <option value="routine" style={{background: 'var(--primary-700)', color: 'white'}}>Routine</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Your Location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-gray-300 backdrop-blur-sm"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Search className="w-5 h-5" />
                    <span>Find Blood Banks</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.donors.toLocaleString()}+</h3>
              <p className="text-gray-600">Registered Donors</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" fill="currentColor" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.donations.toLocaleString()}+</h3>
              <p className="text-gray-600">Blood Donations</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.livesSaved.toLocaleString()}+</h3>
              <p className="text-gray-600">Lives Saved</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.bloodBanks}+</h3>
              <p className="text-gray-600">Blood Banks</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Your Donation Matters</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Blood donation is a simple act that can have a profound impact on the lives of others. 
              Here's why your contribution is so important.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8 text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary-600" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Save Lives</h3>
              <p className="text-gray-600 leading-relaxed">
                One donation can save up to three lives. Your blood can help accident victims, 
                surgery patients, and those with chronic illnesses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card p-8 text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick & Easy</h3>
              <p className="text-gray-600 leading-relaxed">
                The entire process takes less than an hour, but the impact lasts a lifetime. 
                Simple registration and professional care throughout.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-8 text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Health Benefits</h3>
              <p className="text-gray-600 leading-relaxed">
                Regular donation can help maintain healthy iron levels and provides 
                free health screenings to monitor your well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Blood Drives</h2>
            <p className="text-xl text-gray-600">Join us at these upcoming events in your community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${event.color}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-primary-600 font-semibold">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600">Hear from our community of donors and recipients</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Save Lives?</h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join thousands of heroes who are making a difference. Your donation today 
              could be someone's second chance at life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donor">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span>Become a Donor</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Emergency Request</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

