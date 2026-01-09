import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="container py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement du classement...</span>
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
      <h1 className="h3 mb-4">Classement Compétitif</h1>
      {leaderboard.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Aucune donnée de classement disponible.
        </div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Rang</th>
                  <th>Utilisateur</th>
                  <th>Équipe</th>
                  <th>Total Calories</th>
                  <th>Total Durée (min)</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index} className={index < 3 ? 'table-success' : ''}>
                    <td>
                      {index === 0 && <span className="badge bg-warning text-dark">🥇 {index + 1}</span>}
                      {index === 1 && <span className="badge bg-secondary">🥈 {index + 1}</span>}
                      {index === 2 && <span className="badge bg-danger">🥉 {index + 1}</span>}
                      {index > 2 && <span>{index + 1}</span>}
                    </td>
                    <td><strong>{entry.user?.username || entry.user}</strong></td>
                    <td>{entry.team?.name || entry.team || 'N/A'}</td>
                    <td>{entry.total_calories || 0}</td>
                    <td>{entry.total_duration || 0}</td>
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

export default Leaderboard;
