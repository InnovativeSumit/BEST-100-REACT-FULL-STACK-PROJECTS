import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Filter,
  Map,
  List,
  Navigation,
  Heart,
  Users,
  Calendar,
  Award,
  ChevronDown,
  ExternalLink,
  Zap,
  Shield,
  CheckCircle
} from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const distances = ['5 miles', '10 miles', '25 miles', '50 miles', '100 miles'];

  const bloodBanks = [
    {
      id: 1,
      name: "Central Blood Bank",
      address: "123 Healthcare Ave, Medical District",
      city: "Downtown",
      distance: "2.3 miles",
      phone: "(555) 123-4567",
      rating: 4.8,
      reviews: 156,
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      urgentNeeds: ['O-', 'AB+', 'B-'],
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Cells'],
      features: ['Walk-ins Welcome', 'Appointment Scheduling', 'Free Parking'],
      waitTime: "15 min",
      lastUpdated: "2 hours ago",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Community Blood Center",
      address: "456 Community Blvd, Riverside",
      city: "Riverside",
      distance: "4.7 miles",
      phone: "(555) 234-5678",
      rating: 4.6,
      reviews: 89,
      hours: "Mon-Sat: 7AM-7PM, Sun: 10AM-3PM",
      urgentNeeds: ['O+', 'A-'],
      services: ['Whole Blood', 'Platelets', 'Plasma'],
      features: ['Extended Hours', 'Mobile Unit', 'Donor Rewards'],
      waitTime: "25 min",
      lastUpdated: "1 hour ago",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "University Medical Blood Bank",
      address: "789 University Dr, Campus Area",
      city: "University District",
      distance: "6.1 miles",
      phone: "(555) 345-6789",
      rating: 4.9,
      reviews: 203,
      hours: "24/7 Emergency Services",
      urgentNeeds: ['AB-', 'O-', 'B+'],
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Cells', 'Cryoprecipitate'],
      features: ['24/7 Service', 'Research Facility', 'Student Discounts'],
      waitTime: "10 min",
      lastUpdated: "30 min ago",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Regional Blood Services",
      address: "321 Regional Pkwy, Suburban",
      city: "Suburban",
      distance: "8.9 miles",
      phone: "(555) 456-7890",
      rating: 4.4,
      reviews: 67,
      hours: "Mon-Fri: 9AM-5PM",
      urgentNeeds: ['A+', 'O+'],
      services: ['Whole Blood', 'Plasma'],
      features: ['Corporate Partnerships', 'Group Donations', 'Health Screenings'],
      waitTime: "20 min",
      lastUpdated: "3 hours ago",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Metro Blood Alliance",
      address: "654 Metro Center, City Center",
      city: "City Center",
      distance: "12.4 miles",
      phone: "(555) 567-8901",
      rating: 4.7,
      reviews: 134,
      hours: "Mon-Sun: 6AM-8PM",
      urgentNeeds: ['AB+', 'A-', 'B-'],
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Cells'],
      features: ['Express Donations', 'VIP Lounge', 'Refreshment Center'],
      waitTime: "12 min",
      lastUpdated: "45 min ago",
      image: "/api/placeholder/300/200"
    }
  ];

  const upcomingEvents = [
    {
      title: "Holiday Blood Drive",
      date: "Dec 20, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Central Community Center",
      organizer: "Red Cross",
      expectedDonors: 150,
      bloodTypes: ['All Types Welcome']
    },
    {
      title: "Corporate Donation Day",
      date: "Dec 22, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Hub Downtown",
      organizer: "TechCorp",
      expectedDonors: 75,
      bloodTypes: ['O+', 'A+', 'B+']
    },
    {
      title: "University Blood Campaign",
      date: "Dec 25, 2024",
      time: "11:00 AM - 6:00 PM",
      location: "State University Campus",
      organizer: "Student Health Services",
      expectedDonors: 200,
      bloodTypes: ['All Types Welcome']
    }
  ];

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bank.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBloodType = !selectedBloodType || bank.urgentNeeds.includes(selectedBloodType);
    return matchesSearch && matchesBloodType;
  });

  const getUrgencyColor = (bloodType) => {
    const urgentTypes = ['O-', 'AB-', 'B-'];
    return urgentTypes.includes(bloodType) ? 'text-red-600 bg-red-100' : 'text-orange-600 bg-orange-100';
  };

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Find Blood Banks Near You</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Discover blood banks, donation centers, and upcoming blood drives in your area. 
              Help save lives by finding the nearest donation opportunity.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by location or blood bank name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <select
                      value={selectedBloodType}
                      onChange={(e) => setSelectedBloodType(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Blood Types</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedDistance}
                      onChange={(e) => setSelectedDistance(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Any Distance</option>
                      {distances.map(distance => (
                        <option key={distance} value={distance}>{distance}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-200"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Advanced Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list' ? 'bg-white text-primary-600' : 'text-white hover:bg-white/20'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'map' ? 'bg-white text-primary-600' : 'text-white hover:bg-white/20'}`}
                    >
                      <Map className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/20"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white text-sm mb-2">Services</label>
                          <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                            <option>All Services</option>
                            <option>Whole Blood</option>
                            <option>Platelets</option>
                            <option>Plasma</option>
                            <option>Red Cells</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-white text-sm mb-2">Hours</label>
                          <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                            <option>Any Hours</option>
                            <option>Open Now</option>
                            <option>24/7</option>
                            <option>Weekend Hours</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-white text-sm mb-2">Features</label>
                          <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                            <option>Any Features</option>
                            <option>Walk-ins Welcome</option>
                            <option>Free Parking</option>
                            <option>Mobile Unit</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredBloodBanks.length} Blood Banks Found
              </h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                <option>Sort by Distance</option>
                <option>Sort by Rating</option>
                <option>Sort by Wait Time</option>
                <option>Sort by Urgent Needs</option>
              </select>
            </div>

            {/* Blood Bank List */}
            <div className="space-y-6">
              {filteredBloodBanks.map((bank) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Bank Image */}
                    <div className="md:w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Heart className="w-12 h-12 text-gray-400" />
                    </div>

                    {/* Bank Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{bank.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{bank.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                              <span>{bank.rating} ({bank.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>Wait: {bank.waitTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Last updated</div>
                          <div className="text-sm font-medium text-gray-900">{bank.lastUpdated}</div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">{bank.address}</p>

                      {/* Urgent Needs */}
                      {bank.urgentNeeds.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-900 mr-2">Urgent Needs:</span>
                          <div className="inline-flex flex-wrap gap-1">
                            {bank.urgentNeeds.map((type) => (
                              <span
                                key={type}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(type)}`}
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Services */}
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-900 mr-2">Services:</span>
                        <span className="text-sm text-gray-600">{bank.services.join(', ')}</span>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {bank.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <button className="btn-primary flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Book Appointment</span>
                        </button>
                        <button className="btn-secondary flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{bank.phone}</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors duration-200">
                          <Navigation className="w-4 h-4" />
                          <span>Get Directions</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors duration-200">
                          <ExternalLink className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Blood Supply Status</h3>
              <div className="space-y-3">
                {bloodTypes.map((type) => {
                  const level = Math.random() > 0.3 ? 'good' : Math.random() > 0.5 ? 'low' : 'critical';
                  const colors = {
                    good: 'bg-green-500',
                    low: 'bg-yellow-500',
                    critical: 'bg-red-500'
                  };
                  const textColors = {
                    good: 'text-green-700',
                    low: 'text-yellow-700',
                    critical: 'text-red-700'
                  };
                  
                  return (
                    <div key={type} className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${colors[level]}`}
                            style={{ width: level === 'good' ? '80%' : level === 'low' ? '40%' : '15%' }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium capitalize ${textColors[level]}`}>
                          {level}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Blood Drives</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{event.expectedDonors} expected donors</span>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2">
                      Register →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card p-6 bg-red-50 border-red-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-red-900">Emergency Blood Request</h3>
              </div>
              <p className="text-red-700 text-sm mb-4">
                Need blood urgently? Contact our 24/7 emergency hotline for immediate assistance.
              </p>
              <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call Emergency Line</span>
              </button>
            </div>

            {/* Donation Tips */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Donation Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Eat Well</h4>
                    <p className="text-sm text-gray-600">Have a good meal 2-3 hours before donating</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Stay Hydrated</h4>
                    <p className="text-sm text-gray-600">Drink plenty of water before and after</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Bring ID</h4>
                    <p className="text-sm text-gray-600">Valid photo identification required</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Rest After</h4>
                    <p className="text-sm text-gray-600">Take it easy for the rest of the day</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

