// Arduino Code: ESP32 + Ultrasonic Sensor (HC-SR04) to Measure Vehicle Distance
#define TRIG_PIN 5
#define ECHO_PIN 18

#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  long duration;
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  duration = pulseIn(ECHO_PIN, HIGH);

  float distance = duration * 0.034 / 2;
  Serial.print("Distance: ");
  Serial.println(distance);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://your-server-ip/api/update-vehicle"); // replace with your server
    http.addHeader("Content-Type", "application/json");
    String payload = "{\"distance\":" + String(distance) + "}";
    int code = http.POST(payload);
    String response = http.getString();
    Serial.println(code);
    Serial.println(response);
    http.end();
  }

  delay(5000); // wait for 5 seconds before next read
}
