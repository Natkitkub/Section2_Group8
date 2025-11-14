SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS coffee;
CREATE DATABASE IF NOT EXISTS coffee;
USE coffee;

-- --------------------
-- ตาราง: User_Account
-- --------------------
CREATE TABLE User_Account (
    User_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,
    Username VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    Password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Create_Date DATE NOT NULL,
    Date_of_Birth DATE NOT NULL,
    First_Name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Last_Name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Address VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Phone_Number CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Role ENUM('CUSTOMER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CUSTOMER',
    Is_Active TINYINT(1) NOT NULL DEFAULT 1,
    Last_Login DATETIME NULL
);

INSERT INTO User_Account (User_ID, Username, Password, Create_Date, Date_of_Birth, First_Name, Last_Name, Address, Phone_Number, Role) VALUES
('U001','Nattakit','6787023','2025-10-29','2000-01-01','Nattakit','Kiewchaum','Bangkok','0123456789','CUSTOMER'),
('U002','Naruepon','6787045','2025-10-29','1995-01-01','Naruepon','Santipapchai','Bangkok','0987654321','CUSTOMER'),
('U003','Thanamet','6787040','2025-10-29','1995-01-01','Thanamet','Datharach','Bangkok','0987654321','ADMIN'),
('U004','Babu','6787068','2025-10-29','1995-01-01','Phumet','Babu','Bangkok','0987654321','CUSTOMER'),
('U005','admin','admin','2025-11-06','1990-01-01','System','Administrator','Head Office','0000000000','ADMIN');

-- --------------
-- ตาราง: Login
-- --------------
CREATE TABLE Login (
    Login_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,
    User_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Login_Time DATETIME NOT NULL,
    Logout_Time DATETIME NULL,
    Login_Status VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Login_Ip VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES User_Account(User_ID)
);

INSERT INTO Login (Login_ID, User_ID, Login_Time, Logout_Time, Login_Status, Login_Ip) VALUES
('L001','U001','2025-11-05 08:00:00','2025-11-05 09:00:00','Success','192.168.1.10'),
('L002','U002','2025-11-05 09:30:00','2025-11-05 10:15:00','Success','192.168.1.11'),
('L003','U003','2025-11-05 11:00:00','2025-11-05 11:45:00','Failed','192.168.1.12'),
('L004','U004','2025-11-05 13:00:00','2025-11-05 14:00:00','Success','192.168.1.13');

-- ---------------
-- ตาราง: Product
-- ---------------
CREATE TABLE Product (
    Product_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,
    Product_Name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Product_Source VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Roast_Level ENUM('L', 'M', 'D') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Size VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Taste_Note VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Price_per_kg DECIMAL(8,2) NOT NULL,
    Image_URL VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

INSERT INTO Product (Product_ID, Product_Name, Product_Source, Roast_Level, Size, Taste_Note, Price_per_kg, Image_URL) VALUES
<<<<<<< HEAD
('1','Tum Ja Ja Blend','Brazil','Dark','1 kg','Bold and rich with notes of dark chocolate and roasted nuts. Full-bodied with a smoky finish — perfect for espresso lovers.',850.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EaxtynVvlfVFsIl4MJdaXPMBm8L7vGkZoRsyTfxkwKzWWQ?e=lqFZwI'),
('2','Andes Blend','Columbia','M','1 kg','A smooth balance of bright acidity and caramel sweetness, featuring the classic richness of Colombian coffee.',950.00,'https://i.pinimg.com/1200x/81/7a/38/817a3844ae548bfa6f51670c68bfffd4.jpg'),
('3','Doichang Blend','Thai','M','500 g','Warm and comforting with soft milk chocolate and caramel tones. A true classic from the highlands of Thailand.',800.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EZtiHU7uld5AvghYmxtwIKwBhqWQnEWw-kq7-meiOFT6SA?e=xW8C5l'),
('4','Lalibela Blend','Ethiopia','L','1 kg','Floral and fruity with jasmine and citrus notes. Clean, tea-like body inspired by Ethiopian elegance.',1350.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EUbiA-V6UwhHgi_XB-Kyj9oBy3hD4CgDGvOWOwnMRwxjLA?e=VpVuh7'),
('5','Goji Blend','Geisha','L','250 g','Elegant and aromatic, offering a blend of dried berries and floral tea with a gentle honeyed finish. A true Geisha experience.',2000.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EeQ9NYAwQzZNv4804lA6jh8BaDeEQo5dixlf10yM2HCJQg?e=hDd2VV'),
('6','Holidays Blend','Brazil, Columbia','D','1 kg','Cozy and festive, combining chocolate, caramel, and ripe fruit notes — smooth and sweet for joyful moments.',1000.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EX5ZHnlo-g9AoarUhqLbuHkBumBx2ZVj7xPORCohYGUiTg?e=a4leVJ'),
('7','Hondurus Blend','Japan','L','500 g','Sweet and mellow with honey-like smoothness, balanced by soft fruity and almond tones. Easy to enjoy any time.',1050.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EeZSe6itKqxDhfnS4tBlaKwBTtVd12D5t2BlQlWQx2LrFQ?e=Q1FfKN'),
('8','House Blend','Japan','D','1 kg','A classic dark roast with nutty and caramelized aromas. Full and rich, perfect for milk-based drinks or daily brews.',850.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/ERGxzdC5n_1FqsTj8YdHs_0B74sJ_vesUX_NSge35paCWw?e=lPh388'),
('9','Maejuntai Blend','Thai','L','500 g','Bright and floral with fruit-forward acidity. Clean, sweet, and lively — the taste of northern Thai highlands.',950.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EdBIhTqSgldHprs4UUwbIVQBX8yUYnILZrcXBV9pD6fIRA?e=fni9nQ'),
('10','Moonstones Blend','Ethiopia, Geisha','L','250 g','Fragrant and refined with jasmine and bergamot aromas. Silky and layered, offering a premium specialty experience.',1800.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/Efl0fjp8rdZLouzA9hr3_hgBp7jPjBU2Vtyr2julCdmmZQ?e=2Njbc2'),
('11','Pangkhon Blend','Thai','M','500 g','Fresh and vibrant with hints of orange and red apple. Clean and balanced from Chiang Rai’s mountain farms.',1000.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EYr34Sd5EzBEnVv8r9Wh-QYByyLkqDck8KsZ11XZBp_ufQ?e=yuIOHH'),
('12','Rebirth Blend','Thai, Japan','L','250 g','Refreshing fusion of watermelons and gentle yellow flowers tones. Smooth, light, and delicately floral.',1100.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EU_7uWgwW2dOkUHsmV856TcBzhmX020taKLc_MX3EiD72Q?e=qUF6Pz'),
('13','Restinpeach Blend','Japan, Ethiopia','L','250 g','Juicy and sweet with notes of peach and summer flowers. Soft, refreshing, and relaxing on the palate.',1400.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EefzgRRa6idClBvNVJfYPgIBVf6RqhCYbWmy8Yqb7358Yw?e=U8dShH'),
('14','Rumbarel Blend','Europe','D','250 g','Deep and mature with rum-barrel warmth, chocolate, and nutty undertones. A sophisticated, smooth finish.',1520.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EfR59nyvrK9GiKiJFLCxu34BaWSs2y8N0XWLxVVGevmREA?e=TUpxLw'),
('15','Sateeberral Blend','Europe, Columbia','L','500 g','Fruity and bright with wild berry and floral notes. Sweet-tart and winey, perfect for cold brew or pour-over.',1100.00,'https://skdw-my.sharepoint.com/:i:/g/personal/thanamet_dath_sukhon_ac_th/EXd-NYv9U9ZHt1fgzJE6t1YBho5YKB9ej1L_tVrCSdkunA?e=L3wtm2');
=======
('1','Tum Ja Ja Blend','Brazil','D','1 kg','Bold and rich with notes of dark chocolate and roasted nuts. Full-bodied with a smoky finish — perfect for espresso lovers.',850.00,'https://i.pinimg.com/736x/76/cb/0a/76cb0a8eebf20c401fece9fdd452ba1e.jpg'),
('2','Andes Blend','Columbia','M','1 kg','A smooth balance of bright acidity and caramel sweetness, featuring the classic richness of Colombian coffee.',950.00,'https://i.pinimg.com/736x/81/7a/38/817a3844ae548bfa6f51670c68bfffd4.jpg'),
('3','Doichang Blend','Thai','M','500 g','Warm and comforting with soft milk chocolate and caramel tones. A true classic from the highlands of Thailand.',800.00,'https://i.pinimg.com/736x/73/9d/68/739d68379323c7413fd77be75963ad55.jpg'),
('4','Lalibela Blend','Ethiopia','L','1 kg','Floral and fruity with jasmine and citrus notes. Clean, tea-like body inspired by Ethiopian elegance.',1350.00,'https://i.pinimg.com/736x/17/c5/3a/17c53acb12816d45c0ab892ad7bf38a7.jpg'),
('5','Goji Blend','Geisha','L','250 g','Elegant and aromatic, offering a blend of dried berries and floral tea with a gentle honeyed finish. A true Geisha experience.',2000.00,'https://i.pinimg.com/736x/f1/8b/6d/f18b6dfdc902cc68970b960cd4fa5111.jpg'),
('6','Holidays Blend','Brazil, Columbia','D','1 kg','Cozy and festive, combining chocolate, caramel, and ripe fruit notes — smooth and sweet for joyful moments.',1000.00,'https://i.pinimg.com/736x/c8/f2/47/c8f247a038690f6c40932adfe7d46762.jpg'),
('7','Hondurus Blend','Japan','L','500 g','Sweet and mellow with honey-like smoothness, balanced by soft fruity and almond tones. Easy to enjoy any time.',1050.00,'https://i.pinimg.com/736x/40/ed/c9/40edc9416a10b57c204ecc4927ef7a9b.jpg'),
('8','House Blend','Japan','D','1 kg','A classic dark roast with nutty and caramelized aromas. Full and rich, perfect for milk-based drinks or daily brews.',850.00,'https://i.pinimg.com/736x/97/1b/16/971b16a55584591a68f792571bf02f72.jpg'),
('9','Maejuntai Blend','Thai','L','500 g','Bright and floral with fruit-forward acidity. Clean, sweet, and lively — the taste of northern Thai highlands.',950.00,'https://i.pinimg.com/736x/13/47/3b/13473bd51b27cc7fab5b26cc87574945.jpg'),
('10','Moonstones Blend','Ethiopia, Geisha','L','250 g','Fragrant and refined with jasmine and bergamot aromas. Silky and layered, offering a premium specialty experience.',1800.00,'https://i.pinimg.com/736x/22/10/72/2210725128778112ad50c8ad1efb6b18.jpg'),
('11','Pangkhon Blend','Thai','M','500 g','Fresh and vibrant with hints of orange and red apple. Clean and balanced from Chiang Rai’s mountain farms.',1000.00,'https://i.pinimg.com/736x/b7/01/9f/b7019ffd91401c382192e3cdc2bba9ab.jpg'),
('12','Rebirth Blend','Thai, Japan','L','250 g','Refreshing fusion of watermelons and gentle yellow flowers tones. Smooth, light, and delicately floral.',1100.00,'https://i.pinimg.com/736x/b7/0c/ef/b70cef43fb85c98fd648675db3151d27.jpg'),
('13','Restinpeach Blend','Japan, Ethiopia','L','250 g','Juicy and sweet with notes of peach and summer flowers. Soft, refreshing, and relaxing on the palate.',1400.00,'https://i.pinimg.com/736x/2a/07/b9/2a07b9aae4467a13326d83bb8c368e41.jpg'),
('14','Rumbarel Blend','Europe','D','250 g','Deep and mature with rum-barrel warmth, chocolate, and nutty undertones. A sophisticated, smooth finish.',1520.00,'https://i.pinimg.com/736x/08/9d/f1/089df1d477ec655d47829c4dfdeca19b.jpg'),
('15','Sateeberral Blend','Europe, Columbia','L','500 g','Fruity and bright with wild berry and floral notes. Sweet-tart and winey, perfect for cold brew or pour-over.',1100.00,'https://i.pinimg.com/736x/24/48/ec/2448ecfda761a48be07942a85cd70048.jpg');
>>>>>>> origin/main



-- -------------------
-- ตาราง: Promotions
-- -------------------
CREATE TABLE Promotions (
    Promotion_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci PRIMARY KEY,
    Promotion_Name VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Discount_Value DECIMAL(8,2) NOT NULL,
    Promotion_Status VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    Promotion_Start_Date DATE NOT NULL,
    Promotion_End_Date DATE NOT NULL
);

INSERT INTO Promotions (Promotion_ID, Promotion_Name, Discount_Value, Promotion_Status, Promotion_Start_Date, Promotion_End_Date) VALUES
('P001','Buy 2 Get 1 Free',0.00,'Active','2025-11-01','2025-12-31'),
('P002','Weekend 10% Off',10.00,'Active','2025-11-02','2025-11-30'),
('P003','Black Friday 25%',25.00,'Upcoming','2025-11-29','2025-12-02'),
('P004','New Year Special',20.00,'Planned','2025-12-25','2026-01-05');

-- ------------------------------
-- ตาราง: Has_ProductPromotions
-- ------------------------------
CREATE TABLE Has_ProductPromotions (
    Product_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Promotion_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    PRIMARY KEY (Product_ID, Promotion_ID),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE,
    FOREIGN KEY (Promotion_ID) REFERENCES Promotions(Promotion_ID) ON DELETE CASCADE
);

INSERT INTO Has_ProductPromotions (Product_ID, Promotion_ID) VALUES
('001','P001'),
('002','P002'),
('005','P003'),
('010','P004'),
('015','P002');

-- --------------------------
-- ตาราง: Manage_UserProduct
-- --------------------------
CREATE TABLE Manage_UserProduct (
    Product_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    User_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    PRIMARY KEY (Product_ID, User_ID),
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE,
    FOREIGN KEY (User_ID) REFERENCES User_Account(User_ID) ON DELETE CASCADE
);

INSERT INTO Manage_UserProduct (Product_ID, User_ID) VALUES
('001','U001'),
('002','U002'),
('003','U003'),
('004','U004'),
('005','U001'),
('006','U002');

-- ----------------------
-- ตาราง: User_Email
-- ----------------------
CREATE TABLE User_Email (
    User_ID CHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Email VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    PRIMARY KEY (User_ID, Email),
    FOREIGN KEY (User_ID) REFERENCES User_Account(User_ID) ON DELETE CASCADE
);

INSERT INTO User_Email (User_ID, Email) VALUES
('U001','nattakit@example.com'),
('U002','naruepon@example.com'),
('U003','thanamet@example.com'),
('U004','babu@example.com'),
('U005','admin@example.com');

SELECT * FROM Product;



