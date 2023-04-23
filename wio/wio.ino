void setup() {
    Serial.begin(115200);
    while(!Serial){ // Wait for Serial to be ready
      delay(500);
    }; 
    
    Serial.println("Serial is ready.");

}

void loop() {}