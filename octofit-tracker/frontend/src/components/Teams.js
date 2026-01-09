import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Processed teams data:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return (
    <div className="container py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement des équipes...</span>
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
      <h1 className="h3 mb-4">Équipes</h1>
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Aucune équipe disponible.
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-top border-primary border-3">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <span className="badge bg-success">{team.name}</span>
                  </h5>
                  <p className="card-text text-muted">
                    {team.description || 'Aucune description'}
                  </p>
                  <p className="card-text small">
                    <strong>Date de création:</strong> {new Date(team.created_at).toLocaleDateString()}
                  </p>
                  {team.members && team.members.length > 0 && (
                    <div className="mt-3">
                      <h6 className="mb-2">Membres ({team.members.length})</h6>
                      <div className="d-flex flex-wrap gap-1">
                        {team.members.map((member, index) => (
                          <span key={index} className="badge bg-light text-dark">
                            {member.username || member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-outline-success" type="button">
                    Voir l'équipe
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

export default Teams;
