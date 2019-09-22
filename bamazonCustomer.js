var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "CWkeller1234!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});

function readProducts() {
    console.log("Selecting all products.......\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        let displayTable = new Table({
            head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (let i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            )

        }

        console.log(displayTable.toString());
        connection.end();
    })
}
readProducts();