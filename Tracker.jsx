import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tracker() {
  const [apps, setApps] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', status: 'Applied' });

  const refresh = () => axios.get('/api/applications').then(r => setApps(r.data));

useEffect(() => {
  refresh();
}, []);   // empty array → run only once on mount

  const add = async () => {
    await axios.post('/api/applications', { ...form, dateApplied: new Date() });
    refresh();
    setShow(false);
    setForm({ company: '', role: '', status: 'Applied' });
  };

  return (
    <div className="container">
      <h2 className="mb-3">Application Tracker</h2>
      <button className="btn btn-success mb-3" onClick={() => setShow(true)}>Add Entry</button>

      <table className="table table-striped">
        <thead><tr><th>Company</th><th>Role</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
        <tbody>
          {apps.map(a => (
            <tr key={a._id}>
              <td>{a.company}</td>
              <td>{a.role}</td>
              <td><span className={`badge bg-${a.status === 'Rejected' ? 'danger' : 'warning'}`}>{a.status}</span></td>
              <td>{new Date(a.dateApplied).toLocaleDateString()}</td>
               <td>
    <button className="btn btn-sm btn-outline-danger" onClick={() => del(a._id)  }>
      Delete
    </button>
  </td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,.4)' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Add Application</h5></div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                <input className="form-control mb-2" placeholder="Role" value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
                <select className="form-select" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option>Applied</option><option>Interviewing</option><option>Offer</option><option>Rejected</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                <button className="btn btn-primary" onClick={add}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const del = async (id) => {
  if (!window.confirm('Delete this record?')) return;
  await axios.delete(`/api/applications/${id}`);
  refresh();              // re-fetch list
};