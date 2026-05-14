# Luminode IoT Platform 🌐

Luminode is a modern, open-source IoT dashboard and telemetry pipeline designed for hardware hobbyists, makers, and engineers. It provides a plug-and-play ecosystem to monitor, manage, and eventually control ESP32/ESP8266 devices over the internet without needing to write custom web interfaces for every new hardware project.

## ⚡ What is it?
At its core, Luminode solves the biggest pain point in DIY hardware: **visibility**. Instead of plugging your microcontroller into your laptop to read the Serial Monitor, Luminode gives you a beautiful, real-time web dashboard.

**Current Functionality:**
*   **Real-Time Telemetry:** Streams live sensor data (Temperature, Humidity, Soil Moisture) from your ESP32 directly to the web using Firebase Realtime Database.
*   **Oscilloscope-Style Graphs:** Visualizes historical trends instantly using smooth, animated Recharts.
*   **System Alerts:** Live logs and system status indicators let you know if a device drops offline or triggers an event.

## 🛠️ How it works for Hobbyists (Plug & Play)
Once fully built, Luminode is designed to be the central "brain" for all your DIY projects:
1.  **Build your Hardware:** Wire up your sensors to an ESP32 (Smart Greenhouse, Weather Station, automated blinds, etc.).
2.  **Flash the Standard Code:** Paste our standard C++ Firebase snippet into your Arduino IDE and hit upload.
3.  **Instant Dashboard:** Your device will instantly appear on the Luminode web dashboard. The charts and metric cards will automatically begin animating with your live data. No front-end coding required per project!

## 💻 Tech Stack (Phase 1)
*   **Frontend:** React (Vite), Tailwind CSS v4
*   **UI Components:** shadcn/ui (Lucide icons, Recharts)
*   **Cloud Pipeline:** Firebase Realtime Database
*   **Hardware:** ESP32 (C++) with Mobizt Firebase Client

---

## 🚀 The Future Roadmap
We are actively building Luminode into a commercial-grade platform. Here are the features currently in the pipeline:

### 1. Custom Node.js & WebSockets Backend
We will migrate off Firebase to a completely custom Node.js & MongoDB architecture. This allows for massive scaling, zero data costs, and true bi-directional Socket.io communication.

### 2. Over-The-Air (OTA) Firmware Updates
No more USB cables. You will be able to compile a `.bin` file on your laptop, upload it to the Luminode dashboard, and wirelessly flash your ESP32s no matter where they are in the world. Features will include version history and safe rollbacks.

### 3. Zero-Touch WiFi Provisioning (BLE/Captive Portal)
Stop hardcoding your home WiFi password into C++. New devices will act as their own router or use Bluetooth so you can seamlessly pair them to your network using your phone.

### 4. The "If-This-Then-That" Rule Engine
Turn the dashboard from a "viewer" into an "actor". Set rules like: *If Soil Moisture drops below 20%, send a command to the ESP32 to open the water valve relay, and send a push notification to my phone.*

### 5. Luminode Mobile App
Because the web dashboard is built in React, we will deploy a sister app using **React Native**. This will give users a native iOS/Android experience complete with home-screen widgets and native lock-screen push notifications.
