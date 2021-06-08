# Kandidatarbete-RoligEffekt

Welcome,

In this repository you will find files pertaining to the program that are used by the smart meter. 
This is an application for our envisioned product in which the user may see their current energy usage.  
Important to note is that this is a prototype and therefore only basic functionality has been implemented.

NOTE: To use this program and its components you will need the following:

Hardware:
* Smart electricity meter with HAN-input
* A smart adapter (USB-adapter)

Software:
* NodeJS
* Expo GO (mobile application)

The program itself currently consists of three entities:
* Adapter code
* Backend 
* Frontend 

## Setup

1. Install [Node JS](https://nodejs.org/en/download/)

2. Install [EXPO GO](https://expo.io/) application to your phone

3. In a terminal

```
$ git glone https://github.com/jontad/KandidatArbete-STUNS.git
$ cd \...\KandidatArbete-STUNS
```


## How to run the program
The following section will introduce how to start the program:

1. Start the server:  
Initialise a terminal, navigate to the src folder and start it using NodeJs-command

```
$ cd  \...\Smart Meter\smart-meter-api-master\src
$ nodejs server.js
```
   - if it is the first time you run this program, you might need to install the configurations, use npm install: 

                  ```
                  $ cd  \...\Smart Meter\smart-meter-api-master\src
                  $ npm install
                             {Wait for install to finish}
                  $ nodejs server.js
                  ```

2. Start the HAN-meter logger:

 ***NOTE: In order to use the HAN-meter logger you will need to know which USB-port it is connected to, In this case it was /dev/USB0***  
 
Start a new terminal, navigate to the han-meter-logger-master folder and start the hanclient (C-file):


```
$ cd  \...\Smart Meter\han-meter-logger-master
$ ./hanclient/dev/USB0/
```

3. Start the application 

Open a third terminal, navigate to the RoligEffekt-folder and start the application using the Expo-command:

```
$ cd  \...\RoligEffekt
$ expo start
```
   - if it is the first time you run this program:
       - 3.1 Navigate to the RoligEffekt, src folder and open the config.js file with editor of choice:
       ```
       $ cd  \...\KandidatArbete-STUNS\RoligEffekt\src
       $ emacs config.js
       ```
       - 3.2 Input Electricity meter ID.
       - 3.3 Input your local IP-address.
       - 3.4 When done, close and save the file.
       - 3.5 In the same terminal, install Expo using:
       ```
       npm install --global expo-cli
              {Wait for install to finish}
       ```
       - 3.6 After Expo, install the new configurations with npm install and start expo:

       ```
       $ npm install
       {Wait for install to finish}
       $ expo start
       ```

This will prompt an QR-code to be generated, scan this with your mobile device.
You are now inside the application!


Independent Project in Information Engineering (1DT350),
Spring 2021, Uppsala University.

## Members: 
- Alfred Barwe-Paul
- Benny Lam
- Jonathan Tadese
- Vladislav Bertilsson
