#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include<WiFiClient.h>


const char WIFI_SSID[] = "shubhamtw";        
const char WIFI_PASSWORD[] = "yugy6676"; 

String HOST_NAME   = "http://192.168.250.63:8080/esp/";
HTTPClient http;
WiFiClient client;


void connectWifi(){
    int resetCount = 0;
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.println("Connecting");
    while(WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
      resetCount++;
      if(resetCount > 10)
        break;
    }

    if(WiFi.status() == WL_CONNECTED){
        Serial.println("\nConnected to WiFi network with IP Address: ");
        Serial.println(WiFi.localIP());
    }
   else{
       Serial.print("Failed: Attempting to reconnect: \n"); 
       connectWifi();
   }
}


void postDataToServer() {
    DynamicJsonDocument doc(512);
    JsonObject obj = doc.to<JsonObject>();
    obj["temperature"] = 30;

    String data;
    serializeJsonPretty(obj, data);

    // Send request
    http.addHeader("Accept:", "application/json");
    http.begin(client, "http://192.168.250.63:8080/esp/");
    http.POST(data);

    // Read response
    Serial.print(http.getString());

    // Disconnect
    http.end();
}


void setup() {
    Serial.begin(9600); 
    connectWifi();
    postDataToServer();
}




void loop() {

}
