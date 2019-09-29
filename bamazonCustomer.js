var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
require('dotenv').config();
var MYSQLPassword = process.env.MYSQL_PASSWORD;

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
    readProducts();
});

function readProducts() {
    console.log("Selecting all products.......\n");
    connection.query("SELECT * FROM products", function (err, res) {
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
        // connection.end();
        purchaseRequest();
    })
}


function purchaseRequest() {

    inquirer
        .prompt([{
                name: "ID",
                type: "input",
                message: "Which item would you like to purchase?",
                filter: Number
            },
            {
                name: "Quantity",
                type: "input",
                message: "How many items do you wish to purchase?",
                filter: Number
            },
        ]).then(function (answers) {
            let purchaseID = answers.ID;
            let quantityToBuy = answers.Quantity;
            purchaseOrder(purchaseID, quantityToBuy)
        });
};

function purchaseOrder(ID, amtNeeded) {

    connection.query("Select * FROM products WHERE item_id = " + ID, function (err, res) {
        // console.log(res);

        if (err) {
            console.log(err)
        };
        if (amtNeeded <= res[0].stock_quantity) {
            let totalCost = res[0].price * amtNeeded;
            console.log("You slected the following product:  " + res[0].product_name + "\n" + "We have your item in stock \n" + "your total cost for " + amtNeeded + " units is " + totalCost);
            let quantityBeforeSale = res[0].stock_quantity;
            console.log("Units available before sale: " + quantityBeforeSale);
            let quantityAfterSale = quantityBeforeSale - amtNeeded;
            console.log("Units available after sale: " + quantityAfterSale);
            let itemID = res[0].item_id;
            console.log("Item Sold: Item ID " + itemID);
            updateProduct();

            function updateProduct() {
                console.log("View product database for updated quantities following sale.....\n");

                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: quantityAfterSale
                        },
                        {
                            item_id: itemID
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        // console.log(res.affectedRows + " products updated!\n");

                    }
                );

            }

        } else {
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "s" + " to complete this order.");
        };

    })

}