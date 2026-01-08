const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
const port = 3000;

const message = "";

app.get('/', (req, res) => {
    res.json({
        data: message
    });
});

const users = [];

app.post('/', (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Name and email are required');
    }

    let nextUserId;
    const newUser = {id: nextUserId++, name, email, password};

    users.push(newUser);
    console.log('User created: ' + newUser);
    res.status(201).json(newUser);
})


app.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1)
    {
        return res.status(404).send('User not found.');
    }

    users[userIndex] = {...users[userIndex], name, email, password};
    console.log('User updated:', users[userIndex]);

    res.status(200).json(users[userIndex]);
})
