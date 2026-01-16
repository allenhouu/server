const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
const port = 3000;


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
app.get('/', (req, res) => {
    res.json({
        data: users
    });
});

const users = [];

app.post('/', (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Name and email are required');
    }

    const newUser = {name, email, password};

    users.push(newUser);
    console.log('User created: ' + newUser);
    res.status(201).json(users);
})


app.put('/:index', (req, res) => {
    const userIndex = parseInt(req.params.index);
    const { name, email, password } = req.body;

    if (userIndex === -1)
    {
        return res.status(404).send('User not found.');
    }

    users[userIndex] = {name, email, password};
    console.log('User updated:', users);

    res.status(200).json(users);
})

app.delete('/:index', (req, res) => {
    const userIndex = parseInt(req.params.index);

    if (userIndex === -1)
    {
        return res.status(400).send('User not found.');
    }

    users.splice(userIndex, 1);
    console.log('User deleted.');

    res.status(200).json(users);
})