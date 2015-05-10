
void setup() {
  Serial.begin(9600);
  Serial.println(' ');
}

void loop() {
  char inByte = ' ';

  // if data has been sent: read it and echo it back
  if(Serial.available()){
    char inByte = Serial.read();
    Serial.print(inByte);
  }
  delay(100);
}

