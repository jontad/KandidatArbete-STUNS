# Installation

1. Install [node.js](https://nodejs.org/en/) if you haven't already
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
    
   Then open the Expo go (or Expo) application to start the frontend.
   How this is accomplished differs depending on the mobile OS.

   Android: Open the expo go app and scan the QR-code that appears after step 4  
   iOS: Follow [this](https://stackoverflow.com/questions/43730608/how-do-i-run-an-app-on-a-real-ios-device-using-expo) guide on stackoverflow


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
