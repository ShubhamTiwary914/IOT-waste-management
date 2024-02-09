#include "wificonn.h"
#include "temp.h"
#include "requests.h"
#include <ArduinoJson.h>

WifiConn wifiHandler;
Sensors sen;
HttpHandler httpHandler;

void setup() {
    Serial.begin(9600); 
    Serial2.begin(9600, SERIAL_8N1, 16, 17);    
    wifiHandler.connectWifi();
    Serial.println("Setup Finished");
}


void loop(){
  if (Serial2.available()){
    Serial.println("Loop Started");
    sen.temp();

    delay(5000);
  }
}
