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

1. In Terminal

```
$ git glone https://github.com/jontad/KandidatArbete-STUNS.git
$ cd \...\KandidatArbete-STUNS
```

2. Install [Node JS](https://nodejs.org)

3. Install [EXPO GO](https://expo.io/)


## How to run the program
The following section will introduce how to start the program:

1. Start the server:
Initialise a terminal, navigate to the src folder and start it using NodeJs-command

```
$ cd  \...\Smart Meter\smart-meter-api-master\src
$ nodejs server.js
```
*NOTE: if it is the first time you run this program, you might need to install the configurations, use npm install:*

```
$ cd  \...\Smart Meter\smart-meter-api-master\src
$ npm install
       {Wait for install to finish}
$ nodejs server.js
```

2. Start the HAN-meter logger:

*NOTE: In order to use the HAN-meter logger you will need to know which USB-port it is connected to! In this case it was /dev/USB0*

Open a new terminal (or new terminal tab) and navigate to the han-meter-logger-master folder and start the hanclient (C-file).


```
$ cd  \...\Smart Meter\han-meter-logger-master
$ ./hanclient/dev/USB2/
```

3. Start the application 

Start a third terminal and navigate to the RoligEffekt-folder. Start the application using the Expo-command:

```
$ cd  \...\RoligEffekt
$ expo start
```

*NOTE: if it is the first time you run this program, you will need to install the configurations, input your local IP-address and Electrictiy meter - ID :*

3.1 Navigate to the RoligEffekt\src folder and open the config.js file with editor of choice:
```
$ cd  \...\KandidatArbete-STUNS\RoligEffekt\src
$ emacs config.js
```
3.2 Find your Electricity meter ID and input it.
3.3 Find your local IP-address and input it 

3.4 Install the new configurations with NPM install and start with expo
```
$
 npm install
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
