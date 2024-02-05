#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);  // Serial monitor for debugging
  Serial2.begin(9600, SERIAL_8N1, 16, 17);  // Hardware Serial for communication with Arduino
}

void loop() {
  // Wait for a message from Arduino
  while (!Serial2.available()) {
    // Wait for data to be available
  }

  // Read the message from Arduino
  String jsonString = Serial2.readString();

  // Deserialize JSON
  DynamicJsonDocument doc(200);
  deserializeJson(doc, jsonString);

  // Extract data from JSON
  String sensor = doc["sensor"];
  float temperature = doc["temperature"];
  float humidity = doc["humidity"];

  // Print received data
  Serial.print("Received from Arduino - Sensor: ");
  Serial.print(sensor);
  Serial.print(", Temperature: ");
  Serial.print(temperature);
  Serial.print(", Humidity: ");
  Serial.println(humidity);

  delay(1000);  // Wait for a moment before receiving the next message
}
