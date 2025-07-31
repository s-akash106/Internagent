import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search() {
  const [keyword, setKeyword] = useState('react');
  const [country, setCountry] = useState('');
  const [remote, setRemote] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/search', {
      params: { keyword, country, remote }
    });
    setJobs(data);
    setLoading(false);
  };

  // auto-search on first load / filter change
  useEffect(() => {
    search();
  }, [keyword, country, remote]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Find Internships</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Keyword</label>
          <input
            className="form-control"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="e.g. react"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Country (optional)</label>
          <input
            className="form-control"
            value={country}
            onChange={e => setCountry(e.target.value)}
            placeholder="e.g. USA"
          />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={remote}
              onChange={e => setRemote(e.target.checked)}
            />
            <label className="form-check-label">Remote only</label>
          </div>
        </div>
      </div>

      {loading && <p>Loading…</p>}

      <div className="row">
        {jobs.map(j => (
          <div className="col-md-4 mb-3" key={j.url}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{j.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{j.company}</h6>
                <p className="card-text">{j.location}</p>
                <a href={j.url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                  Apply
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}