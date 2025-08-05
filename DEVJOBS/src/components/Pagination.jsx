import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useJobs } from '../context/JobContext'

const Pagination = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    totalPages, 
    jobs,
    jobsPerPage 
  } = useJobs()

  if (jobs.length === 0 || totalPages <= 1) {
    return null
  }

  const startJob = (currentPage - 1) * jobsPerPage + 1
  const endJob = Math.min(currentPage * jobsPerPage, jobs.length)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span>
          Showing {startJob}-{endJob} of {jobs.length} jobs
        </span>
      </div>
      
      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <div className="page-numbers">
          {getPageNumbers().map(pageNum => (
            <button
              key={pageNum}
              className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
        </div>
        
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Pagination

