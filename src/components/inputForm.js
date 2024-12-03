import React, { useState } from 'react';

const InputForm = ({ onSearch }) => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [error, setError] = useState('');

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocalización no está soportada por este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setError('');
      },
      () => setError('No se pudo obtener tu ubicación.')
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      setError('Por favor, ingresa coordenadas válidas.');
      return;
    }
    onSearch({ lat: parseFloat(lat), lon: parseFloat(lon) });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <div class="row mb-4">
      <div class="col-md-6">
        <label>Latitud:
        <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} />
        </label>
      </div>
      <div class="col-md-6">
        <label>Longitud:
          <input type="text" value={lon} onChange={(e) => setLon(e.target.value)} />
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="button" class="btn btn-primary w-100" onClick={handleGeolocation}>Usar mi ubicación</button>
      </div>
      <div class="col-md-6">
        <button type="submit" class="btn btn-success w-100">Buscar</button>
      </div>
    </div>
  </form>
  );
};

export default InputForm;
