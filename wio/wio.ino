#include "rpcWiFi.h"
#include <WiFiMulti.h>
#include "myEnv.h"
#include "TFT_eSPI.h"
#include <PubSubClient.h>

const char* ssid_mobile = SSID_MOBILE;
const char* password_mobile = PASSWORD_MOBILE;

const char* ssid_home = SSID_HOME;
const char* password_home = PASSWORD_HOME;

boolean lostConnection = false;

const char* mqtt_server = MQTT_SERVER;

const char* topicOut = TOPIC_OUT;
const char* topicIn = TOPIC_IN;

WiFiMulti wifiMulti;

TFT_eSPI tft;
WiFiClient wioClient;
PubSubClient client(wioClient);

long lastMessageTime = 0;
char newMessage[50];
int messageCounter = 0;


void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  char buff_p[length];
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    buff_p[i] = (char)payload[i];
  }
  Serial.println();
  buff_p[length] = '\0';
  String msg_p = String(buff_p);


  int bgColor = TFT_BLACK;
  int textColor = TFT_YELLOW;    // initializee the text color to white

  tft.fillScreen(bgColor);
  tft.setTextColor(textColor, bgColor);
  tft.setTextSize(2);

  tft.setCursor((320 - tft.textWidth("Message received: ")) / 2, 90);
  tft.print("Message received: " );
  tft.setCursor((320 - tft.textWidth(msg_p)) / 2, 120);
  tft.print(msg_p); // Print receved payload

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "WioTerminal-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish(topicOut, "hello world");
      // ... and resubscribe
      client.subscribe(topicIn);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void publishMessages(){
  long nowTime = millis();
  if (nowTime - lastMessageTime > 2000) {
    lastMessageTime = nowTime;
    ++messageCounter;

    snprintf(newMessage, 50, "Sending message nr. %ld", messageCounter);

    Serial.print("Publish message: ");
    Serial.println(newMessage);
    client.publish(topicOut, newMessage);
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial) {  // Wait for Serial to be ready
    delay(500);
  };
  Serial.println("Serial is ready.");

 tft.begin();
  tft.fillScreen(TFT_BLACK);
  tft.setRotation(3);


  wifiMulti.addAP(SSID_MOBILE, PASSWORD_MOBILE);
  wifiMulti.addAP(SSID_HOME, PASSWORD_HOME);

  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(2);

  Serial.println("Connecting Wifi...");
  //Serial.print("Connecting to ");
  //Serial.println(SSID_MOBILE);
  tft.setCursor((320 - tft.textWidth("Connecting to Wi-Fi..")) / 2, 120);
  tft.print("Connecting to Wi-Fi..");
  
  if (wifiMulti.run() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    tft.setCursor((320 - tft.textWidth("Connected!")) / 2, 120);
    tft.print("Connected!");
  }

  client.setServer(mqtt_server, 1883); // Connect the MQTT Server
  client.setCallback(callback);

}

void loop() {
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.println("WiFi not connected!");
            lostConnection = true;
    delay(1000);
  }

    if(lostConnection == true){
       Serial.println("");
        Serial.println("WiFi re-connected");
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());

      lostConnection = false;
    }

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  publishMessages();

}