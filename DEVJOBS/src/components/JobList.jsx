import React from 'react'
import JobCard from './JobCard'
import { useJobs } from '../context/JobContext'

const JobList = () => {
  const { jobs, currentJobs } = useJobs()

  if (jobs.length === 0) {
    return (
      <div className="no-jobs">
        <p>No jobs found. Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="job-list">
      {currentJobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}

export default JobList

