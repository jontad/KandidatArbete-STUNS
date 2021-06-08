This folder contains the client RoligEffekt that recieves the data from the smart meter. 
The application is run using the mobile application Expo go.

# Installation

1. Install [node.js](https://nodejs.org/en/) if you haven't already. Node Package Manager (npm) is downloaded with node.js
2. Install Expo

   ```jsx
   npm install --global expo-cli
   ```

3. Install deps

   ```jsx
   npm install
   ```

4. Start the environtment

   ```jsx
   expo start
   ```

5. 
    
   Then download the Expo go (or Expo) application from either Google Play or the App Store to start the frontend.
   How to start the application differs depending on the mobile OS.

   * Android: Open the expo go app and scan the QR-code that appears after step 4  
   * iOS: Follow [this](https://stackoverflow.com/questions/43730608/how-do-i-run-an-app-on-a-real-ios-device-using-expo) guide on stackoverflow


If you recieve error messages that you are missing modules,
install these by:

```jsx
expo install module-name
```

where module-name is the name of the missing module.

# File Managements

These are the folders and the functionality

```jsx
/src/assets -> for media such as images, etc
/src/components -> for components
/src/navigation -> for React Navigation
/src/screens -> for Screens
```

# Config

To connect with server, the values of the meter ID and IP has to be changed in 
```jsx
/src/config.js
```

* IP can be determined by running the following command in terminal: 
```jsx
hostname -I
```

* If a parser for the model is has been implemented, meterID can be determined by checking the output from han-meter-logger-master. Else follow the instructions in han-meter-logger-master\README.md for adding a new meter.  



