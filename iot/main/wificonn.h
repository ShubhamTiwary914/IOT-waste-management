#include <WiFi.h>

class WifiConn{
    public:
      const char* ssid = "Let me die";        
      const char* password = "nightcore"; 

      void connectWifi(){
          int resetCount = 0;
          WiFi.begin(this->ssid, this->password);
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
              this->connectWifi();
          }
      }
};
