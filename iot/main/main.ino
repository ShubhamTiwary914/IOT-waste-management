#include "wificonn.h"
#include "requests.h"


WifiConn wifiHandler;
HttpHandler httpHandler;



void setup() {
    Serial.begin(9600); 
    wifiHandler.connectWifi();
    httpHandler.postData();
}

void loop(){}
