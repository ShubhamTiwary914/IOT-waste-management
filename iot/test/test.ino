int count;
void setup() {
  Serial.begin(9600);
  count = 0;
}


void loop() {
  Serial.println(count);
  count++;
  delay(200);
}
