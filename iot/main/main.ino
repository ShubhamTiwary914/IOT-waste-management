//#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>



#define BAUD_RATE 9600
const char* ssid = "Let me die";        
const char* password = "nightcore"; 

HTTPClient http;
WiFiClient wifi;

String device_id = "65bf8b8e65186267b817fe33";
String host = "http://192.168.243.63:8080/esp/post";



void connectWifi(){
    int resetCount = 0;
    WiFi.begin(ssid, password);
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



bool postData(String jsonString){
      http.begin(wifi, host);
      http.addHeader("Content-Type", "application/json");
      int responseCode = http.POST(jsonString);

      if(responseCode > 0){
        http.end();
        return true;
      }else{
        http.end();
        return false;
      } 
}


void setup() {
   Serial.begin(BAUD_RATE);
   connectWifi();
}


void loop(){
  //arduino sends delay - 1000ms default
   if (Serial.available() > 0) {
    String jsonString = Serial.readStringUntil('\n');
    Serial.print(postData(jsonString));
  }
  else
    delay(200);
}






