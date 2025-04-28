const bcrypt = require('bcrypt');

const db = require('../db');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const role = 'Employé'; // default role
    const register_date = new Date().toISOString();

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        db.run(
            `INSERT INTO users (nom, email, mot_de_passe, role, date_inscription)
             VALUES (?, ?, ?, ?, ?)`,
            [username, email, hashedPassword, role, register_date],
            function (err) {
                if (err) {
                    console.error(err.message);
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Username or email already exists' });
                    } else {
                        return res.status(500).json({ error: 'Database error' });
                    }
                }
                return res.status(201).json({ message: 'User registered successfully' });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.loginUser = (req, res) => {
    // You will implement this after: verifying user, returning a token, etc.
};
