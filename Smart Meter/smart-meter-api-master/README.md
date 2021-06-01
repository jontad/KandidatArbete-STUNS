## How to run the program
The following section will introduce how to start the program:

1. Configure the connection to your mongoDB database:
- Create a database called "RoligEffekt".
- Create two collections in the RoligEffekt database. "RealTime" and "kwH".
- Change the username and password entries in the following line in server.js to connect to your database:
```
const uri = "mongodb+srv://<username>:<password>@cluster0.ab29i.mongodb.net/RoligEffekt?retryWrites=true&w=majority";
```

2. Start the server:  
Initialise a terminal, navigate to the src folder and start it using NodeJs-command

```
$ cd  \...\Smart Meter\smart-meter-api-master\src
$ nodejs server.js
```
   - if it is the first time you run this program, you might need to install the configurations, use npm install: 

                  ```
                  $ cd  \...\Smart Meter\smart-meter-api-master\src
                  $ npm install
                             {Wait for install to finish}
                  $ nodejs server.js
                  ```
