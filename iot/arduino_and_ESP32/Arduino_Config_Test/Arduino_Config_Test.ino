#include <ArduinoJson.h>
#include <DHT.h>

// Define sensor pins
#define DHT_PIN 2

// Create instances of sensors
DHT dht(DHT_PIN, DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // Read sensor data
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Create JSON object
  DynamicJsonDocument doc(2048);
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;

  // Serialize JSON to string
  String jsonString;
  serializeJson(doc, jsonString);

  // Send JSON string to ESP32 via serial
  Serial.println(jsonString);
  
  Serial.println("Data sent to ESP");

  delay(5000);  // Adjust delay based on your needs
}