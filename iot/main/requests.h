#include <ArduinoJson.h>
#include <HTTPClient.h>


class HttpHandler{
  public:
    HTTPClient http;

    void postData() {
        DynamicJsonDocument doc(512);
        JsonObject obj = doc.to<JsonObject>();
        obj["temperature"] = 30;
        obj["humidity"] = 25;
        obj["container"] = 2;
        obj["device_id"] = 1;

        String data;
        serializeJsonPretty(obj, data);

        // Send request
        http.begin("http://192.168.6.63:8080/esp/");
        http.addHeader("Content-Type", "application/json");

        int httpCode = http.POST(data);
        if (httpCode > 0) { 
          String payload = http.getString();
          Serial.println(payload);
        }
        http.end();
        Serial.println(httpCode);
    }
};