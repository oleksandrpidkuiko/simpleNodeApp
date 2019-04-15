let ObjectID = require('mongodb').ObjectID;
module.exports = (app, db) => {
    app.get('/users/:id', (req, res) => {
        let id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('users').findOne(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        })
    });

    app.get('/users', (req, res) => {
        db.collection('users').find({}).toArray((err, result) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result);
            }
        })
    });

    app.post('/users', (req, res) => {
        const user = {name: req.body.name, description: req.body.description};
        db.collection('users').insertOne(user, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0])
            }
        })
    });

    app.delete('/users/:id', (req, res) => {
        let id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('users').removeOne(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('note ' + id + ' deleted');
            }
        })
    });

    app.put('/users/:id', (req, res) => {
        let id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const user = {name: req.body.name, description: req.body.description};
        db.collection('users').update(details, user, (err, result) => {
            if(err) {
                console.log(err);
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(user);
            }
        })
    })
};
