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


function storeOperation() {
	connection.query('SELECT * FROM products', function(err, res) {
	    if (err) throw err;

		var table = new Table({
			head: ["Product ID".blue, "Product Name".blue, "Department Name".blue, "Price".blue, "Quantity".blue],
			colWidths: [13, 20, 20, 13, 13],
		});
		
		for(var i = 0; i < res.length; i++) {
			table.push(
			    [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
			);
		}
		
		console.log(table.toString());


    });
    exit();
}




//exits the store/server
function exit() {
	connection.end();
	console.log("Thank you, please come again!");
}

storeOperation();