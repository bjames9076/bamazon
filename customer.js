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

//function to run store operations
function storeOperation() {
	connection.query('SELECT * FROM products', function(err, res) {
	    if (err) throw err;
        //styling of the table
		var table = new Table({
			head: ["Product ID".blue, "Product Name".blue, "Department Name".blue, "Price".blue, "Quantity".blue],
			colWidths: [13, 20, 20, 13, 13],
		});
		//pulls out table data
		for(var i = 0; i < res.length; i++) {
			table.push(
			    [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
			);
		}
		//displays table
		console.log(table.toString());


    });

    inquirer.prompt([
        {
            type: "number",
            message: "Which item would you like to purchase? (enter the Product ID)",
            name: "itemNumber"
        },
        {
            type: "number",
            message: "How many would you like?",
            name: "quantity"
        },
    ])
    exit();
}




//exits the store/server
function exit() {
	connection.end();
	console.log("Thank you, please come again!");
}

storeOperation();