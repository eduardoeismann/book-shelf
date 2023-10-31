const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bookRouter = require('./routes/book-router');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB Connection Error Here! --> '));

app.get('/', (req, res) => {
    res.send('Its working!');
});

app.use('/api', bookRouter);

app.listen(port, () => console.log(`Running on port ${port}`));
