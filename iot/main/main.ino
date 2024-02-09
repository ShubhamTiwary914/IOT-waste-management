#include "wificonn.h"
#include "requests.h"



//WifiConn wifiHandler;
//HttpHandler httpHandler;




void setup() {
    Serial.begin(9600); 
    Serial2.begin(9600, SERIAL_8N1, 16, 17);  
    //wifiHandler.connectWifi();
}


void loop(){
  while (!Serial2.available()){ }

  String message = Serial2.readStringUntil('\n');
  Serial.println("Received from Arduino: " + message);

  delay(1000);  
}





