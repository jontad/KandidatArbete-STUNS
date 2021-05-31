#!/usr/bin/env node
require('dotenv').config();
//SERVER INIT
const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const url = require('url');
const cors = require('cors');
const fetch = require("node-fetch");
var http = require('http');
const axios = require('axios');

const app = express();
const port = process.env.APP_PORT || 3000;
const hostname = require('ip').address();
const app_ver = process.env.APP_VERSION;


require('./db/mongoose');
//const userRouter = require('./routers/user');
//const smartMeterRouter = require('./routers/smartMeter');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(smartMeterRouter);
//app.use(userRouter);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(port, () => console.log("Listening on port 3000"));
//MONGODB INIT

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Vlad-Ber:arneiskogen1@cluster0.ab29i.mongodb.net/RoligEffekt?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//Vanliga FUNKTIONER
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}



//MONGODB FUNKTIONER
client.connect(err => {
    const db = client.db("RoligEffekt");
    const userReadings = db.collection("UserReadings");
    const realTimeData = db.collection("RealTime");
    const kwH = db.collection("kwH");
    
    //Databas FUNKTIONER-----------------------------------------------------
    async function insertDataCont(jsonData){
	let data = await userReadings.insertOne(jsonData).catch((error) => console.error(error));
    };

    async function realTime(jsonData){
	let currentData = await realTimeData.findOne({MeterID: jsonData.MeterID});
	//console.log(currentData);
	if(currentData == undefined){
	    let insertData = await realTimeData.insertOne(jsonData).catch((error) => console.error(error));
	}
	else{
	    let replacedData = await realTimeData.replaceOne({MeterID: jsonData.MeterID}, jsonData);
	};
    }

    
    async function getRealTime(meterID){
	var realTimeDataa = await realTimeData.findOne({MeterID: meterID})
	    .catch((err) => {
		console.error(err);
	    });
	return realTimeDataa;
    }

    async function dbKWH(jsonData){
	var watt = jsonData.ActivePowerPlus;
	var kiloWattH = (watt/360)/1000;
	var meterID = jsonData.MeterID;

	var week = getWeekNumber(new Date());
	//Date LOGIC
	var d = new Date();
	var day = d.getDate().toString();
	var month = (d.getMonth()+1).toString();
	var year = d.getFullYear().toString();
	var date = year+month+day;
	var dayNo = d.getUTCDay();
	

	//Insert dataentry or replace current
	let currentData = await kwH.findOne({MeterID: jsonData.MeterID,Timestamp: date})
	    .catch((err) => {
		console.error(err)
		console.log("Errorrrr");
	    });

	if(currentData == undefined){
	    let insertData = await kwH.insertOne({dayNo: dayNo, MeterID: meterID, Timestamp: date, kwH: kiloWattH, weekNO: week}).catch((error) => console.error(error));
	}
	else{
	    let currentKwh = currentData.kwH;
	    let accumelatedKwh = currentKwh+kiloWattH;
	    let replacedData = await kwH.replaceOne({dayNo: dayNo, MeterID: jsonData.MeterID, Timestamp: date, weekNO: week}, {dayNo: dayNo, MeterID: meterID, weekNO:week, Timestamp: date, kwH: accumelatedKwh});
	};
    }
    
    async function getkWhToday(data){
	var d = new Date();
	var day = d.getDate().toString();
	var month = (d.getMonth()+1).toString();
	var year = d.getFullYear().toString();
	var date = year+month+day;
	
	let currentData = await kwH.findOne({MeterID: data.MeterID, Timestamp:date})
	    .catch((err) => {
		console.error(err)
		console.log("Errorrrr");
	    });
	return currentData.kwH;
    }
    async function getkWhWeek(data){
	var week = getWeekNumber(new Date());
	let currentData = await kwH.find({MeterID: data.MeterID, weekNO:week}).toArray();
	return currentData;
    }


    //REQUESTS--------------------------------------------------------------------------

    //Gets realtime data from DB with ID = MeterID
    app.post("/getRealTimeData",async(req, res) => {
	var data1 = await getRealTime(req.body.MeterID);
	var data2 = await getkWhToday(req.body);
	var data3 = await getkWhWeek(req.body);
	res.send({data: data1, kwH: data2, kwHWeek: data3});
    });

    app.post("/liveInFetch", async(req,res) => {

	const options = {
	    headers: {"Authorization":"Bearer 6AmbXTanCHNYMUJEWeGfTpBVDoHiL7UA"}
	};
	var resp = await axios.post("https://my.live-in.se/api/powerstatus",{
	}, options).then((response =>{
	    var jData = response.data;
	    res.send(jData);
	}));
    });
    
    //DATA READING FROM HAN_MODULE EVERY 10 SECONDS
    app.use(bodyParser.raw({type: 'application/json'}))
	.post('/', async (req, res) => {
	    //Stoppa in data
	    //----------await insertDataCont(req.body);
	    //Stoppa in RealTime data (Byt ut varje json object i databasen med ny json baserat på ID)
	    await realTime(req.body);
	    await dbKWH(req.body);
            res.send("ok")
	});

});
client.close();
