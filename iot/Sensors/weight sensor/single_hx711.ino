#include "HX711.h"

#define DOUT_PIN  7
#define CLK_PIN   6

HX711 scale;

float calibration_factor = -375;
float units;
float ounces;

void setup()
{
  Serial.begin(9600);
  scale.begin(DOUT_PIN, CLK_PIN);
  Serial.println("HX711 weighing");
  scale.set_scale(calibration_factor);
  scale.tare();
  Serial.println("Readings:");
}

void loop()
{
  Serial.print("Reading:");
  units = scale.get_units(),10;
  if (units < 0)
  {
    units = 0.00;
  }
  ounces = units * 0.035274;
  Serial.print(units);
  Serial.println(" grams");
  delay(1000);
}
