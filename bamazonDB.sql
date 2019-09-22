DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT(4) NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(20) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES 
(101,"Skill Saw", "Woodworking", 184.99, 222),
(265,"Angle Grinder", "Woodworking", 29.99, 102),
(397,"Palm Sander", "Woodworking", 55.15, 287),
(222,"Router Lift", "Woodworking", 299.00, 17),
(897,"Circular Saw", "Woodworking", 75.99, 178),
(542,"Compound Miter Saw", "Woodworking", 179.00, 68),
(289,"Bandsaw", "Woodworking", 1160.00, 12),
(564,"Orbital Jig Saw", "Woodworking", 69.99, 114),
(558,"Drum Sander", "Woodworking", 2060.00, 29),
(227,"Reversible Air Drill", "Woodworking", 43.95, 48)