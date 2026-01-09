import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users fetched data:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Processed users data:', usersData);
        
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <div className="container py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement des utilisateurs...</span>
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
      <h1 className="h3 mb-4">Utilisateurs</h1>
      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Aucun utilisateur disponible.
        </div>
      ) : (
        <div className="row g-4">
          {users.map((user) => (
            <div key={user.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <span className="badge bg-primary">{user.username}</span>
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>Email:</strong><br />
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </li>
                    {user.first_name && (
                      <li className="mb-2">
                        <strong>Prénom:</strong> {user.first_name}
                      </li>
                    )}
                    {user.last_name && (
                      <li className="mb-2">
                        <strong>Nom:</strong> {user.last_name}
                      </li>
                    )}
                    {user.team && (
                      <li className="mb-2">
                        <strong>Équipe:</strong> {user.team.name || user.team}
                      </li>
                    )}
                    <li>
                      <strong>Inscrit le:</strong> {new Date(user.date_joined).toLocaleDateString()}
                    </li>
                  </ul>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-outline-primary" type="button">
                    Voir le profil
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

export default Users;
