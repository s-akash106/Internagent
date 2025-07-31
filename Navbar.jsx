import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 justify-content-center flex-column">
      <div className="container-fluid justify-content-center">
        <Link className="navbar-brand fw-bold" to="/">InternAgent</Link>
       
      </div>
      
          <div className=" container-fluid navbar-nav me-auto  nav-underlines d-flex justify-content-evenly">
            <li className="nav-item">
              <NavLink className="nav-link" to="/jobs">Find Jobs</NavLink>
        </li>
         <li>
              <NavLink className="nav-link" to="/search">Search</NavLink>
              
        </li>
        <li className="nav-item">
              <NavLink className="nav-link" to="/tracker">Tracker</NavLink>
        </li>
        

            
           
             
          </div>
        
    </nav>
  );
}

