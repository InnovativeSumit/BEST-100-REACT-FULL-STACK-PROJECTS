import React from 'react'
import { MapPin, Clock, Heart, ExternalLink } from 'lucide-react'
import { useJobs } from '../context/JobContext'

const JobCard = ({ job }) => {
  const { favorites, toggleFavorite } = useJobs()
  const isFavorite = favorites.includes(job.id)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  const extractTechStack = (description) => {
    const techKeywords = [
      'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 
      'Ruby', 'Go', 'TypeScript', 'Vue.js', 'Angular', 'Django',
      'Laravel', 'Spring', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL'
    ]
    
    const found = techKeywords.filter(tech => 
      description?.toLowerCase().includes(tech.toLowerCase())
    )
    
    return found.slice(0, 4) // Limit to 4 tech tags
  }

  const techStack = extractTechStack(job.description)

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(job.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="job-meta">
        <div className="meta-item">
          <MapPin size={16} />
          <span>{job.location || 'Remote'}</span>
        </div>
        <div className="meta-item">
          <Clock size={16} />
          <span>{formatDate(job.created_at)}</span>
        </div>
        <div className="meta-item">
          <span className="job-type">{job.type || 'Full Time'}</span>
        </div>
      </div>

      {techStack.length > 0 && (
        <div className="tech-stack">
          {techStack.map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      )}

      <div className="job-description">
        <p>{job.description?.substring(0, 200)}...</p>
      </div>

      <div className="job-actions">
        <a 
          href={job.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="apply-btn"
        >
          <ExternalLink size={16} />
          Apply Now
        </a>
      </div>
    </div>
  )
}

export default JobCard

