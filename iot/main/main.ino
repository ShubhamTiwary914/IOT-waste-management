#include "wificonn.h"
#include "temp.h"
#include "requests.h"
#include <ArduinoJson.h>

<<<<<<< HEAD
//WifiConn wifiHandler;
//HttpHandler httpHandler;
=======
WifiConn wifiHandler;
Sensors sen;
HttpHandler httpHandler;
>>>>>>> eb7f110ba6ac4552641336ab656182acffe9ce0c

void setup() {
    Serial.begin(9600); 
    Serial2.begin(9600, SERIAL_8N1, 21, 22);    
    wifiHandler.connectWifi();
    Serial.println("Setup Finished");
>>>>>>> eb7f110ba6ac4552641336ab656182acffe9ce0c
}


void loop(){
<<<<<<< HEAD
  while (!Serial2.available()){ }
=======
  if (Serial2.available()){
    Serial.println("Loop Started");
    sen.temp();
>>>>>>> eb7f110ba6ac4552641336ab656182acffe9ce0c

    delay(5000);
  }
}
