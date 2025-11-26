CREATE TABLE sqlite_sequence(name,seq);
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
CREATE TABLE account_balance_table (
      account_id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_category TEXT NOT NULL,
      account_sub_category TEXT NOT NULL,
      account_card_type TEXT,
      current_balance REAL NOT NULL DEFAULT 0
    );
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
CREATE TABLE commitment_payment_status_table (
                commitment_payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
                commitment_id INTEGER NOT NULL,
                payment_month INTEGER NOT NULL,
                payment_year INTEGER NOT NULL,
                payment_status INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (commitment_id) REFERENCES commitment_list_table(commitment_id) ON DELETE CASCADE,
                UNIQUE(commitment_id, payment_month, payment_year)
            );
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
