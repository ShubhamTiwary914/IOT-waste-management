#include <DHT.h>




class Temp{
    public: 
      DHT dht(DHT_PIN, DHT_TYPE);

      Temp(){
        dht.begin();
      }


      float getTemp(){
          float temperature = dht.readTemperature();
          return temperature;
      }

};


