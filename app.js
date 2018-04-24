const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// static / public dir
app.use(express.static(path.join(__dirname, '/public'))); 

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1',
    database: 'vmworksheet'
});
 
// connect to database
mc.connect();

const apiDefaultURL = '/api/vmw';

/* ============ ROUTES ============ */
 
app.get('/', function (req, res) { res.sendFile(path.join(__dirname, "/public/index.html")) });
app.get('/login', function (req, res) { res.sendFile(path.join(__dirname, "/public/partials/login.html")) });
app.get('/addworksheet', function(req,res){ res.sendFile(path.join(__dirname, "/public/partials/worksheet.html")) })

// login POST
app.post(apiDefaultURL+'/login', function (req, res) {

    let input_username = req.body.username;
    let input_password = req.body.password;
    let q_verifyDetails = 'select username,password from users where username = ? and password = ?';

    mc.query(q_verifyDetails, [input_username,input_password], function (error, results, fields) {
        if(results.length > 0){
            res.redirect("/");
        } else {
            res.redirect("/login?error=true");
        }
    });

    //res.send(id+" "+username+" "+password);
});

// add worksheet entry
app.post(apiDefaultURL+'/addworksheet', function (req, res) {

    //req.body.name
    let data = [[req.body.name]];

    let q_addworkSheet = "insert into test (name) values ?";

    mc.query(q_addworkSheet, [data], function(err, result){
        if(err) throw err;
        console.log("Number of rows affected "+result.affectedRows);
    })

    //res.send(JSON.stringify(data));
});

/* ======================= CITIES ===================== */

// routes
const cities = apiDefaultURL+'/cities';
const citiesByID = apiDefaultURL+'/cities/:id';
const citiesSearchKeyword = apiDefaultURL+'/cities/search/:keyword';

// queries
const q_getAllCities = 'SELECT * FROM city limit 40';
const q_getCityById = 'SELECT * FROM city where id = ?';
const q_searchCityKeyword = 'select * from city where name like ?'

// ALL
app.get(cities, function (req, res) {
    mc.query(q_getAllCities, function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Get all cities' });
    });
});

// by ID
app.get(citiesByID, function (req, res) {

    let taskId = req.params.id;

    if(!taskId){ return res.status(400).send({ error: true, message: "This task ID does not exist!!"}) }

    mc.query(q_getCityById, [taskId], function (error, results, fields) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Get City By Id' });
    });
});

// search by keyword
app.get(citiesSearchKeyword, function(req, res){

    let keyword = req.params.keyword;

    mc.query(q_searchCityKeyword, ['%'+keyword+'%'], function(error, results, fields){
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Get City By Id' });
    });
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});

// allows "grunt dev" to create a development server with livereload
module.exports = app;