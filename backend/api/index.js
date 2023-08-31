const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Root@123',
	database: 'work'
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
	if (err) throw err;
	console.log('Mysql Connected with App...');
});

/**
 * Get All Students
 *
 * @return response()
 */
app.get('/api/students', (req, res) => {
	setTimeout(function () {
		let sqlQuery = "SELECT * FROM students";

		let query = conn.query(sqlQuery, (err, results) => {
			if (err) throw err;
			res.send(apiResponse(results));
		});
	}, 2000)
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/student', (req, res) => {
	let sqlQuery = "SELECT * FROM students WHERE id=" + req.query.id + " LIMIT 1"

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results[0]));
	});
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/items', (req, res) => {
	let data = { title: req.body.title, body: req.body.body };

	let sqlQuery = "INSERT INTO items SET ?";

	let query = conn.query(sqlQuery, data, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/items/:id', (req, res) => {
	let sqlQuery = "UPDATE items SET title='" + req.body.title + "', body='" + req.body.body + "' WHERE id=" + req.params.id;

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/items/:id', (req, res) => {
	let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.send(apiResponse(results));
	});
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
	return JSON.stringify({ "status": 200, "error": null, "response": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3001, () => {
	console.log('Server started on port 3000...');
});