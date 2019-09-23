# bamazon-week-14

BAMAZON CUSTOMER VIEW:

Code to create table in MySQL Workbench

![](Images/pic1.JPG)

Running this application will first display all of the items available for sale. Used dependency "cli-table" to display data in table form in the CLI.

![](Images/pic2.JPG)

The first message asks for the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.

![](Images/pic3.JPG)

If there is enough quantity on hand, a function is run to update the product quantity.

![](Images/pic4.JPG)

If there is insufficient quantity, then the following message is displayed.

![](Images/pic5.JPG)

When the customer purchases an item that is in stock, the following messages are displayed.  In this instance, the customer purchased 2 drum sanders @ $2,060.00 each for a total purchase price of $4,120.00.

![](Images/pic6.JPG)

Following the purchase, the quantity on hand is updated in both MySQL Workbench and in the CLI.

BEFORE:

![](Images/pic7.JPG)

AFTER:

![](Images/pic8.JPG)

You can also see the updated quantity here:

![](Images/pic9.JPG)

BAMAZON MANAGER VIEW:

Lists menu options:

![](Images/pic10.JPG)

View products for sale:

![](Images/pic11.JPG)

View low inventory items (less than 5 qty):

![](Images/pic12.JPG)






