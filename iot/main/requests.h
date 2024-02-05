#include "string.h"
#include <ArduinoJson.h>
#include <HTTPClient.h>


class HttpHandler{
  public:
    HTTPClient http;
    const char* device_id = "65bf8b8e65186267b817fe33";
    const char* host = "http://192.168.41.63:8080/esp/post";


    void postData(){
        String jsonString;
        DynamicJsonDocument json(512);

        //total packet json
        JsonObject main = json.to<JsonObject>();
        main["device_id"] = device_id;

        //data json
        JsonObject data = main.createNestedObject("data");
        data["temp"] = 34.5;
        //container array
        JsonArray containers = data.createNestedArray("containers");
        
       
          
        for(int i=0; i<3; i++){ 
            JsonObject containerObj = containers.createNestedObject();
            containerObj["o2"] = 5.2;
            containerObj["co2"] = 78.2;
            containerObj["weight"] = 5325;
        }

        //serialize & POST
        serializeJsonPretty(main, jsonString);
        //change ip here according to local ip of device that runs backend
        http.begin(host);
        http.addHeader("Content-Type", "application/json");
        http.POST(jsonString);
        http.end();
    }
};

