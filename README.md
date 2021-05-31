# Kandidatarbete-RoligEffekt

In this repository you will find files pertaining the program that are used by the smart metre 
This is an application for our envisioned product in which the user may see their current energy usage.  
This is a prototype in which basic functionality has been implemented for our envisioned product,

För att starta server :
1.Smart meter mapp 
2. Server filen
3.  Nodejs server.js
4.  
```
$ git glone https://github.com/uu-dsp-os-ospp-2020/dsp-fess.git
$ cd dsp-fess
```
Sign up now!  
https://localhero.ew.r.appspot.com/

Project for Computer Systems with Project Work (1DT003),
Spring 2020, Uppsala University.

## Setup & Development

1. In Terminal

```
$ git glone https://github.com/uu-dsp-os-ospp-2020/dsp-fess.git
$ cd dsp-fess
```

2. Install [Node JS](https://nodejs.org)

3. Run in terminal

```
// Terminal #1
$ cd client
$ npm install
$ npm start
// Terminal #2
$ cd backend
$ npm install
$ node server.js
```

Then access client via `http://localhost:3000/` in browser of choice

## Deployment

LocalHeroes is running on two services deployed att Google Cloud Platform. Note that you need Google Cloud SDK installed in your environment in order to be able to deploy with the following instructions. If you do, deploy like so: 

```
// Deploy client 
$ cd client 
$ npm run build 
$ gcloud app deploy

// Deploy backend 
$ cd backend 
$ gcloud app deploy

```

App URL: https://localhero.ew.r.appspot.com/  
You can perform backend health check at: https://api-dot-localhero.ew.r.appspot.com/health

## Katalogstruktur
<pre>

 ├── client
    ├── build
        └── build files, updated on "npm run build"
    ├── node_modules
    ├── Makefile 
    ├── package.json
        └── client dependencies
    ├── public
        └── index.html - entry HTML file, renders root element rendered by index.js
        └── manifest.json 
        └── robots.txt
    └── src
      ├── components
      |    └── react components used in client
      ├── data
      |    └── data for development
      └── views
          └── different views for website
      ├── App.js - root component in app
      ├── index.js - renders root component App among other setup things
      ├── config.js - sets environemnt variable to "local" or "production"
      ├── _config.yml
      ├── app.yaml
          └── deployment config for client service
 ├── backend
    ├── server.js
        └── backend logic
    ├── package.json
        └── backend dependencies
    └── app.yaml
        └── deployment config for backend service
 ├── meta
 |   ├── gruppkontrakt.md
 │   ├── medlemmar.md
 |   └── images
 |       └── images of FESS group members
 ├── README.md
</pre>

## Members: 
- Alfred Barwe-Paul
- Benny Lam
- Jonathan Tadese
- Vladislav Bertilsson
