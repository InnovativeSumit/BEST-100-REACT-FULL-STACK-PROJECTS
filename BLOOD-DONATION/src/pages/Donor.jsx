import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Heart, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Award,
  FileText,
  Camera,
  Upload,
  Download,
  Edit,
  Save,
  X
} from 'lucide-react';

const Donor = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    bloodType: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    medications: '',
    lastDonation: '',
    weight: '',
    height: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

  const donationHistory = [
    { date: '2024-10-15', location: 'Central Blood Bank', type: 'Whole Blood', status: 'Completed' },
    { date: '2024-08-20', location: 'Community Center', type: 'Platelets', status: 'Completed' },
    { date: '2024-06-10', location: 'University Campus', type: 'Whole Blood', status: 'Completed' },
    { date: '2024-04-05', location: 'Downtown Clinic', type: 'Plasma', status: 'Completed' }
  ];

  const upcomingAppointments = [
    { date: '2024-12-20', time: '10:00 AM', location: 'Central Blood Bank', type: 'Whole Blood' },
    { date: '2024-12-25', time: '2:00 PM', location: 'Holiday Drive Event', type: 'Platelets' }
  ];

  const eligibilityChecklist = [
    { item: 'Age 17-65 years', status: true },
    { item: 'Weight at least 110 lbs', status: true },
    { item: 'Good general health', status: true },
    { item: 'No recent tattoos/piercings', status: true },
    { item: 'No recent travel to restricted areas', status: true },
    { item: 'No recent illness', status: true }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'register', label: 'Register', icon: User },
    { id: 'profile', label: 'My Profile', icon: FileText },
    { id: 'history', label: 'Donation History', icon: Calendar },
    { id: 'appointments', label: 'Appointments', icon: Clock },
    { id: 'eligibility', label: 'Eligibility', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Become a Life Saver</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Join our community of heroes. Register as a blood donor and help save lives in your community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-wrap justify-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {/* Registration Tab */}
          {activeTab === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Donor Registration</h2>
                  <p className="text-gray-600">Please fill out the form below to register as a blood donor.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                        <select
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select Blood Type</option>
                          {bloodTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs) *</label>
                        <input
                          type="number"
                          name="weight"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                          min="110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-primary-600" />
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                        <input
                          type="text"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone *</label>
                        <input
                          type="tel"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-primary-600" />
                      Medical Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                        <textarea
                          name="medicalConditions"
                          value={formData.medicalConditions}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="List any medical conditions or allergies"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                        <textarea
                          name="medications"
                          value={formData.medications}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          placeholder="List any medications you are currently taking"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Blood Donation</label>
                        <input
                          type="date"
                          name="lastDonation"
                          value={formData.lastDonation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-primary-600 hover:underline">Terms and Conditions</a> and 
                        <a href="#" className="text-primary-600 hover:underline"> Privacy Policy</a>. I understand that my information 
                        will be used to contact me about blood donation opportunities and health screenings.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Heart className="w-5 h-5" fill="currentColor" />
                      <span>Register as Donor</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Picture and Basic Info */}
                  <div className="lg:col-span-1">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-16 h-16 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                      <p className="text-gray-600">Blood Type: O+</p>
                      <p className="text-gray-600">Donor ID: BD-2024-001</p>
                      
                      <div className="mt-6 space-y-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-800 font-medium">Eligible to Donate</span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-center">
                            <p className="text-blue-800 font-medium">Total Donations</p>
                            <p className="text-2xl font-bold text-blue-600">12</p>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="text-center">
                            <p className="text-yellow-800 font-medium">Lives Saved</p>
                            <p className="text-2xl font-bold text-yellow-600">36</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              value="John"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              value="Doe"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              value="john.doe@email.com"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                              type="tel"
                              value="(555) 123-4567"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address Information */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                              type="text"
                              value="123 Main Street"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                              type="text"
                              value="Anytown"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input
                              type="text"
                              value="CA"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                            <input
                              type="text"
                              value="Jane Doe"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                            <input
                              type="tel"
                              value="(555) 987-6543"
                              disabled={!isEditing}
                              className={`w-full px-3 py-2 border rounded-lg ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-primary-500' : 'border-gray-200 bg-gray-50'}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Donation History Tab */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Donation History</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donationHistory.map((donation, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">{donation.date}</td>
                          <td className="py-4 px-4">{donation.location}</td>
                          <td className="py-4 px-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                              {donation.type}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>{donation.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Statistics */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Donations</p>
                        <p className="text-3xl font-bold">12</p>
                      </div>
                      <Heart className="w-12 h-12 text-blue-200" fill="currentColor" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Lives Saved</p>
                        <p className="text-3xl font-bold">36</p>
                      </div>
                      <Shield className="w-12 h-12 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100">Donor Level</p>
                        <p className="text-xl font-bold">Gold</p>
                      </div>
                      <Award className="w-12 h-12 text-yellow-200" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">My Appointments</h2>
                  <button className="btn-primary">
                    Schedule New Appointment
                  </button>
                </div>

                <div className="space-y-6">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary-100 p-3 rounded-lg">
                            <Calendar className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.type} Donation</h3>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next Eligible Date */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Eligible Donation Date</h3>
                  <p className="text-blue-700">Based on your last donation, you will be eligible to donate again on <strong>January 15, 2025</strong></p>
                  <p className="text-sm text-blue-600 mt-2">We'll send you a reminder when you're eligible to donate again.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Eligibility Tab */}
          {activeTab === 'eligibility' && (
            <motion.div
              key="eligibility"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Donation Eligibility</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Eligibility Checklist */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Current Status</h3>
                    <div className="space-y-4">
                      {eligibilityChecklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {item.status ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`${item.status ? 'text-gray-900' : 'text-red-600'}`}>
                            {item.item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">You are eligible to donate!</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        All eligibility requirements are met. You can schedule your next donation.
                      </p>
                    </div>
                  </div>

                  {/* Eligibility Guidelines */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Eligibility Guidelines</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Age Requirements</h4>
                        <p className="text-gray-600 text-sm">Must be between 17-65 years old (16 with parental consent in some states)</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Weight Requirements</h4>
                        <p className="text-gray-600 text-sm">Must weigh at least 110 pounds (50 kg)</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Health Requirements</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Must be in good general health</li>
                          <li>• No cold or flu symptoms</li>
                          <li>• No recent dental work (24 hours)</li>
                          <li>• No recent tattoos or piercings (3 months)</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Travel Restrictions</h4>
                        <p className="text-gray-600 text-sm">No recent travel to certain countries with malaria risk</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Donation Frequency</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Whole blood: Every 56 days</li>
                          <li>• Platelets: Every 7 days (up to 24 times/year)</li>
                          <li>• Plasma: Every 28 days</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Health Check */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Health Check</h3>
                  <p className="text-gray-600 mb-4">Answer these questions to verify your current eligibility:</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="health1" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                      <label htmlFor="health1" className="text-sm text-gray-700">I am feeling well today</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="health2" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                      <label htmlFor="health2" className="text-sm text-gray-700">I have not taken any new medications in the past 48 hours</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="health3" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                      <label htmlFor="health3" className="text-sm text-gray-700">I have eaten a meal within the last 4 hours</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="health4" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
                      <label htmlFor="health4" className="text-sm text-gray-700">I have not consumed alcohol in the past 24 hours</label>
                    </div>
                  </div>
                  
                  <button className="mt-4 btn-primary">
                    Schedule Donation
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-md mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Welcome to BloodConnect! Your donor registration has been completed successfully.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="btn-primary"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Donor;

