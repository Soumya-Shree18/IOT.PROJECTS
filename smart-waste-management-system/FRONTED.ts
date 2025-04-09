// Frontend: React + Tailwind + Leaflet (Map View)
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function TrafficDashboard() {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/api/traffic');
      const data = await res.json();
      setTrafficData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Live Traffic Data</h2>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Location</th>
                <th>Vehicle Count</th>
                <th>Speed (km/h)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.map((item, i) => (
                <tr key={i}>
                  <td>{item.location}</td>
                  <td>{item.vehicle_count}</td>
                  <td>{item.avg_speed}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Traffic Heatmap</h2>
          <MapContainer center={[20.2961, 85.8245]} zoom={13} className="h-80 w-full rounded-xl">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {trafficData.map((item, i) => (
              <Marker key={i} position={[item.lat, item.lng]}>
                <Popup>
                  <b>{item.location}</b><br />
                  Vehicles: {item.vehicle_count}<br />
                  Avg Speed: {item.avg_speed} km/h
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  );
}
