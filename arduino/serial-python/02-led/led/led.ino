
#define LED 13

void setup() {
  pinMode( LED, OUTPUT );
  Serial.begin(9600);
  Serial.println(' ');
}

void loop() {
  char inByte = ' ';

  // keep the light on for however long the serial message says
  if(Serial.available()){
    char inByte = Serial.read();
    int duration = (inByte-48)*100;
    digitalWrite( LED, HIGH );
    delay( duration );
    digitalWrite( LED, LOW );
    delay( duration );
    Serial.print(inByte);
  }
  
}

