# Backend: Flask API for Traffic Data Simulation
from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(_name_)
CORS(app)

# Sample coordinates (Bhubaneswar locations)
locations = [
    {"location": "Kalpana", "lat": 20.2567, "lng": 85.8336},
    {"location": "Jaydev Vihar", "lat": 20.2961, "lng": 85.8189},
    {"location": "Vani Vihar", "lat": 20.2752, "lng": 85.8415},
    {"location": "Master Canteen", "lat": 20.2681, "lng": 85.8402},
]

@app.route('/api/traffic')
def get_traffic():
    data = []
    for loc in locations:
        vehicle_count = random.randint(10, 100)
        avg_speed = random.randint(20, 60)
        status = "Heavy" if vehicle_count > 70 else ("Moderate" if vehicle_count > 40 else "Light")
        data.append({
            **loc,
            "vehicle_count": vehicle_count,
            "avg_speed": avg_speed,
            "status": status
        })
    return jsonify(data)

if _name_ == '_main_':
    app.run(debug=True)
