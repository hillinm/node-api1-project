const User = require('./user-model.js');

const express = require(`express`);
const server = express();

server.post('/api/users', async (req, res) => {
    const user = req.body;

    if ( !user.name || !user.bio ) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        try {
            const newUser = User.create(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"});
        }
    }
})

server.get('/api/users', async (req, res) => {

    try {
        const Users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    }
})

server.get('/api/users/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    } catch (err) {
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.delete(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    } catch (err) {
        res.status(500).json({errorMessage: "The user could not be removed"})
    }
})

server.put('/api/users/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    
    if (!changes.name || !changes.bio ) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {

        try {
            const updateUser = await User.update(id, changes);
            if (updateUser) {
                res.status(200).json(updateUser)
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        } catch (err) {
            res.status(500).json({errorMessage: "The user information could not be modified."})
        }
    }
})

module.exports = server;