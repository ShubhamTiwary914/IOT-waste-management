#include <DHT.h>
#include <ArduinoJson.h>

#define BAUD_RATE 9600
#define DHT_PIN 2
DHT dht(DHT_PIN, DHT11);

const byte XON = 17; 
const byte XOFF = 19; 
const String device_id = "65bf8b8e65186267b817fe33";


void setup() {
  Serial.begin(BAUD_RATE);
  dht.begin();
}


void loop() {
  if(Serial.availableForWrite() > 0) {
    DynamicJsonDocument main(1024);


    // Populate JSON document with temperature and humidity data (replace with your sensor readings)
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    //device overall
    main["device_id"] = device_id;
    JsonObject data  = main.createNestedObject("data");
    data["temp"] = temperature;
    data["humidity"] = humidity;


    //containers
    JsonArray containers = data.createNestedArray("containers");
    //container-1
    JsonObject cont_1  = containers.createNestedObject();
    cont_1["o2"] = 24.5;
    cont_1["co2"] = 24.5;
    cont_1["weight"] = 24.5;
    //container-2
    JsonObject cont_2  = containers.createNestedObject();
    cont_2["o2"] = 25.3;
    cont_2["co2"] = 23.2;
    cont_2["weight"] = 563.6;
    //container-3
    JsonObject cont_3  = containers.createNestedObject();
    cont_3["o2"] = 243.6;
    cont_3["co2"] = 24.5;
    cont_3["weight"] = 224.5;
    

    
    String jsonString;
    serializeJson(main, jsonString);
    
    Serial.write(XON);
    delay(500);
    Serial.println(jsonString);
    Serial.write(XOFF);
    delay(5000);
  }
}

