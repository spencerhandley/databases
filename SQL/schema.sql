CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  message varchar(255),
  userid varchar(11),
  roomname varchar(255),
  createdAt date,
  updatedAt date,
  ID int(11) NOT NULL auto_increment,
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE rooms (
 roomname varchar(40),
  ID int(11) NOT NULL auto_increment,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  name varchar(40),
  ID int(11) NOT NULL auto_increment,
  PRIMARY KEY (ID)
);

CREATE TABLE user_and_room (
  user_id int(11),
  room_id int(11)
)

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




