const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/students", async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO students (first_name, last_name) VALUES($1,$2) RETURNING *",
      [first_name, last_name]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all students & books

app.get("/students", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM students");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/books", async (req, res) => {
  try {
    const allbooks = await pool.query("SELECT * FROM books");
    res.json(allbooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});



//get a todo

app.get("/students/:first_name", async (req, res) => {
  try {
    const { first_name } = req.params;
    const todo = await pool.query("SELECT * FROM students WHERE first_name = $1", [
      first_name
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/books/:book_name", async (req, res) => {
  try {
    const { book_name } = req.params;
    const todo = await pool.query("SELECT * FROM books WHERE book_name = $1", [
      book_name
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/students/:first_name", async (req, res) => {
  try {
    const { first_name } = req.params;
    const { last_name } = req.body;
    const updatestudents = await pool.query(
      "UPDATE students SET last_name = $1 WHERE first_name = $2",
      [last_name, first_name]
    );

    res.json("students was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/books/:book_name", async (req, res) => {
  try {
    const { book_name } = req.params;
    const { author, borrowed_by, dateof_borrow, expecteddateof_return } = req.body;
    const updatebooks = await pool.query(
      "UPDATE books SET author = $1, borrowed_by = $2, dateof_borrow = $3, expecteddateof_return = $4 WHERE book_name = $5",
      [author, borrowed_by, dateof_borrow, expecteddateof_return, book_name]
    );

    res.json("books was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/students/:first_name", async (req, res) => {
  try {
    const { first_name } = req.params;
    const deleteTodo = await pool.query("DELETE FROM students WHERE first_name = $1", [
      first_name
    ]);
    res.json("student was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/books/:book_name", async (req, res) => {
  try {
    const { book_name } = req.params;
    const deletebooks = await pool.query("DELETE FROM books WHERE book_name = $1", [
      book_name
    ]);
    res.json("book was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
