#include "string.h"
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>



class HttpHandler{
  public:
    HTTPClient http;
    String device_id = "65bf8b8e65186267b817fe33";
    String host = "http://192.168.243.63:8080/esp/post";
    //Temp tempObj;

    bool postData(String jsonString){

        http.begin(WifiClient(), host);
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
};


