import React, { useState } from 'react';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaClock, FaDollarSign } from 'react-icons/fa';
import CalendarService from '../../services/integrations/CalendarService';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    startTime: '',
    endTime: '',
    notes: '',
  });
  const [scheduling, setScheduling] = useState(false);

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    setScheduling(true);
    try {
      await CalendarService.addInterviewEvent({
        ...interviewDetails,
        company: job.company,
      });
      setShowScheduler(false);
      alert('Interview scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      alert('Failed to schedule interview. Please try again.');
    } finally {
      setScheduling(false);
    }
  };

  const handleApply = async () => {
    try {
      const applicationData = await JobBoardService.autoFillApplication(
        job.id,
        userProfile,
        job.source
      );
      // Handle the auto-filled application data
      console.log('Auto-filled application:', applicationData);
    } catch (error) {
      console.error('Error auto-filling application:', error);
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h2>{job.title}</h2>
        <div className="job-meta">
          <span><FaBuilding /> {job.company}</span>
          <span><FaMapMarkerAlt /> {job.location}</span>
          {job.salary && <span><FaDollarSign /> {job.salary}</span>}
          <span><FaClock /> {job.type}</span>
        </div>
      </div>

      <div className="job-description">
        <p>{job.description}</p>
      </div>

      <div className="job-actions">
        <button onClick={handleApply} className="apply-button">
          Quick Apply
        </button>
        <button
          onClick={() => setShowScheduler(!showScheduler)}
          className="schedule-button"
        >
          Schedule Interview
        </button>
      </div>

      {showScheduler && (
        <div className="interview-scheduler">
          <h3>Schedule Interview</h3>
          <form onSubmit={handleScheduleInterview}>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="datetime-local"
                value={interviewDetails.startTime}
                onChange={(e) =>
                  setInterviewDetails({
                    ...interviewDetails,
                    startTime: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="datetime-local"
                value={interviewDetails.endTime}
                onChange={(e) =>
                  setInterviewDetails({
                    ...interviewDetails,
                    endTime: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={interviewDetails.notes}
                onChange={(e) =>
                  setInterviewDetails({
                    ...interviewDetails,
                    notes: e.target.value,
                  })
                }
                placeholder="Add any notes about the interview..."
              />
            </div>
            <button type="submit" disabled={scheduling}>
              {scheduling ? 'Scheduling...' : 'Confirm Schedule'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobCard;
