import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Processed activities data:', activitiesData);
        
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return (
    <div className="container py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement des activités...</span>
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

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Activités</h1>
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Aucune activité disponible.
        </div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>
                  <th>Utilisateur</th>
                  <th>Durée (min)</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <span className="badge bg-primary">{activity.activity_type}</span>
                    </td>
                    <td>{activity.user?.username || activity.user}</td>
                    <td>{activity.duration}</td>
                    <td><strong>{activity.calories_burned}</strong></td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
