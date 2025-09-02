# BloodConnect - Blood Donation Website

A professional React+Vite blood donation website with attractive UI/UX design and comprehensive functionality for connecting donors with those in need.

## 🚀 Features

- **Modern React+Vite Setup**: Fast development and build process
- **Professional UI/UX Design**: Clean, attractive, and user-friendly interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Four Main Pages**:
  - **Home**: Hero section, statistics, testimonials, and call-to-action
  - **Donor**: Registration forms, profile management, donation history
  - **Explore**: Blood bank finder, search functionality, upcoming events
  - **About**: Mission, team, history, and contact information
- **Interactive Components**: Forms, navigation, animations, and user feedback
- **Custom CSS**: Professional styling without external dependencies

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 6.21.3
- **Animations**: Framer Motion 12.9.4
- **Icons**: Lucide React 0.539.0
- **HTTP Client**: Axios 1.11.0
- **Styling**: Custom CSS with utility classes

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

## 🚀 Quick Start

### 1. Clone or Extract the Project

If you have the project as a zip file, extract it to your desired location.

### 2. Navigate to Project Directory

```bash
cd blood-donation-vite
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
blood-donation-vite/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── Footer.jsx          # Footer component
│   │   └── LoadingSpinner.jsx  # Loading component
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Donor.jsx           # Donor registration & management
│   │   ├── Explore.jsx         # Blood bank finder
│   │   └── About.jsx           # About page
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Red gradient (#dc2626 to #991b1b)
- **Secondary**: Gray tones for text and backgrounds
- **Accent**: White for contrast and clean design

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Buttons**: Primary and secondary styles with hover effects
- **Cards**: Elevated design with shadow and hover animations
- **Forms**: Clean input fields with focus states
- **Navigation**: Fixed header with smooth scrolling

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌟 Key Pages Overview

### Home Page
- Hero section with call-to-action
- Animated statistics counter
- Why donate section
- Upcoming events
- Testimonials
- Emergency contact section

### Donor Page
- Multi-tab interface (Register, Profile, History, Appointments, Eligibility)
- Comprehensive registration form
- Profile management
- Donation history tracking
- Appointment scheduling
- Eligibility checker

### Explore Page
- Blood bank search and filtering
- Interactive blood bank listings
- Blood supply status indicators
- Upcoming blood drives
- Emergency blood request
- Donation tips

### About Page
- Mission and values
- Team information
- Company history timeline
- Impact statistics
- Partnership information
- Contact details

## 🎯 User Experience Features

- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Loading States**: Custom loading spinner component
- **Form Validation**: Client-side validation for all forms
- **Interactive Elements**: Hover effects and micro-interactions
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🔒 Security Considerations

- Form validation on client-side
- Secure routing with React Router
- No sensitive data stored in localStorage
- HTTPS ready for production deployment

## 🚀 Deployment

### Option 1: Static Hosting (Netlify, Vercel)
1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider

### Option 2: Traditional Web Server
1. Run `npm run build`
2. Copy contents of `dist` folder to your web server
3. Configure server to serve `index.html` for all routes

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty


<div align="center">
<p>Made with ❤️ by <strong>SUMIT PAL</strong></p>

🌟 Let's Connect

I'm passionate about collaborating on innovative projects and sharing knowledge about *coding, design, robotics, and AI*. Let's build something amazing together!  

[![Instagram](https://img.icons8.com/fluency/48/instagram-new.png)](https://www.instagram.com/sumittech_360)  [![YouTube](https://img.icons8.com/fluency/48/youtube-play.png)](https://youtube.com/channel/UCiPxbNaC7dloVut6Jc5xHIQ)  [![GitHub](https://img.icons8.com/fluency/48/github.png)](https://github.com/InnovativeSumit)  [![LinkedIn](https://img.icons8.com/fluency/48/linkedin.png)](https://www.linkedin.com/in/sumit-pal-40511a339) 

⭐ Star this repo on GitHub — it helps!

<p>For questions or support, please open an issue on the repository.</p>
</div>




