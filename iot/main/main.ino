#include "wificonn.h"
#include "requests.h"


WifiConn wifiHandler;
HttpHandler httpHandler;



void setup() {
    Serial.begin(9600); 
    wifiHandler.connectWifi();
}

void loop(){
   httpHandler.postData();
   delay(1000);
}
