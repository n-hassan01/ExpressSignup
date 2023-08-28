/* eslint-disable prettier/prettier */
const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../dbConnection');

const router = express.Router();

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.required(),
    });
    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send('Invalid inputs');
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            username: req.body.userName,
            password: hashedPassword,
            role: req.body.userRole,
        };

        await pool.query(
            'insert into signup(name, username, password, role) values($1, $2, $3, $4) RETURNING *',
            [newUser.name, newUser.userName, newUser.password, newUser.userRole],
            (error) => {
                if (error) throw error;

                res.status(200).send('Sign up complete!');
            },
        );
    } catch (err) {
        res.status(500).send('Signup failed! Try again');
    }
});

module.exports = router;
