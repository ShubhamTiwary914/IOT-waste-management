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


int measureQuantity(float minval, float maxval, float curr){
    if(curr < minval)
      return 0;

    int qt = 1;
    float val = qt*minval;

    int minDiff = -1;
    int minQ = 0;
    while(val <= curr){
        if(minDiff == -1 || curr - val < minDiff){
          minDiff = curr - val;
          minQ = qt;
        }
        qt++;
        val = qt*minval;
    }
    return minQ;
}


float abss(float num){
    if(num < 0)
      return -num;
    return num;
}



float quantCalc2(float minval, float maxval, float curr){
  if(curr < minval)
      return 0;

  float qt = 1;
  float res = 0;
  float mindiff = -1;


  while(qt*minval <= curr){
    float mid = ((minval*qt) + (maxval*qt))/2;
    if(mindiff == -1 || abss(curr - mid) < mindiff){
      mindiff = abss(curr - mid);
      res = qt;
    }
    qt++;
  }

  return res;
}




String item = "Onion";
int minval = 60;
int maxval = 130;


void loop()
{
  units = scale.get_units(),10;
  if (units < 0)
    units = 0.00;
  Serial.print(item);
  Serial.print("  ");
  Serial.print(units);
  Serial.print(" grams");
  Serial.print("\ Estimated Quantity: ");
  Serial.println(quantCalc2((float)minval, (float)maxval, units));
  delay(1000);
}
