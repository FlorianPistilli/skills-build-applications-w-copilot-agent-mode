import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return (
    <div className="container py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement des entraînements...</span>
      </div>
    </div>
  );
  if (error) return (
    <div className="container py-4">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Erreur!</h4>
        <p>{error}</p>
      </div>
    </div>
  );

  const getDifficultyBadge = (difficulty) => {
    const color = difficulty === 'Facile' ? 'success' : difficulty === 'Moyen' ? 'warning' : 'danger';
    return <span className={`badge bg-${color}`}>{difficulty}</span>;
  };

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Entraînements Suggérés</h1>
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Aucun entraînement disponible.
        </div>
      ) : (
        <div className="row g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">{workout.name}</h5>
                  <div className="mb-3">
                    <small>
                      <strong>Type:</strong> <span className="badge bg-info text-dark">{workout.workout_type}</span>
                    </small>
                  </div>
                  <ul className="list-unstyled text-sm">
                    <li className="mb-2">
                      <strong>Difficulté:</strong> {getDifficultyBadge(workout.difficulty)}
                    </li>
                    <li className="mb-2">
                      <strong>Durée:</strong> <span className="badge bg-light text-dark">{workout.duration} min</span>
                    </li>
                    <li className="mb-2">
                      <strong>Calories (est.):</strong> <strong>{workout.calories_estimate}</strong>
                    </li>
                    {workout.description && (
                      <li className="mt-3">
                        <p className="card-text text-muted small">{workout.description}</p>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-outline-primary" type="button">
                    Commencer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
