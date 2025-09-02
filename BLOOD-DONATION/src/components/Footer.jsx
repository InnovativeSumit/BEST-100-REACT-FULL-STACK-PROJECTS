import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-bold">BloodConnect</h3>
                <p className="text-sm text-gray-400">Save Lives Together</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting donors with those in need. Every donation saves up to three lives. 
              Join our mission to ensure no one suffers due to blood shortage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donor" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Find Blood Banks
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Blood Drive Events
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Blood Donation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Plasma Donation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Platelet Donation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Emergency Blood Request
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm">
                  Health Screening
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1-800-BLOOD-HELP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@bloodconnect.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Healthcare Ave<br />
                  Medical District<br />
                  City, State 12345
                </span>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="bg-primary-600 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-white">24/7 Emergency</h5>
              <p className="text-sm text-primary-100">Need blood urgently?</p>
              <p className="text-lg font-bold text-white">+1-800-URGENT</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 BloodConnect. All rights reserved. Saving lives through blood donation.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

