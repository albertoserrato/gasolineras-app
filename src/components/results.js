import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de haber importado Bootstrap

const Results = ({ stations }) => (
  <div className="container">
    <h2 className="my-4">Gasolineras Cercanas</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio (€)</th>
          <th scope="col">Distancia (km)</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((station, idx) => (
          <tr key={idx}>
            <td>{station.name || 'Sin nombre'}</td>
            <td>{station.price ? `${station.price}€` : 'No disponible'}</td>
            <td>{station.distance ? `${station.distance} km` : 'No calculada'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Results;
