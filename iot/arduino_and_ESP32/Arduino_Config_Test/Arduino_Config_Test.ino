#define BAUD_RATE 9600
#include <DHT.h>
#include <ArduinoJson.h>

// Define sensor pins
#define DHT_PIN 2

// Create instances of sensors
DHT dht(DHT_PIN, DHT11);

void setup() {
  Serial.begin(BAUD_RATE);
  dht.begin();
}

void loop() {
   // Read sensor data
   float temperature = dht.readTemperature();
   float humidity = dht.readHumidity();

   DynamicJsonDocument json(512);
   JsonObject main = json.to<JsonObject>();    
  
    //data json
    JsonObject data = main.createNestedObject("data");
    data["temp"] = temperature;
    data["hum"] = humidity;
    //container array
    JsonArray containers = data.createNestedArray("containers");
      
    for(int i=0; i<3; i++){ 
        JsonObject containerObj = containers.createNestedObject();
        containerObj["O2"] = 5.2;
        containerObj["CO2"] = 78.2;
    }
  

  // Serialize JSON to string
  String jsonString;
  serializeJson(json, jsonString);
  
  Serial.println(jsonString);
  delay(1000);  // Adjust delay based on your needs
}