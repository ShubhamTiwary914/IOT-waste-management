#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>


#define BAUD_RATE 9600
HTTPClient http;
WiFiClient wifi;

String device_id = "65bf8b8e65186267b817fe33";
String host = "http://192.168.243.63:8080/esp/post";


const char* ssid = "Let me die";        
const char* password = "nightcore"; 


const byte XON = 17; 
const byte XOFF = 19;
bool receiveData = false;


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



void postData(String &jsonString){
  http.begin(wifi, host);
  http.addHeader("Content-Type", "application/json");
  http.POST(jsonString);
  http.end();
}



void setup() {
   Serial.begin(BAUD_RATE);
   connectWifi();
}



void loop(){

  if (Serial.available() > 0) {
    char incomingChar = Serial.read();
    if (incomingChar == XON){
      receiveData = true;
    }
    else if (incomingChar == XOFF){
      receiveData = false;
    }
    else if (receiveData) {
      String jsonString = Serial.readStringUntil('\n');
      String packetString = String('{') + jsonString;
      //Serial.println(packetString);
      postData(packetString);
    }
  }

  delay(100); // Adjust delay as needed
}






