//Libraries
#include "rpcWiFi.h"
#include <WiFiMulti.h>
#include "myEnv.h"
#include "TFT_eSPI.h"
#include <PubSubClient.h>
#include "LIS3DHTR.h"

//Grove Ports
#define PIR_MOTION_SENSOR D0
#define RED_LED PIN_WIRE_SCL
#define GREEN_LED D6

//Main library variables
WiFiMulti wifiMulti;
TFT_eSPI tft;
WiFiClient wioClient;
PubSubClient client(wioClient);
LIS3DHTR<TwoWire> lis;

boolean lostConnection = false;
boolean isAlarmActivated = false;

//Periodic messages emitted from Wio
int periodicMessageCounter = 0;
char periodicMessage[50];
long lastPeriodicMessageTime = 0;

//Angle sensor
long lastAngleTime = 0;
float angles_sum = 0;
boolean angleActivated = false;
long angleChangedTime = 0;

void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  char payloadBuffer[length];
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    payloadBuffer[i] = (char)payload[i];
  }
  Serial.println();
  payloadBuffer[length] = '\0';
  String payloadMessage = String(payloadBuffer);

  if (payloadMessage == "LED ON") {
    digitalWrite(RED_LED, HIGH);
  } else if (payloadMessage == "LED OFF") {
    digitalWrite(RED_LED, LOW);
  } else if (payloadMessage == "on") {
    isAlarmActivated = true;
  } else if (payloadMessage == "off") {
    isAlarmActivated = false;
  }

  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLUE);

  tft.setTextSize(4);
  tft.setCursor(cursorSpacing("SMART ALARM"), 20);
  tft.print("SMART ALARM");

  tft.setTextSize(2);
  tft.setCursor(cursorSpacing("V 1.0"), 70);
  tft.print("V1.0");

  tft.drawLine(0, 120, 320, 120, TFT_BLUE);

  String topMessage = "Alarm status: ";
  String bottomMessage = payloadMessage;

  tft.setCursor(cursorSpacing(topMessage), 160);
  tft.print(topMessage);

  tft.setCursor(cursorSpacing(bottomMessage), 180);
  tft.print(bottomMessage);
  delay(2000);
}

int cursorSpacing(String text) {
  return (320 - tft.textWidth(text)) / 2;
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "WioTerminal-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("MQTT Connected Successfully");
      client.publish(TOPIC_CONNECTION, "MQTT Connected Successfully");
      client.subscribe(TOPIC_ALARM_ACTIVATION);
    } else {
      Serial.print("failed, returnCode =");
      Serial.print(client.state());
      Serial.println("Trying again in 5 seconds...");
      delay(5000);
    }
  }
}

void publishMessages() {
  long nowTime = millis();

  if (nowTime - lastPeriodicMessageTime > 5000) {
    lastPeriodicMessageTime = nowTime;
    ++periodicMessageCounter;

    snprintf(periodicMessage, 50, "Wio sending message nr. %ld", periodicMessageCounter);

    Serial.print("Publish message: ");
    Serial.println(periodicMessage);
    client.publish(TOPIC_PERIODIC_MESSAGE, periodicMessage);
  }
}


boolean angleMonitor() {
  float x_angle = lis.getAccelerationX() * 180 / PI;
  float y_angle = lis.getAccelerationY() * 180 / PI;
  float z_angle = lis.getAccelerationZ() * 180 / PI;
  float new_angles_sum = x_angle + y_angle + z_angle;
  long nowTime = millis();

  if (nowTime - lastAngleTime > 1000) {

    lastAngleTime = nowTime;

    if (abs(angles_sum - new_angles_sum) > 30) {
      angleActivated = true;
      angleChangedTime = millis();
      Serial.println(angles_sum);
      Serial.println(new_angles_sum);
    } else {
      angleActivated = false;
    }

    angles_sum = new_angles_sum;
  }
  return angleActivated;
}

void setup() {
  Serial.begin(115200);
  Serial.println("Serial is starting...");
  delay(2000);

  tft.begin();
  tft.setRotation(3);

  wifiMulti.addAP(SSID_MOBILE, PASSWORD_MOBILE);
  wifiMulti.addAP(SSID_HOME, PASSWORD_HOME);

  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLUE);
  tft.setTextSize(2);

  Serial.println("Connecting Wifi...");

  tft.setCursor(cursorSpacing("Connecting to Wi-Fi.."), 120);
  tft.print("Connecting to Wi-Fi..");

  while (wifiMulti.run() != WL_CONNECTED) {
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  tft.fillScreen(TFT_WHITE);
  tft.setCursor(cursorSpacing("Connected!"), 120);
  tft.print("Connected!");

  client.setServer(MQTT_SERVER, 1883);  // Connect the MQTT Server
  client.setCallback(callback);

  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(PIR_MOTION_SENSOR, INPUT);
  pinMode(WIO_BUZZER, OUTPUT);

  lis.begin(Wire1);
  lis.setOutputDataRate(LIS3DHTR_DATARATE_25HZ);
  lis.setFullScaleRange(LIS3DHTR_RANGE_2G);
  float x_angle = lis.getAccelerationX() * 180 / PI;
  float y_angle = lis.getAccelerationY() * 180 / PI;
  float z_angle = lis.getAccelerationZ() * 180 / PI;
  angles_sum = x_angle + y_angle + z_angle;
}


void loop() {

  long nowTime = millis();

  if (wifiMulti.run() != WL_CONNECTED) {
    Serial.println("WiFi not connected!");
    lostConnection = true;
    delay(1000);
  } else {

    if (lostConnection == true) {
      Serial.println("");
      Serial.println("WiFi re-connected");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());

      lostConnection = false;
    }

    if (!client.connected()) {
      reconnect();
    } else {
      client.loop();

      publishMessages();

      if (isAlarmActivated) {
        digitalWrite(GREEN_LED, HIGH);
        client.publish(TOPIC_LED_GREEN, "on");
        client.publish(TOPIC_ALARM_STATUS, "on");

        boolean nothingActivated = true;

        if (digitalRead(PIR_MOTION_SENSOR)) {
          nothingActivated = false;
          client.publish(TOPIC_MOTION, "on");
          Serial.println("Something is moving!!");
        } else {
          client.publish(TOPIC_MOTION, "off");
        }

        if (angleMonitor()) {
          nothingActivated = false;
          Serial.println("Angle activated");
          client.publish(TOPIC_ANGLE, "on");
          tft.fillScreen(TFT_RED);
          Serial.println("Device being moved!!");
        } else {
          client.publish(TOPIC_ANGLE, "off");
        }

        if (nothingActivated) {
          tft.fillScreen(TFT_GREEN);
          tft.setTextColor(TFT_WHITE);

          tft.setTextSize(4);
          tft.setCursor(cursorSpacing("DETECTING"), 100);
          tft.print("DETECTING");

          Serial.println("Watching...");
          analogWrite(WIO_BUZZER, 0);
          client.publish(TOPIC_LED_RED, "off");
        } else {
          tft.fillScreen(TFT_RED);
          tft.setTextColor(TFT_WHITE);

          tft.setTextSize(4);
          tft.setCursor(cursorSpacing("WARNING"), 100);
          tft.print("WARNING");

          tft.setTextSize(2);
          tft.setCursor(cursorSpacing("INTRUSION DETECTED"), 140);
          tft.print("INTRUSION DETECTED");
          
          analogWrite(WIO_BUZZER, 128);
          digitalWrite(RED_LED, HIGH);
          delay(200);
          analogWrite(WIO_BUZZER, 0);
          digitalWrite(RED_LED, LOW);
          client.publish(TOPIC_LED_RED, "on");
        }

        delay(200);
      } else {
        digitalWrite(GREEN_LED, LOW);
        client.publish(TOPIC_LED_GREEN, "off");
        client.publish(TOPIC_LED_RED, "off");
        client.publish(TOPIC_MOTION, "off");
        client.publish(TOPIC_ALARM_STATUS, "off");
        client.publish(TOPIC_ANGLE, "off");
        delay(1000);
      }
    }
  }
}