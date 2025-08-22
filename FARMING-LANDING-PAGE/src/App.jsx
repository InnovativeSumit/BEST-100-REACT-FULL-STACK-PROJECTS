import { useState, useEffect, useRef } from 'react'
import { Menu, X, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/src/assets/images/logos/light-logo.svg" 
              alt="AgriTech Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Contact
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
              Login
            </button>
            <button className="border border-green-600 text-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-colors">
              Sign Up
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
              >
                Contact
              </button>
              <div className="flex space-x-4 pt-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors">
                  Login
                </button>
                <button className="border border-green-600 text-green-600 px-6 py-2 rounded-full hover:bg-green-600 hover:text-white transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// Hero Section Component
const HeroSection = () => {
  const textAnimation = {
    hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, staggerChildren: 0.05 },
    },
  }

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <section id="home" className="relative bg-white pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img
          className="w-auto h-full opacity-10"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt="Background Pattern"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-12">
          <div className="text-center lg:text-left lg:pr-0 flex-1">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <motion.div initial="hidden" animate="visible" variants={textAnimation}>
                <motion.h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl lg:leading-tight">
                  {'Boost Your Farm with Cutting-Edge Tools'.split('').map((letter, idx) => (
                    <motion.span key={idx} variants={letterAnimation}>
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>
              
              <div className="mt-8 lg:mt-12">
                <div className="flex justify-center lg:justify-start -space-x-4 overflow-hidden mb-6">
                  <img
                    className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                    src="/src/assets/images/landingpage/profile1.jpeg"
                    alt="Farmer 1"
                  />
                  <img
                    className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                    src="/src/assets/images/landingpage/profile2.jpg"
                    alt="Farmer 2"
                  />
                  <img
                    className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                    src="/src/assets/images/landingpage/profile3.jpg"
                    alt="Farmer 3"
                  />
                </div>
                <p className="text-lg text-gray-600 lg:text-xl">
                  Join our community of <span className="font-bold text-green-600">farmers</span> and access
                  a range of services designed to improve your farming experience and
                  productivity.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start sm:space-x-4 space-y-4 sm:space-y-0">
                <button 
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gray-900 border border-transparent rounded-xl hover:bg-green-600 transition-all duration-300"
                >
                  Explore Land Rentals
                </button>

                <button 
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center px-6 py-4 text-lg font-bold text-gray-900 bg-transparent border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Get Crop Health Insights
                </button>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 mt-12 lg:mt-0 lg:ml-8">
            <img
              className="w-full max-w-2xl rounded-lg shadow-2xl"
              src="/src/assets/images/landingpage/guru-moorthy-gokul-K_AhXLfVuN8-unsplash.png"
              alt="Modern Farming"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <img
          src="/src/assets/images/text.svg"
          alt="Agricultural Insights"
          className="w-full h-auto"
        />
      </div>
    </section>
  )
}

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About AgriTech Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing agriculture through innovative technology solutions that help farmers 
            maximize their productivity and sustainability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              At AgriTech Solutions, we believe in empowering farmers with cutting-edge technology 
              to make informed decisions, optimize resources, and achieve sustainable farming practices.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Smart Farming Solutions</h4>
                  <p className="text-gray-600">Advanced tools for modern agriculture</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Sustainable Practices</h4>
                  <p className="text-gray-600">Environmentally friendly farming methods</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Community Support</h4>
                  <p className="text-gray-600">Building a network of successful farmers</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="/src/assets/images/landingpage/guru-moorthy-gokul-K_AhXLfVuN8-unsplash.png" 
              alt="About Us" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Service Card Component
const ServiceCard = ({ title, description, imgSrc }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isCardHovered, setIsCardHovered] = useState(false)

  return (
    <div
      className="w-full max-w-sm bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative mx-4 mb-6 hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt={title}
          className={`w-full h-64 object-cover transition-all duration-300 ease-in-out rounded-3xl p-6 ${
            isCardHovered ? 'transform scale-105' : ''
          }`}
        />
      </div>
      <div className="p-6 pt-4">
        <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 font-medium">{description}</p>
      </div>
      <div className="relative h-24">
        <div className="absolute inset-0 bg-gray-100">
          <svg
            className="absolute bottom-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
        <div className="absolute bottom-4 left-6">
          <button
            className={`group flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ease-in-out ${
              isButtonHovered
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-white text-gray-800 border-gray-300'
            } border shadow-md hover:shadow-lg`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <span className="font-medium">Learn More</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                isButtonHovered ? 'bg-white' : 'bg-gray-200'
              }`}
            >
              <ArrowRight
                className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                  isButtonHovered ? 'text-gray-800 rotate-[-45deg]' : 'text-gray-600'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

// Services Section Component
const ServicesSection = () => {
  const [isServiceHovered, setIsServiceHovered] = useState(false)

  const cardsData = [
    {
      title: 'Crop Health Prediction',
      description: 'Get real-time insights into your crop\'s health by inputting environmental data. Receive predictions on fertilizer needs and expected yields to make smarter farming decisions.',
      imgSrc: '/src/assets/images/landingpage/card1.png',
    },
    {
      title: 'Land Tool Renting',
      description: 'Rent top-quality farming tools without ownership hassles. Access the right equipment when needed, boosting your farm\'s productivity efficiently.',
      imgSrc: '/src/assets/images/landingpage/card2.png',
    },
    {
      title: 'Land Renting',
      description: 'List or find farmland for rent easily with secure transactions and contracts. Connect with others and manage your land rental needs effortlessly.',
      imgSrc: '/src/assets/images/landingpage/card3.png',
    },
  ]

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-16 transition-all duration-300 ease-in-out"
          onMouseEnter={() => setIsServiceHovered(true)}
          onMouseLeave={() => setIsServiceHovered(false)}
        >
          Unlock the Future of Agriculture
          <span
            className={`block h-1 bg-green-500 mt-4 transition-all duration-300 ease-in-out ${
              isServiceHovered ? 'w-48 mx-auto' : 'w-24 mx-auto'
            }`}
          />
        </h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {cardsData.map((card, index) => (
            <ServiceCard
              key={index}
              title={card.title}
              description={card.description}
              imgSrc={card.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission logic here
    setFormData({ name: '', email: '', message: '' })
    alert('Thank you for your message! We\'ll get back to you soon.')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your farming experience? Contact us today to learn more about our solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@agritechsolutions.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+91 1234567890</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">123 Agriculture Street, Farm City, FC 12345</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
    alert('Thank you for subscribing to our newsletter!')
  }

  return (
    <footer className="bg-gray-100 px-6 py-12">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/images/logos/light-logo.svg"
                alt="AgriTech Logo"
                className="h-20 w-auto"
              />
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-gray-200 p-3 text-gray-600 hover:bg-green-600 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-200 p-3 text-gray-600 hover:bg-green-600 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-200 p-3 text-gray-600 hover:bg-green-600 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3 md:gap-16">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                    className="hover-underline text-left"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <a href="#" className="hover-underline">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Services</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                    className="hover-underline text-left"
                  >
                    Crop Health
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                    className="hover-underline text-left"
                  >
                    Land Rental
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@agritechsolutions.com" className="hover-underline">
                    info@agritechsolutions.com
                  </a>
                </li>
                <li>
                  <a href="tel:+911234567890" className="hover-underline">
                    +91 1234567890
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          © 2024 AgriTech Solutions. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default App

