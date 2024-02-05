#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);  // Serial monitor for debugging
}

void loop() {
  // Create a JSON document
  DynamicJsonDocument doc(200);

  // Add data to the JSON document
  doc["sensor"] = "DHT11";
  doc["temperature"] = 25.5;
  doc["humidity"] = 60;

  // Serialize JSON to a String
  String jsonString;
  serializeJson(doc, jsonString);

  // Send JSON data to ESP32
  Serial.println(jsonString);

  delay(2000);  // Wait for a moment before sending the next data
}
