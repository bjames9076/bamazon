CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(100) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES
	(1, 'IPOD', 'Electronics', 599.99, 10),
	(2, 'Keyboard', 'Electronics', 39.99, 15),
	(3, 'Eggs', 'Food', 2.99, 50),
	(4, 'Ear Buds', 'Electronics', 49.99, 12),
	(5, 'TV', 'Electronics', 299.99, 6),
	(6, 'Tennis Rackets', 'Sports', 17.99, 20),
	(7, 'T-shirt', 'Clothes', 15.99, 25),
	(8, 'Milk', 'Food', 2.49, 200),
	(9, 'Dresser', 'Home', 199.99, 3),
	(10, 'Basketball', 'Sports', 19.99, 10),
	(11, 'Desk', 'Home', 99.99, 5),
	
