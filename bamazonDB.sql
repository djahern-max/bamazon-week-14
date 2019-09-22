DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Skill Saw", 184.99, 222);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Angle Grinder", 29.99, 102);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Palm Sander", 55.15, 287);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Router Lift", 299.00, 17);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Circular Saw", 75.99, 178);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Compound Miter Saw", 179.00, 68);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Bandsaw", 1160.00, 12);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Orbital Jig Saw", 69.99, 114);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Drum Sander", 2060.00, 29);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Reversible Air Drill", 43.95, 48);