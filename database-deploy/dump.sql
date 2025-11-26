PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE transaction_list_table (
      transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_date DATE NOT NULL,
      transaction_time TIME NOT NULL,
      transaction_description TEXT NOT NULL,
      transaction_amount REAL NOT NULL,
      transaction_category TEXT NOT NULL,
      transaction_sub_category TEXT NOT NULL,
      transaction_card_choice TEXT,
      transaction_income_source TEXT,
      transaction_expense_usage TEXT,
      transaction_hobby_category TEXT
    , transaction_expense_usage_category TEXT);
INSERT INTO transaction_list_table VALUES(43,'2025-11-24','17:30','Update Cash',3.149999999999999912,'Cash','Notes',NULL,'update',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(44,'2025-11-24','17:30','Update Coins',50.5,'Cash','Coins',NULL,'update',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(45,'2025-11-24','17:31','Update E Wallet (TnG)',0.4099999999999999756,'E-Wallet','Touch ''n Go',NULL,'update',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(46,'2025-11-24','17:32','Update Present Money',4.36000000000000032,'Card','Present','RHB','update',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(47,'2025-11-24','17:33','Update Savings',87.81999999999999317,'Card','Savings','RHB','update',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(48,'2025-11-24','17:33','Breakfast Him Sokry',8.0,'Card','Savings','RHB',NULL,'food',NULL,'Living');
INSERT INTO transaction_list_table VALUES(49,'2025-11-24','17:34','Lenard pay back Breakfast',2.0,'Card','Savings','RHB','paybank_reimbursement',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(50,'2025-11-24','17:35','Grab to Ayam Gepuk Mami Yana',12.0,'Card','Savings','RHB',NULL,'ride',NULL,'Personal');
INSERT INTO transaction_list_table VALUES(51,'2025-11-24','17:35','Grab from Ayam Gepuk to Enfrasys',14.0,'Card','Savings','RHB',NULL,'ride',NULL,'Personal');
INSERT INTO transaction_list_table VALUES(52,'2025-11-24','17:35','Payback Syahid Ayam Gepuk',4.900000000000000355,'Card','Savings','RHB',NULL,'food',NULL,'Living');
INSERT INTO transaction_list_table VALUES(53,'2025-11-24','17:42','Lunch Work (Kunyit)',10.0,'Card','Savings','RHB',NULL,'food',NULL,'Living');
INSERT INTO transaction_list_table VALUES(54,'2025-11-24','17:43','Cancel Lunch Work',10.0,'Card','Savings','RHB','refund',NULL,NULL,NULL);
INSERT INTO transaction_list_table VALUES(55,'2025-11-25','09:36','Roti Sambal Bilis',3.200000000000000177,'Card','Savings','RHB',NULL,'food',NULL,'Living');
INSERT INTO transaction_list_table VALUES(56,'2025-11-25','09:37','Tol to Puchong Hantar Atok Puchong',6.900000000000000355,'Card','Savings','RHB',NULL,'ride',NULL,'Personal');
INSERT INTO transaction_list_table VALUES(57,'2025-11-25','10:10','Breakfast work with Syahid and Lenard',10.0,'Card','Savings','RHB',NULL,'food',NULL,'Living');
INSERT INTO transaction_list_table VALUES(58,'2025-11-25','10:12','Lenard Payback Breakfast',2.0,'E-Wallet','Touch ''n Go',NULL,'paybank_reimbursement',NULL,NULL,NULL);
CREATE TABLE account_balance_table (
      account_id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_category TEXT NOT NULL,
      account_sub_category TEXT NOT NULL,
      account_card_type TEXT,
      current_balance REAL NOT NULL DEFAULT 0
    );
INSERT INTO account_balance_table VALUES(17,'E-Wallet','Touch ''n Go',NULL,2.410000000000000142);
INSERT INTO account_balance_table VALUES(18,'E-Wallet','Shopee Pay',NULL,0.0);
INSERT INTO account_balance_table VALUES(19,'Cash','Notes',NULL,3.149999999999999912);
INSERT INTO account_balance_table VALUES(20,'Cash','Coins',NULL,50.5);
INSERT INTO account_balance_table VALUES(21,'Card','Past','RHB',0.0);
INSERT INTO account_balance_table VALUES(22,'Card','Present','RHB',4.36000000000000032);
INSERT INTO account_balance_table VALUES(23,'Card','Savings','RHB',30.81999999999999318);
INSERT INTO account_balance_table VALUES(24,'Card','Bliss','RHB',0.0);
CREATE TABLE commitment_list_table (
                commitment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                commitment_name TEXT NOT NULL,
                commitment_description TEXT,
                commitment_per_month REAL NOT NULL,
                commitment_per_year REAL NOT NULL,
                commitment_notes TEXT,
                commitment_status TEXT NOT NULL DEFAULT 'Active',
                commitment_start_month INTEGER,
                commitment_start_year INTEGER
            );
INSERT INTO commitment_list_table VALUES(1,'Netflix','Netflix premium share with 5 people',11.0,132.0,'Pay to Afiq Danish (Apple)','Active',NULL,NULL);
INSERT INTO commitment_list_table VALUES(2,'Spotify','Spotify Premium (Pay Yearly easier)',4.150000000000000356,49.80000000000000426,'Spotify Premium to be paid to Mustika Hati by 164100332950 (Maybank).','Active',NULL,NULL);
INSERT INTO commitment_list_table VALUES(3,'Mom''s Bed','Coway Bed that need to be paid monthly.',79.0,948.0,'Bank in to Papa because it will be deducted from Papa''s account: 18750102535 (Hong Leong)','Active',NULL,NULL);
INSERT INTO commitment_list_table VALUES(4,'TnG My50','Payment via Touch & Go E-Wallet. Need to renew every month for public transportation.',50.0,600.0,'Reload at the pickleball NFC TnG','Active',NULL,NULL);
INSERT INTO commitment_list_table VALUES(5,'Yuran KKB UP3',unistr('Yuran Security KKB need to be paid every month.\u000a'),100.0,1200.0,unistr('8600163125 cimb\u000aPersatuan Penduduk UP3\u000a\u000aReference : KKB 22, 7F'),'Active',NULL,NULL);
INSERT INTO commitment_list_table VALUES(6,'Monthly Multigym Camp5 Subscription',unistr('Auto-debit every 25th and have to take not my salary on 28th. First month Prorated until the end of the month.\u000a\u000a'),228.0,2736.0,'Between 228 (Monthly) or 268 (30 day pass)','Pending',NULL,NULL);
CREATE TABLE commitment_payment_status_table (
                commitment_payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                commitment_id INTEGER NOT NULL,
                payment_month INTEGER NOT NULL,
                payment_year INTEGER NOT NULL,
                payment_status INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (commitment_id) REFERENCES commitment_list_table(commitment_id) ON DELETE CASCADE,
                UNIQUE(commitment_id, payment_month, payment_year)
            );
INSERT INTO commitment_payment_status_table VALUES(1,1,10,2025,1);
INSERT INTO commitment_payment_status_table VALUES(3,3,10,2025,1);
INSERT INTO commitment_payment_status_table VALUES(9,3,9,2025,1);
INSERT INTO commitment_payment_status_table VALUES(10,1,9,2025,1);
INSERT INTO commitment_payment_status_table VALUES(11,2,9,2025,1);
INSERT INTO commitment_payment_status_table VALUES(13,4,9,2025,1);
INSERT INTO commitment_payment_status_table VALUES(14,5,9,2025,1);
INSERT INTO commitment_payment_status_table VALUES(17,2,10,2025,1);
INSERT INTO commitment_payment_status_table VALUES(18,4,10,2025,1);
INSERT INTO commitment_payment_status_table VALUES(19,5,10,2025,1);
INSERT INTO commitment_payment_status_table VALUES(20,2,11,2025,1);
CREATE TABLE wishlist_table (
                wishlist_id INTEGER PRIMARY KEY AUTOINCREMENT,
                wishlist_name TEXT NOT NULL,
                wishlist_category TEXT NOT NULL,
                wishlist_estimate_price REAL,
                wishlist_final_price REAL,
                wishlist_purchase_date DATE,
                wishlist_url_link TEXT,
                wishlist_url_picture TEXT,
                wishlist_status TEXT NOT NULL DEFAULT 'not_purchased'
            );
INSERT INTO wishlist_table VALUES(1,'Mirasoul Flight Unit','Gunpla',30.0,NULL,NULL,NULL,NULL,'not_purchased');
INSERT INTO wishlist_table VALUES(2,'Miorine Rembran','Gunpla',146.0,NULL,NULL,'https://gundam.fandom.com/wiki/High_Grade_the_Witch_from_Mercury','https://product.hstatic.net/1000231532/product/miorine_rembran_figure-rise_standard_gundam_the_witch_from_mercury_6c22ffd82a4f4f98838235f4499ae2a1.jpg','not_purchased');
INSERT INTO wishlist_table VALUES(3,'Selutta Mercury','Gunpla',118.0,NULL,NULL,NULL,NULL,'not_purchased');
INSERT INTO wishlist_table VALUES(4,'Chuatury Panlunch','Gunpla',139.0,NULL,NULL,NULL,NULL,'not_purchased');
INSERT INTO wishlist_table VALUES(5,'Nika Nanaura','Gunpla',146.0,NULL,NULL,NULL,NULL,'not_purchased');
INSERT INTO wishlist_table VALUES(6,'Customized PC','Technology',4500.0,NULL,NULL,NULL,NULL,'not_purchased');
INSERT INTO wishlist_table VALUES(7,'Beguir-Beu','Gunpla',75.0,67.5,'2025-11-14',NULL,'https://www.gundam.my/images/sell_products/big/image_7567.jpg','purchased');
CREATE TABLE debts_table (
                debt_id INTEGER PRIMARY KEY AUTOINCREMENT,
                debt_type TEXT NOT NULL,
                created_date DATE NOT NULL,
                due_date DATE,
                person_name TEXT NOT NULL,
                amount REAL NOT NULL,
                notes TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                settled_date DATE
            );
INSERT INTO debts_table VALUES(1,'payable','2025-11-25',NULL,'Syahid',4.0,'To payback Nasi Lemak Paru without Telur. RM7.00 - RM3.00 (2 nasi lemak & 1 Bihun from Him Sokry) = RM4.00','pending',NULL);
INSERT INTO debts_table VALUES(2,'receivable','2025-11-25',NULL,'Ariff Hafizal',2.0,'Telur Rebus and Pisang from Him Sokry','pending',NULL);
INSERT INTO debts_table VALUES(3,'payable','2025-11-26',NULL,'Syahid',8.0,'Nasi Lemak Syahid + Telur Mata + Ayam Sambal','pending',NULL);
PRAGMA writable_schema=ON;
CREATE TABLE IF NOT EXISTS sqlite_sequence(name,seq);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('account_balance_table',24);
INSERT INTO sqlite_sequence VALUES('transaction_list_table',58);
INSERT INTO sqlite_sequence VALUES('commitment_list_table',7);
INSERT INTO sqlite_sequence VALUES('commitment_payment_status_table',20);
INSERT INTO sqlite_sequence VALUES('wishlist_table',7);
INSERT INTO sqlite_sequence VALUES('debts_table',3);
PRAGMA writable_schema=OFF;
COMMIT;
