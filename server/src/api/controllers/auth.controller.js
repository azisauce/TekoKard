const authService = require('../../business/services/auth.service');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Call auth service for login
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        console.error('Login error:', error.message);
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate request body
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email and password are required' });
        }

        // Call auth service for login
        const result = await authService.register(username, email, password);
        res.json(result);
    } catch (error) {
        console.error('Register error:', error.message);
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
