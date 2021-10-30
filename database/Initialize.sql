CREATE DATABASE IF NOT EXISTS crud_express;
USE crud_express;

DROP TRIGGER IF EXISTS incomes_AFTER_INSERT;
DROP TRIGGER IF EXISTS incomes_AFTER_UPDATE;
DROP VIEW IF EXISTS userIncome;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS incomes;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS ledger;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS budgets;

CREATE TABLE users (
	userID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE CHECK(email LIKE '%_@_%.__%'),
	password VARCHAR(25) NOT NULL
);

CREATE TABLE incomes (
    incomeID VARCHAR(64) NOT NULL PRIMARY KEY,
	userID INTEGER REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(256) NOT NULL,
    amount DECIMAL(13,2) CHECK(amount >= 0),
    category ENUM('Allowance', 'Freelance', 'Others','Salary'),
    recurring_start_date DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    recurring_end_date DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    recurring BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    expensesID VARCHAR(64) NOT NULL PRIMARY KEY,
	userID INTEGER REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(256) NOT NULL,
    amount DECIMAL(13,2) CHECK(amount >= 0),
    category ENUM('Bills', 'Food', 'Luxury','Others', 'Transport', 'Utility'),
    recurring_start_date DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    recurring_end_date DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    recurring BOOLEAN NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger (
	userID INTEGER REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    current_balance DECIMAL(13,2) DEFAULT 0
);

CREATE TABLE goals (
    goalID VARCHAR(64) NOT NULL PRIMARY KEY,
	userID INTEGER REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(256) NOT NULL,
    amount DECIMAL(13,2) CHECK(amount >= 0),
    category VARCHAR(64),
    possible BOOLEAN DEFAULT 0,
    done BOOLEAN DEFAULT 0,
    image_url VARCHAR(256),
    start_date DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    end_date DATE DEFAULT (DATE(CURRENT_TIMESTAMP)),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budgets (
	userID INTEGER REFERENCES users(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    category ENUM('Bills','Food', 'Luxury', 'Others', 'Transport', 'Utility'),
    budget_amount_per_month DECIMAL(13,2) DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userID, category)
);

INSERT INTO users (`name`, `email`, `password`) VALUES ('admin', 'admin@hotmail.com', 'admin');
call crud_express.sp_insertBulkData();