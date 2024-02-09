#include <ArduinoJson.h>
#include <SoftwareSerial.h>

class Sensors {
  public:
    void temp() {
    
      DynamicJsonDocument doc(2048);

        // Read characters until a complete JSON object is received
        String jsonStr;
        while (Serial.available()) {
            char c = Serial.read();
            jsonStr += c;
            if (c == '}') {
                break; // End of JSON object
            }
        }

        // Parse JSON string
        DeserializationError error = deserializeJson(doc, jsonStr);
        if (error) {
            Serial.print("deserializeJson() failed: ");
            Serial.println(error.c_str());
            return;
        }

        // Extract sensor data from JSON object
        float temperature = doc["temperature"];
        float humidity = doc["humidity"];

        // Print sensor data
        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.print(" °C, Humidity: ");
        Serial.println(humidity);
    }
};
