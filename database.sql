CREATE database Library;

CREATE TABLE students (
first_name VARCHAR(100) PRIMARY KEY,
last_name VARCHAR(100)
);


CREATE TABLE books (
book_name VARCHAR(100) PRIMARY KEY,
author VARCHAR(100),
borrowed_by VARCHAR(100),
dateof_borrow date ,
expecteddateof_return date,
CONSTRAINT FK_bb FOREIGN KEY (borrowed_by) REFERENCES students(first_name)
);

INSERT INTO students VALUES('Sarmed AHmed','Usmani');
INSERT INTO students VALUES('Syed Bilal','Fahim');
INSERT INTO students VALUES('Agha','Usman');
INSERT INTO students VALUES('Saad AHmed','Zubairi');

INSERT INTO books VALUES('Maths','Dickens','Agha','02-JUL-2022','09-JUL-2022');
INSERT INTO books VALUES('Physics','Lord',NUll,NUll,NUll);
INSERT INTO books VALUES('Chemistry','Ben','Syed Bilal','05-JUL-2022','12-JUL-2022');
INSERT INTO books VALUES('Biology','Jack',NUll,NUll,NUll);