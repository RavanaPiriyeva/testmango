const express = require('express');
const { countryRoutes } = require('./routes/countryRoutes');
const { writerRoutes } = require('./routes/writerRoutes');
const { bookRoutes } = require('./routes/bookRoutes');
const fileUpload = require('express-fileupload');

const { db } = require('./config/db');
const app = express();
require('dotenv').config()

db.connect();

app.use(express.json())
app.use(fileUpload());


app.use('/api/country', countryRoutes)

app.use('/api/writer', writerRoutes)
app.use('/api/book', bookRoutes)


app.listen(3000);