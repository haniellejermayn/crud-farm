SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `feeding_log`;
TRUNCATE TABLE `task`;
TRUNCATE TABLE `animal`;
TRUNCATE TABLE `farmer`;
TRUNCATE TABLE `feed_stock`;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO `farmer` (`name`, `role`) VALUES
('Juan Dela Cruz', 'Head Shepherd'),
('Maria Santos', 'Veterinarian'),
('Ricardo Reyes', 'Farm Hand');

INSERT INTO `animal` (`name`, `type`, `age`, `gender`, `isHealthy`) VALUES
('Bessie', 'Cow', 5, 'Female', 1),
('Goldie', 'Chicken', 1, 'Female', 1),
('Snowball', 'Sheep', 3, 'Male', 1),
('Babe', 'Pig', 2, 'Female', 0);

INSERT INTO `feed_stock` (`name`, `quantity`) VALUES
('Premium Hay', 500.50),
('Organic Grain', 250.00),
('Corn Mix', 100.25);

INSERT INTO `feeding_log` (`amount`, `fedAt`, `animalId`, `feedStockId`) VALUES
(15.5, NOW(), 1, 1),
(2.0, NOW(), 2, 2),  
(10.0, NOW(), 3, 1), 
(5.5, NOW(), 4, 3); 

INSERT INTO `task` (`title`, `status`, `dueDate`, `farmerId`, `animalId`) VALUES
('Morning Milking', 'COMPLETED', DATE_ADD(NOW(), INTERVAL 1 DAY), 1, 1),
('Checkup for Babe', 'IN_PROGRESS', DATE_ADD(NOW(), INTERVAL 2 DAY), 2, 4),
('Shear Snowball', 'PENDING', DATE_ADD(NOW(), INTERVAL 5 DAY), 3, 3),
('Repair Chicken Coop', 'PENDING', DATE_ADD(NOW(), INTERVAL 3 DAY), 3, NULL);