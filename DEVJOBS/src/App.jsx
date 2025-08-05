import React from 'react'
import { JobProvider } from './context/JobContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import JobBoard from './components/JobBoard'
import './styles/App.css'

function App() {
  return (
    <ThemeProvider>
      <JobProvider>
        <div className="app">
          <Header />
          <JobBoard />
        </div>
      </JobProvider>
    </ThemeProvider>
  )
}

export default App

