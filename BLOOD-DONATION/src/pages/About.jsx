import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Target, 
  Globe, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Calendar,
  TrendingUp,
  BookOpen,
  Lightbulb
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { label: 'Lives Saved', value: '50,000+', icon: Heart },
    { label: 'Registered Donors', value: '25,000+', icon: Users },
    { label: 'Partner Hospitals', value: '150+', icon: Shield },
    { label: 'Years of Service', value: '15+', icon: Award }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      bio: 'Leading hematologist with 20+ years in blood banking and transfusion medicine.',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Chen',
      role: 'Executive Director',
      bio: 'Healthcare administration expert focused on improving blood donation accessibility.',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Research Director',
      bio: 'Pioneering research in blood storage, safety protocols, and donor health.',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Kim',
      role: 'Technology Director',
      bio: 'Building innovative platforms to connect donors with those in need.',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const milestones = [
    {
      year: '2009',
      title: 'Foundation Established',
      description: 'BloodConnect was founded with a mission to bridge the gap between blood donors and recipients.'
    },
    {
      year: '2012',
      title: 'First Mobile App',
      description: 'Launched our first mobile application to help donors find nearby blood banks and schedule appointments.'
    },
    {
      year: '2015',
      title: '10,000 Lives Saved',
      description: 'Reached the milestone of facilitating donations that saved over 10,000 lives.'
    },
    {
      year: '2018',
      title: 'National Expansion',
      description: 'Expanded operations to serve blood banks and donors across all 50 states.'
    },
    {
      year: '2021',
      title: 'AI-Powered Matching',
      description: 'Introduced AI technology to optimize blood type matching and reduce waste.'
    },
    {
      year: '2024',
      title: '50,000 Lives Saved',
      description: 'Celebrated the incredible milestone of facilitating donations that saved 50,000+ lives.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We believe in the power of human kindness and the desire to help others in need.'
    },
    {
      icon: Shield,
      title: 'Safety',
      description: 'Maintaining the highest standards of safety for both donors and recipients is our priority.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building strong communities where people support each other through blood donation.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Striving for excellence in every aspect of our service and operations.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making blood donation accessible to everyone, regardless of location or background.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging technology and innovation to improve the blood donation experience.'
    }
  ];

  const partnerships = [
    { name: 'American Red Cross', logo: '/api/placeholder/120/60' },
    { name: 'Blood Centers of America', logo: '/api/placeholder/120/60' },
    { name: 'AABB (Association for the Advancement of Blood & Biotherapies)', logo: '/api/placeholder/120/60' },
    { name: 'World Health Organization', logo: '/api/placeholder/120/60' },
    { name: 'National Blood Foundation', logo: '/api/placeholder/120/60' },
    { name: 'International Society of Blood Transfusion', logo: '/api/placeholder/120/60' }
  ];

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: Target },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'history', label: 'Our History', icon: BookOpen },
    { id: 'impact', label: 'Our Impact', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">About BloodConnect</h1>
            <p className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              For over 15 years, we've been connecting generous donors with those in critical need, 
              building a community where every drop of blood donated has the power to save lives 
              and bring hope to families across the nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-600" fill={stat.icon === Heart ? "currentColor" : "none"} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-2 mb-8">
            <div className="flex flex-wrap justify-center space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {activeTab === 'mission' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      To save lives by connecting blood donors with those in need through innovative 
                      technology, compassionate service, and unwavering commitment to safety and excellence.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8">
                      We believe that every person deserves access to life-saving blood when they need it most. 
                      Our platform bridges the gap between generous donors and critical medical needs, 
                      ensuring that no one suffers due to blood shortage.
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="btn-primary">Join Our Mission</button>
                      <button className="btn-secondary">Learn More</button>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <Heart className="w-24 h-24 text-primary-600" fill="currentColor" />
                  </div>
                </div>

                {/* Values */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300"
                        >
                          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon className="w-8 h-8 text-primary-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{value.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our dedicated team of healthcare professionals, technologists, and community leaders 
                    work tirelessly to advance our mission of saving lives through blood donation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                      <div className="flex justify-center space-x-3">
                        <a href={member.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a href={member.twitter} className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                          <Twitter className="w-5 h-5" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Join Team CTA */}
                <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We're always looking for passionate individuals who share our mission. 
                    Explore career opportunities and help us save more lives.
                  </p>
                  <button className="btn-primary">View Open Positions</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    From a small local initiative to a national platform, our journey has been 
                    marked by innovation, growth, and an unwavering commitment to saving lives.
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 h-full"></div>
                  
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      >
                        <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                          <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                          </div>
                        </div>
                        
                        {/* Timeline Dot */}
                        <div className="relative z-10">
                          <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                        </div>
                        
                        <div className="w-1/2"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Every donation facilitated through our platform creates a ripple effect of hope, 
                    healing, and life-saving impact across communities nationwide.
                  </p>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 rounded-lg text-white text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4" fill="currentColor" />
                    <h3 className="text-3xl font-bold mb-2">50,000+</h3>
                    <p className="text-red-100">Lives Saved</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-lg text-white text-center">
                    <Users className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2">25,000+</h3>
                    <p className="text-blue-100">Active Donors</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 rounded-lg text-white text-center">
                    <Globe className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2">50</h3>
                    <p className="text-green-100">States Served</p>
                  </div>
                </div>

                {/* Success Stories */}
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Success Stories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">
                        "Thanks to BloodConnect, I was able to find a donor match within hours of my emergency. 
                        The platform saved my life, and I'm forever grateful to the donor and this amazing organization."
                      </p>
                      <div className="font-semibold text-gray-900">- Maria S., Blood Recipient</div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">
                        "I've been donating blood for years, but BloodConnect made it so much easier to find 
                        donation centers and track my impact. Knowing I've helped save 15 lives is incredible."
                      </p>
                      <div className="font-semibold text-gray-900">- John D., Regular Donor</div>
                    </div>
                  </div>
                </div>

                {/* Partnerships */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Partners</h3>
                  <p className="text-center text-gray-600 mb-8">
                    We work with leading healthcare organizations to ensure the highest standards of safety and efficiency.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {partnerships.map((partner, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-20">
                        <span className="text-gray-500 text-sm font-medium text-center">{partner.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">
              Have questions about blood donation or our services? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">General Inquiries</p>
              <p className="text-primary-600 font-medium">(555) 123-BLOOD</p>
              <p className="text-gray-600 mb-2 mt-4">Emergency Line</p>
              <p className="text-red-600 font-medium">(555) 911-HELP</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">General Information</p>
              <p className="text-primary-600 font-medium">info@bloodconnect.org</p>
              <p className="text-gray-600 mb-2 mt-4">Support</p>
              <p className="text-primary-600 font-medium">support@bloodconnect.org</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Headquarters</p>
              <p className="text-gray-600">
                123 Healthcare Avenue<br />
                Medical District<br />
                City, State 12345
              </p>
            </motion.div>
          </div>

          {/* Social Media */}
          <div className="text-center mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
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
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Join our mission to save lives. Whether you're a first-time donor or a regular contributor, 
              your donation can make all the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" fill="currentColor" />
                <span>Start Donating</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 flex items-center justify-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

