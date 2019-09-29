var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
require('dotenv').config();
var MYSQLPassword = process.env.MYSQL_PASSWORD;


console.log(MYSQLPassword);

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: MYSQLPassword,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

function displayInventory() {
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) {
            console.log(err)
        };
        var theDisplayTable = new Table({
            head: ['Item ID', 'Product Name', 'Category', 'Price', 'Quantity'],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (i = 0; i < res.length; i++) {
            theDisplayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(theDisplayTable.toString());
        choices();

    });
};

function lessThanFive() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            // console.log(res[i].stock_quantity);
            if (res[i].stock_quantity <= 5) {
                console.log("The following products have low inventory: " + res[i].product_name + "\n" + "Product # = " + res[i].item_id + "\n" + "Units in Inventory: " + res[i].stock_quantity);

            }
        }
    })
}

function updateInventory() {

}

function choices() {

    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Please select from the following list",
        choices: ["View Products", "View Low Inventory", "Add to Low Inventory", "Add a New Product"]
    }]).then(function (answers) {
        switch (answers.action) {
            case "View Products":
                displayInventory();
                break;
            case "View Low Inventory":
                lessThanFive();
                break;
            case "Add to Low Inventory":
                // inventoryAdjustment();
                break;
            case "Add a New Product":
                //Function
                break;

        }
    })
}

choices();