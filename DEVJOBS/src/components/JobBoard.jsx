import React from 'react'
import SearchFilter from './SearchFilter'
import JobList from './JobList'
import Pagination from './Pagination'
import { useJobs } from '../context/JobContext'

const JobBoard = () => {
  const { loading, error } = useJobs()

  return (
    <main className="job-board">
      <div className="job-board-content">
        <SearchFilter />
        {error && (
          <div className="error-message">
            <p>Error loading jobs: {error}</p>
          </div>
        )}
        {loading ? (
          <div className="loading">
            <p>Loading jobs...</p>
          </div>
        ) : (
          <>
            <JobList />
            <Pagination />
          </>
        )}
      </div>
    </main>
  )
}

export default JobBoard

