var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');
var Table = require('cli-table');


//Contains the host, port, user, password, and database to be used for in the mySQL database
var keys = require('./keys.js')

var connection = mysql.createConnection(keys.connection);

connection.connect(function(err) {
    if (err) throw err;
});