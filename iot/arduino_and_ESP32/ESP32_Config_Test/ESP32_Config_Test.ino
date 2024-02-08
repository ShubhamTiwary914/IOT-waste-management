#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);  // Serial monitor for debugging
  Serial2.begin(9600, SERIAL_8N1, 16, 17);  // Hardware Serial for communication with Arduino
}

void loop() {
  // Wait for a message from Arduino
  while (!Serial2.available()) {
    // Wait for data to be available
  }

  String message = Serial2.readStringUntil('\n');
  Serial.println("Received from Arduino: " + message);

  delay(1000);  // Wait for a moment before receiving the next message
}
