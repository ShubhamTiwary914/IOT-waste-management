#include <DHT.h>

#define BAUD_RATE 9600
#define DHT_PIN 2
DHT dht(DHT_PIN, DHT11);

const int mq135Pin = A0;

void setup() {
  Serial.begin(BAUD_RATE);
  dht.begin();
}

void loop() {
    int mq135Value = analogRead(mq135Pin);
 
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

     float voltage = mq135Value * (5.0 / 1023.0);
    float o2Concentration = 20.9 - (voltage - 0.3) / 0.04;

    Serial.print("Temp: ");
    Serial.print(temperature);
    Serial.print(", Hum: ");
    Serial.print(humidity);
    Serial.print("\n");
    Serial.print("Gas Sensor: ");
    Serial.print(o2Concentration
    M);
    Serial.print("\n");

    delay(2000);
}
