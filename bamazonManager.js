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

    // connection.query("UPDATE products SET ? WHERE ?" + ID, function(err, res) {

    inquirer
        .prompt([{
            name: "ID",
            type: "input",
            message: "Enter the Item ID to update inventory quantity?",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many units do you want to add?",
            filter: Number
        },
        ]).then(function (answers) {
            let updateInventoryID = answers.ID;
            let quantityToUpdate = answers.Quantity;
            inventoryAdjustment(updateInventoryID, quantityToUpdate);
            inventoryAdjustment();
        });
    // });

    function inventoryAdjustment(ID, QTY) {

        connection.query("Select * FROM products WHERE item_id = " + ID, function (err, res) {

            if (err) {
                console.log(err)
            };
            if (stock_quantity >= 0) {
                let inventoryBeforeUpdate = res[0].stock_quantity;
                console.log("Units available before Inventory Update: " + inventoryBeforeUpdate);
                let quantityAfterUpdate = inventoryBeforeUpdate + QTY
                console.log("Units available after Inventory Update: " + quantityAfterUpdate)
                let productID = res[0].item_id;
                console.log("Updating Item..... " + productID);
                console.log("The new quantity of " + productID + "is " + QTY)



                updateProduct();

                function updateProduct() {
                    console.log("View product database for updated quantities following inventory adjustment.....\n");

                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: quantityAfterUpdate
                        },
                        {
                            item_id: productID
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


















            console.log(res[0].product_name);
        })

    }
}





// if (amtNeeded <= res[0].stock_quantity) {
//     let totalCost = res[0].price * amtNeeded;
//     console.log("You slected the following product:  " + res[0].product_name + "\n" + "We have your item in stock \n" + "your total cost for " + amtNeeded + " units is " + totalCost);
//     let quantityBeforeSale = res[0].stock_quantity;
//     console.log("Units available before sale: " + quantityBeforeSale);
//     let quantityAfterSale = quantityBeforeSale - amtNeeded;
//     console.log("Units available after sale: " + quantityAfterSale);
//     let itemID = res[0].item_id;
//     console.log("Item Sold: Item ID " + itemID);
//     updateProduct();

//     function updateProduct() {
//         console.log("View product database for updated quantities following sale.....\n");

//         var query = connection.query(
//             "UPDATE products SET ? WHERE ?", [{
//                     stock_quantity: quantityAfterSale
//                 },
//                 {
//                     item_id: itemID
//                 }
//             ],
//             function(err, res) {
//                 if (err) throw err;
//                 // console.log(res.affectedRows + " products updated!\n");

//             }
//         );

//     }

// } else {
//     console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "s" + " to complete this order.");
// };



choices();
updateInventory();