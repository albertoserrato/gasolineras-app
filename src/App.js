import React, { useState } from 'react';
import InputForm from './components/inputForm';
import Results from './components/results';
import Map from './components/map';
import axios from 'axios';

const App = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async ({ lat, lon }) => {
    try {
      const response = await axios.get('https://datos.gob.es/apidata/catalog/dataset.json');
      const rawStations = response.data.result.items;

      // Procesamos los datos
      const processedStations = rawStations.slice(0, 10).map((station) => ({
        name: station.title?._value || 'Sin nombre',
        price: Math.random() * (1.8 - 1.2) + 1.2, // Precio generado como ejemplo
        lat: lat + Math.random() * 0.02 - 0.01,
        lon: lon + Math.random() * 0.02 - 0.01,
        distance: Math.random() * 5,
      }));

      setStations(processedStations);
      setError('');
    } catch (err) {
      console.error('Error al obtener datos:', err);
      setError('No se pudo obtener la información. Intenta nuevamente.');
    }
  };

  return (
    <div className="container my-5">
    <h1 className="text-center my-4">Gasolineras Cercanas</h1>

    {/* Formulario de búsqueda */}
    <InputForm onSearch={handleSearch} />

    {/* Tabla de ciudades con latitud y longitud */}
    <div class="container my-5">
      <h2 class="text-center my-4">Ciudades Principales de Madrid</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ciudad</th>
            <th scope="col">Latitud</th>
            <th scope="col">Longitud</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Madrid</td>
            <td>40.4168</td>
            <td>-3.7038</td>
          </tr>
          <tr>
            <td>Alcalá de Henares</td>
            <td>40.4811</td>
            <td>-3.3632</td>
          </tr>
          <tr>
            <td>Getafe</td>
            <td>40.3080</td>
            <td>-3.7327</td>
          </tr>
          <tr>
            <td>Fuenlabrada</td>
            <td>40.2897</td>
            <td>-3.8040</td>
          </tr>
          <tr>
            <td>Leganés</td>
            <td>40.3270</td>
            <td>-3.7630</td>
          </tr>
        </tbody>
      </table>
    </div>

 

    {/* Mostrar error si existe */}
    {error && <p style={{ color: 'red' }} className="text-center">{error}</p>}

    {/* Fila que contiene resultados y mapa */}
    <div className="row">
      {/* Columna para los resultados */}
      <div className="col-md-6">
        <h3 className="text-center">Resultados</h3>
        <Results stations={stations} />
      </div>

      {/* Columna para el mapa */}
      <div className="col-md-6">

        <h3 className="text-center">Mapa</h3>
        <h2 class="my-4">Ubicación de Gasolineras Cercanas</h2>
        <Map stations={stations} />
      </div>
    </div>
  </div>
  );
};

export default App;
