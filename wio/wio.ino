#include "rpcWiFi.h"
#include <WiFiMulti.h>
#include "myEnv.h"
#include "TFT_eSPI.h"
#include <PubSubClient.h>

#include "LIS3DHTR.h"  //include the accelerator library
LIS3DHTR<TwoWire> lis;

#define MAX_SIZE 50  //maximum size of data

#define PIR_MOTION_SENSOR D0
#define RED_LED PIN_WIRE_SCL
#define GREEN_LED D6

const char* ssid_mobile = SSID_MOBILE;
const char* password_mobile = PASSWORD_MOBILE;

const char* ssid_home = SSID_HOME;
const char* password_home = PASSWORD_HOME;

boolean lostConnection = false;

const char* mqtt_server = MQTT_SERVER;

boolean isAlarmActivated = false;

WiFiMulti wifiMulti;

TFT_eSPI tft;
WiFiClient wioClient;
PubSubClient client(wioClient);

long lastMessageTime = 0;
long lastAngleTime = 0;
char newMessage[50];
int messageCounter = 0;

float angles_sum = 0;
float original_angle = 0;

boolean angleActivated = false;

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
  if (msg_p == "red") {
    bgColor = TFT_RED;
  } else if (msg_p == "green") {
    bgColor = TFT_GREEN;
  } else if (msg_p == "blue") {
    bgColor = TFT_BLUE;
  } else if (msg_p == "yellow") {
    bgColor = TFT_YELLOW;
  } else if (msg_p == "white") {
    bgColor = TFT_WHITE;
  } else if (msg_p == "orange") {
    bgColor = TFT_ORANGE;
  } else if (msg_p == "LED ON") {
    digitalWrite(RED_LED, HIGH);
  } else if (msg_p == "LED OFF") {
    digitalWrite(RED_LED, LOW);
  } else if (msg_p == "on") {
    isAlarmActivated = true;
  } else if (msg_p == "off") {
    isAlarmActivated = false;
  }

  int textColor = TFT_YELLOW;  // initializee the text color to white

  tft.fillScreen(bgColor);
  tft.setTextColor(textColor, bgColor);
  tft.setTextSize(2);

  tft.setCursor((320 - tft.textWidth("Message received: ")) / 2, 90);
  tft.print("Message received: ");
  tft.setCursor((320 - tft.textWidth(msg_p)) / 2, 120);
  tft.print(msg_p);  // Print receved payload
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
      //0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000client.publish(topicOut, "hello world");
      // ... and resubscribe
      client.subscribe(TOPIC_ALARM_ACTIVATION);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}


void publishMessages() {
  /*long nowTime = millis();
  if (nowTime - lastMessageTime > 2000) {
    lastMessageTime = nowTime;
    ++messageCounter;

    snprintf(newMessage, 50, "Sending message nr. %ld", messageCounter);

    Serial.print("Publish message: ");
    Serial.println(newMessage);
    client.publish(topicOut, newMessage);
  }*/
}

void setup() {
  Serial.begin(115200);
  Serial.println("Serial is starting...");
  delay(2000);

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

  client.setServer(mqtt_server, 1883);  // Connect the MQTT Server
  client.setCallback(callback);

  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

  pinMode(PIR_MOTION_SENSOR, INPUT);

  pinMode(WIO_BUZZER, OUTPUT);


  Serial.println("Gyroscope example");
  lis.begin(Wire1);
  lis.setOutputDataRate(LIS3DHTR_DATARATE_25HZ);
  lis.setFullScaleRange(LIS3DHTR_RANGE_2G);
}


void angleMonitor() {
  float x_angle = lis.getAccelerationX() * 180 / PI;
  float y_angle = lis.getAccelerationY() * 180 / PI;
  float z_angle = lis.getAccelerationZ() * 180 / PI;
  long nowTime = millis();

  if (nowTime - lastAngleTime > 300) {

    lastAngleTime = nowTime;

    float new_angles_sum = x_angle + y_angle + z_angle;

    if (angles_sum != 0) {
      if (abs(angles_sum - new_angles_sum) > 15 || (abs(original_angle - new_angles_sum) > 30)) {
        angleActivated = true;
      } else {
        angleActivated = false;
      }
    } else {
      original_angle = new_angles_sum;
    }
    angles_sum = new_angles_sum;

    if (angleActivated) {
      Serial.println("Angle activated");
      client.publish(TOPIC_ANGLE, "on");
    } else {
      client.publish(TOPIC_ANGLE, "off");
    }
  }
}

void loop() {

  long nowTime = millis();

  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.println("WiFi not connected!");
    lostConnection = true;
    delay(1000);
  }

  if (lostConnection == true) {
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

  if (isAlarmActivated) {
    digitalWrite(GREEN_LED, HIGH);
    client.publish(TOPIC_LED_GREEN, "on");
    client.publish(TOPIC_ALARM_STATUS, "on");

    if (digitalRead(PIR_MOTION_SENSOR)) {
      tft.fillScreen(TFT_RED);
      Serial.println("Something is moving!!");
      client.publish(TOPIC_MOTION, "on");
      analogWrite(WIO_BUZZER, 128);
      digitalWrite(RED_LED, HIGH);
      delay(200);
      analogWrite(WIO_BUZZER, 0);
      digitalWrite(RED_LED, LOW);
      client.publish(TOPIC_LED_RED, "on");
    } else {
      tft.fillScreen(TFT_GREEN);
      Serial.println("Watching...");
      client.publish(TOPIC_MOTION, "off");
      analogWrite(WIO_BUZZER, 0);
      client.publish(TOPIC_LED_RED, "off");
    }

    angleMonitor();
    delay(200);
  } else {
    digitalWrite(GREEN_LED, LOW);
    client.publish(TOPIC_LED_GREEN, "off");
    client.publish(TOPIC_LED_RED, "off");
    client.publish(TOPIC_MOTION, "off");

    client.publish(TOPIC_ALARM_STATUS, "off");
    client.publish(TOPIC_ANGLE, "off");
  }
}