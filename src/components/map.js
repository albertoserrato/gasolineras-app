import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ stations }) => (
  <MapContainer center={[40.416775, -3.703790]} zoom={10} style={{ height: '400px', width: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {stations.map((station, idx) => (
      station.lat && station.lon ? (
        <Marker key={idx} position={[station.lat, station.lon]}>
          <Popup>{station.name || 'Gasolinera sin nombre'}</Popup>
        </Marker>
      ) : null
    ))}
  </MapContainer>
);

export default Map;

