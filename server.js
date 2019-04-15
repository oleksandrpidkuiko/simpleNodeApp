const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');
const app = express();
const port = 4343;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
MongoClient.connect(db.url, {useNewUrlParser: true}, (err, client) => {

    if (err) {
        return console.log(err);
    }
    const database = client.db('Customers');
    require('./app/routs')(app, database);

    app.listen(port, () => {
        console.log('app listen at ' + port);
    });
});

