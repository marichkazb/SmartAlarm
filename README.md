# SmartAlarm [Group #5]

<div align="center">
 <img src="assets/alarm_image.png"
  alt="SmartAlarm icon"
 width="250" 
 height="250">
</div>

## What is SmartAlarm?

SmartAlarm is a [student-maintained project](README.md#-project-status) consisting of building a smart alarm system - which encompasses a range of `sensors` and `actuators` - to protect the users’ houses from intrusions. 

The system features a device which can be placed at a substantial spot in the house of the user and it will be enabled by the user in scenarios when either the user is away from their house or in a place where they would like to secure the house and be aware of any possible red signs.

### Main features

<details>
<summary>Intruder detection</summary>

>Whenever an intruder is detected, a red LED will be activated, the speaker will produce an alerting sound and a notification will be sent to a remote device to inform about the danger.

</details>

<details>
<summary>Anti-Tampering protection</summary>

>Detects whether someone is trying to move or damage the device itself by integrating a gyroscope sensor. A red LED and alerting speakers are activated immediately.

</details>

<details>
<summary>Activated device indicator</summary>

>Indicates that the vicinity is protected, signaling the owner and deterring would-be intruders. Uses a green LED.

</details>

<details>
<summary>Connection testing</summary>

>Check if the communication is working as intended, in which case clicking a physical button will allow users to ping the remote device.

</details>

## 🎬 Project demo
* [Demo](https://www.youtube.com/watch?v=n2lq2O7l1xM)

---
## 🔨 Pre-setup

### Windows
Download NodeJS
https://nodejs.org/en

### MacOS
same OR 

Install Homebrew https://brew.sh/

```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Install NodeJS:
```
    brew install node 
```

---

## 🚀 Getting started

```
  -> navigate to the projects folder (ex. cd IdeaProjects)
  git clone git@git.chalmers.se:courses/dit113/2023/group-5/smartalarm.git
  cd smartalarm
  npm install
  npx expo start
```
--- 

## 📃 Documentation

* [Wiki](https://git.chalmers.se/courses/dit113/2023/group-5/smartalarm/-/wikis/home)

---
## 🚨 Project status

The SmartAlarm project is currently underway. 

This project is being implemented by students and constitutes a requisite for the course DIT113 (Mini Project: Systems Development) of the Bachelor's Degree in Software Engineering and Management, offered by the University of Gothenburg. 

>**_NOTE:_** No maintenance or further development of this project is expected to occur beyond the duration of the course (i.e. Spring 2023).

---
## 👥 Authors and Acknowledgements

### Contributors

* [Abhimanyu Kumar](https://git.chalmers.se/kumarab)
* [Agrima Singh](https://git.chalmers.se/agrima)
* [David Rocha](https://git.chalmers.se/davidroc)
* [Mariia Zabolotnia](https://git.chalmers.se/mariiaz)
* [Milena Maćkowiak](https://git.chalmers.se/milenam)
* [Oana Isabela Mitac](https://git.chalmers.se/mitac)

>This project is not open to new contributors.

### Technologies used
* Wio Seeed Hardware
* Java
* Expo
* JavaScript
* React Native
* React Native Libraries
  * React Native Navigation
  * React Native Base
  * Expo Icons
* ESLint
* C++
* IntelliJ / Android Studio IDE
* Arduino IDE
* Arduino IDE Libraries
  * Seeed Arduino SFUD
  * PubSubClient
  * Seeed Arduino FS
  * Seeed Arduino rpcUnified
  * Seeed Arduino rpcWiFi
  * Seeed_Arduino_mbedtls
* GitLab
* Google Docs
* Miro
* TinkerCad

### Other Attributions

<a href="https://pixabay.com/illustrations/flasher-signal-police-alarm-5027727/
">Alarm icon</a> by <a href="https://pixabay.com/users/alexey_hulsov-388655/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5027727">Alexey Hulsov</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5027727">Pixabay</a>.


