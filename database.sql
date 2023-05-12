CREATE DATABASE omniplace;

USE omniplace;

/*
En caso de usar una ID con UUID4 o similar
CREATE TABLE users(id VARCHAR(20) PRIMARY KEY, email VARCHAR(50), password VARCHAR(255));
*/
CREATE TABLE users(id INTEGER AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50), password VARCHAR(255));

CREATE TABLE list_categories(id VARCHAR(20) PRIMARY KEY, name VARCHAR(50), color VARCHAR(7), isPinned BOOLEAN);

CREATE TABLE list_items(id VARCHAR(20) PRIMARY KEY, item_text VARCHAR(50), category VARCHAR(20), isChecked BOOLEAN, FOREIGN KEY category REFERENCES list_categories(id));

CREATE TABLE note_categories(id VARCHAR(20) PRIMARY KEY, name VARCHAR(50), color VARCHAR(7));

CREATE TABLE note_notes(id VARCHAR(20) PRIMARY KEY, title varchar(50), content TEXT, categories TEXT, isPinned BOOLEAN, showContext BOOLEAN, FOREIGN KEY category REFERENCES list_categories(id));