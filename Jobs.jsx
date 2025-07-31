import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Latest Internships</h2>
      <div className="row">
        {jobs.map(j => (
          <div className="col-md-4 mb-3" key={j.url}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{j.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{j.company}</h6>
                <p className="card-text">{j.location}</p>
                <a href={j.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Apply</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}