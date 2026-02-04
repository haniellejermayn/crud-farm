SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `feeding_log`;
TRUNCATE TABLE `task`;
TRUNCATE TABLE `animal`;
TRUNCATE TABLE `farmer`;
TRUNCATE TABLE `feed_stock`;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Farmers
INSERT INTO `farmer` (`name`, `role`) VALUES
('Juan Dela Cruz', 'Head Shepherd'),
('Maria Santos', 'Veterinarian'),
('Ricardo Reyes', 'Farm Hand'),
('Ana Gonzales', 'Feeder');

-- 2. Animals
INSERT INTO `animal` (`name`, `type`, `age`, `gender`, `isHealthy`) VALUES
('Bessie', 'Cow', 5, 'Female', 1),
('Goldie', 'Chicken', 1, 'Female', 1),
('Snowball', 'Sheep', 3, 'Male', 1),
('Babe', 'Pig', 2, 'Female', 0),
('Daisy', 'Cow', 3, 'Female', 1),
('Rocky', 'Rooster', 2, 'Male', 1);

-- 3. Feed Stock
-- Note: Corn Mix is < 50 to trigger "Low Stock" alert
INSERT INTO `feed_stock` (`name`, `quantity`) VALUES
('Premium Hay', 850.50),
('Organic Grain', 420.00),
('Corn Mix', 35.00), 
('Vitamin Supplements', 100.00);

-- 4. Tasks
-- Note: 'Repair North Fence' is Overdue (Due 3 days ago)
INSERT INTO `task` (`title`, `status`, `dueDate`, `farmerId`, `animalId`) VALUES
('Morning Milking', 'COMPLETED', NOW(), 1, 1),
('Checkup for Babe', 'IN_PROGRESS', DATE_ADD(NOW(), INTERVAL 2 DAY), 2, 4),
('Shear Snowball', 'PENDING', DATE_ADD(NOW(), INTERVAL 5 DAY), 3, 3),
('Repair North Fence', 'PENDING', DATE_SUB(NOW(), INTERVAL 3 DAY), 3, NULL),
('Buy Corn Mix', 'PENDING', DATE_ADD(NOW(), INTERVAL 1 DAY), 1, NULL),
('Vaccinate Poultry', 'PENDING', DATE_ADD(NOW(), INTERVAL 7 DAY), 2, NULL);

-- 5. Feeding Logs (Distributed over last 7 days for Charts)
INSERT INTO `feeding_log` (`amount`, `fedAt`, `animalId`, `feedStockId`) VALUES
-- Today (Day 0)
(15.0, NOW(), 1, 1), -- Bessie ate Hay
(2.5, NOW(), 2, 3),  -- Goldie ate Corn
(5.0, NOW(), 3, 2),  -- Snowball ate Grain

-- Yesterday (Day -1)
(14.5, DATE_SUB(NOW(), INTERVAL 1 DAY), 1, 1),
(14.0, DATE_SUB(NOW(), INTERVAL 1 DAY), 5, 1), -- Daisy ate Hay
(4.0, DATE_SUB(NOW(), INTERVAL 1 DAY), 4, 2),  -- Babe ate Grain

-- Day -2
(16.0, DATE_SUB(NOW(), INTERVAL 2 DAY), 1, 1),
(6.0, DATE_SUB(NOW(), INTERVAL 2 DAY), 3, 1),
(1.5, DATE_SUB(NOW(), INTERVAL 2 DAY), 2, 3),
(1.5, DATE_SUB(NOW(), INTERVAL 2 DAY), 6, 3),

-- Day -3
(5.0, DATE_SUB(NOW(), INTERVAL 3 DAY), 4, 2),
(15.0, DATE_SUB(NOW(), INTERVAL 3 DAY), 5, 1),
(0.5, DATE_SUB(NOW(), INTERVAL 3 DAY), 2, 4), 

-- Day -4
(5.0, DATE_SUB(NOW(), INTERVAL 4 DAY), 3, 1),
(2.5, DATE_SUB(NOW(), INTERVAL 4 DAY), 2, 3),
(12.0, DATE_SUB(NOW(), INTERVAL 4 DAY), 1, 1),

-- Day -5
(12.0, DATE_SUB(NOW(), INTERVAL 5 DAY), 1, 1),
(4.5, DATE_SUB(NOW(), INTERVAL 5 DAY), 4, 2),
(13.0, DATE_SUB(NOW(), INTERVAL 5 DAY), 5, 1),

-- Day -6
(3.0, DATE_SUB(NOW(), INTERVAL 6 DAY), 3, 2),
(18.0, DATE_SUB(NOW(), INTERVAL 6 DAY), 1, 1),
(2.0, DATE_SUB(NOW(), INTERVAL 6 DAY), 6, 3);