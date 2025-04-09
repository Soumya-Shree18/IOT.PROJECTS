from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(_name_)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client.smart_waste
bins = db.bins

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    data['timestamp'] = datetime.utcnow()
    bins.insert_one(data)
    return jsonify({"message": "Data received"}), 200

@app.route('/api/bins', methods=['GET'])
def get_bins():
    bin_data = list(bins.find({}, {'_id': 0}))
    return jsonify(bin_data)

if _name_ == '_main_':
    app.run(debug=True, port=5000)
