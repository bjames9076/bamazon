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


      inquirer.prompt([
        {
            type: "number",
            message: "Which item would you like to purchase? (the Product ID)",
            name: "itemNum"
        },
        {
            type: "number",
            message: "How many would you like to buy?",
            name: "amount"
        },
    ]).then(function (user) {

        connection.query('SELECT * FROM products JOIN departments ON products.department_name = departments.department_name', function(err, res) {
            if (err) throw err;

            if(res[user.itemNum - 1].stock_quantity > user.amount) {
                var newQuantity = parseInt(res[user.itemNum - 1].stock_quantity) - parseInt(user.amount);
                var total = parseFloat(user.amount) * parseFloat(res[user.itemNum - 1].price);
                total = total.toFixed(2);

                var departmentTotal = parseFloat(total) + parseFloat(res[user.itemNum - 1].TotalSales);
                departmentTotal = departmentTotal.toFixed(2);

                connection.query("UPDATE departments SET ? WHERE ?", [{
                    TotalSales: departmentTotal
                }, {
                    department_name: res[user.itemNum - 1].department_name
                }], function(error, results) {});

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    item_id: user.itemNum
                }], function(error, results) {
                    if(error) throw error;

                    console.log("Your order for " + user.amount + " " + res[user.itemNum - 1].product_name +
                        "(s) has been placed.");
                    console.log("Your total is $" + total);
                    reOrder()
                });
                

            } else {
                console.log("We're sorry, we only have " + res[user.itemNum - 1].stock_quantity + " of that product.");
                reOrder()
            }	    
        });
    });	
});


}
function reOrder() {
    inquirer.prompt([
		{
			type: "confirm",
			message: "Would you like to order anything else?",
			name: "again"
		},
	]).then(function (user) {
		if(user.again) {
			storeOperation();
		} else {
			exit();
		}
	});
}



//exits the store/server
function exit() {
	connection.end();
	console.log("Thank you, please come again!");
}

storeOperation();