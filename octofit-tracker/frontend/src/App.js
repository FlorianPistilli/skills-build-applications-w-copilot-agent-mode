import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={process.env.PUBLIC_URL + '/octofitapp-small.png'}
              alt="OctoFit"
              className="brand-logo"
            />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/users" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Utilisateurs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/activities" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Activités</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/teams" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Équipes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leaderboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Classement</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/workouts" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Entraînements</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <main className="py-4">
        <Routes>
          <Route path="/" element={
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h1 className="display-4 mb-4">Bienvenue sur OctoFit Tracker</h1>
                  <p className="lead">Suivez vos activités fitness et comparez vos performances avec votre équipe!</p>
                  <div className="alert alert-info" role="alert">
                    <strong>Conseil:</strong> Sélectionnez une section dans le menu de navigation pour commencer.
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
