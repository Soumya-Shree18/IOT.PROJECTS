// React Frontend for Smart Agriculture Dashboard
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function AgricultureDashboard() {
  const [sensorData, setSensorData] = useState({});

  const fetchSensorData = async () => {
    const res = await fetch('http://localhost:5000/api/sensors');
    const data = await res.json();
    setSensorData(data);
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Live Sensor Readings</h2>
          <p><b>Soil Moisture:</b> {sensorData.soil_moisture}%</p>
          <p><b>Temperature:</b> {sensorData.temperature}°C</p>
          <p><b>Humidity:</b> {sensorData.humidity}%</p>
          <p><b>Rainfall Detected:</b> {sensorData.rain_detected ? 'Yes' : 'No'}</p>
          <p><b>Irrigation Status:</b> {sensorData.irrigation_on ? 'ON' : 'OFF'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
