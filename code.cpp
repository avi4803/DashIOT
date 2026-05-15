#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "DHT.h"

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// ---------------- HARDWARE PINS ----------------
#define DHTPIN 4          // Digital Pin connected to the DHT sensor
#define DHTTYPE DHT11     // Change to DHT11 if you are using the blue sensor
#define MOISTURE_PIN 34   // Analog Pin for Soil Moisture Sensor (ADC1_CH6)

DHT dht(DHTPIN, DHTTYPE);

// ---------------- WIFI & FIREBASE CREDENTIALS ----------------
#define WIFI_SSID "Faculty"
#define WIFI_PASSWORD "UhSj61549oe"

#define API_KEY "AIzaSyDN6Ayq39tbYxpX4tFHDmYJsofLgukmBNc"
#define DATABASE_URL "https://dashiot-d04ee-default-rtdb.asia-southeast1.firebasedatabase.app" 

// Define Firebase Data objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("\nConnected to Wi-Fi!");

  // Assign the API key and database URL
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  // Sign up for Firebase anonymously
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase auth ready");
  } else {
    Serial.printf("Firebase auth failed: %s\n", config.signer.signupError.message.c_str());
  }

  // Initialize Firebase
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Push data every 5 seconds
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // 1. Read Sensors
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    // t = 35.0 + random(0, 400) / 100.0;   // 35.00 to 38.99
    // h = 65.0 + random(0, 2500) / 100.0;  // 65.00 to 89.99
    // Read moisture (0-4095 on ESP32 ADC) and map it to a 0-100% scale
    int rawMoisture = analogRead(MOISTURE_PIN); 
    // Note: You may need to calibrate 4095 (completely dry) and 0 (completely wet) based on your exact sensor
    float m = map(rawMoisture, 4095, 0, 0, 100); 

    if (isnan(t) || isnan(h)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // 2. Create the JSON Payload
    FirebaseJson json;
    
    // Using millis() as a crude timestamp for the graph if no internet time is available.
    // In production, you would fetch NTP time.
    json.set("time", String(millis())); 
    json.set("temp", t);
    json.set("hum", h);
    json.set("moisture", m);

    // 3. Push to Firebase under devices/ESP_001/logs
    Serial.printf("Pushing Temp: %.1f°C, Hum: %.1f%%, Moisture: %.1f%% ... ", t, h, m);
    
    if (Firebase.RTDB.pushJSON(&fbdo, "/devices/ESP_001/logs", &json)) {
      Serial.println("Success!");
    } else {
      Serial.println("Failed: " + fbdo.errorReason());
    }
  }
}