#include <SPI.h>
#include <LoRa.h>

// Ultrasonic sensor pins
#define TRIG_PIN 5
#define ECHO_PIN 18

// LoRa settings
#define LORA_SS 15
#define LORA_RST 14
#define LORA_DIO0 26
#define BAND 433E6  // Use 865E6 for India

void setup() {
  Serial.begin(9600);
  
  // Sensor pin setup
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  // LoRa initialization
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(BAND)) {
    Serial.println("LoRa init failed. Check connections.");
    while (true);
  }
  Serial.println("LoRa init success.");
}

float readDistanceCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2;
}

void loop() {
  float distance = readDistanceCM();  // Distance from top of bin

  // Assume bin height is 50cm
  float fillLevel = 100 - (distance / 50.0 * 100);
  if (fillLevel < 0) fillLevel = 0;
  if (fillLevel > 100) fillLevel = 100;

  // Prepare data packet
  String message = "BinID:001,FillLevel:" + String(fillLevel, 2) + "%";

  // Send via LoRa
  LoRa.beginPacket();
  LoRa.print(message);
  LoRa.endPacket();

  Serial.println("Sent: " + message);

  delay(60000); // Send every 1 minute
}
