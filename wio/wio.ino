#include "rpcWiFi.h"
#include <WiFiMulti.h>
#include "myEnv.h"

WiFiMulti wifiMulti;

void setup() {
    Serial.begin(115200);
    while(!Serial){ // Wait for Serial to be ready
      delay(500);
    }; 
    Serial.println("Serial is ready.");
    
    wifiMulti.addAP(SSID_MOBILE, PASSWORD_MOBILE);
    wifiMulti.addAP(SSID_HOME, PASSWORD_HOME);
    
    Serial.println("Connecting Wifi...");
    if (wifiMulti.run() == WL_CONNECTED) {
        Serial.println("");
        Serial.println("WiFi connected");
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());
    }
}

void loop() {
    if (wifiMulti.run() != WL_CONNECTED) {
        Serial.println("WiFi not connected!");
        delay(1000);
    }
}