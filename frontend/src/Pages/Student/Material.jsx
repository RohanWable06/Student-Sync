// src/components/MaterialList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:8080/materials');
        setMaterials(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching materials.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  if (loading) return <p>Loading materials...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Materials</h2>
      <div className="row">
        {materials.map(material => (
          <div key={material.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{material.name}</h5>
                <p className="card-text">{material.description}</p>
                {material.link && (
                  <a href={material.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    View Material
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Material;
