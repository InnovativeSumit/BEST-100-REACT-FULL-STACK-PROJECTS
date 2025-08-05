import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockJobs } from '../utils/mockData'

const JobContext = createContext()

export const useJobs = () => {
  const context = useContext(JobContext)
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider')
  }
  return context
}

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [techFilter, setTechFilter] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('devjobs-favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const jobsPerPage = 6

  // Load jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setJobs(mockJobs)
        setFilteredJobs(mockJobs)
        setError(null)
      } catch (err) {
        setError('Failed to load jobs')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('devjobs-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Apply filters
  const applyFilters = () => {
    let filtered = jobs

    // Search term filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Tech stack filter
    if (techFilter.length > 0) {
      filtered = filtered.filter(job =>
        techFilter.some(tech =>
          job.description.toLowerCase().includes(tech.toLowerCase())
        )
      )
    }

    setFilteredJobs(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Apply filters when search term or tech filter changes
  useEffect(() => {
    applyFilters()
  }, [searchTerm, techFilter, jobs])

  // Pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const currentJobs = filteredJobs.slice(startIndex, endIndex)

  // Toggle favorite
  const toggleFavorite = (jobId) => {
    setFavorites(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const value = {
    jobs: filteredJobs,
    currentJobs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    techFilter,
    setTechFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    jobsPerPage,
    favorites,
    toggleFavorite,
    applyFilters
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  )
}

