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
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.register = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        // Validate request body
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({ error: 'Fullname, username, email and password are required' });
        }

        // Call auth service for login
        const result = await authService.register(fullname, username, email, password);
        res.json(result);
    } catch (error) {
        if (error.message.includes('users_email_unique')) {
            return res.status(400).json({ message: 'This email is already in use' });
        } else if (error.message.includes('users_username_unique')) {
            return res.status(400).json({ message: 'This username is already in use' });
        }
        if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required' });
        }

        const result = await authService.refresh(refreshToken);
        res.json(result);
    } catch (error) {
        console.error('Refresh token error:', error.message);
        res.status(401).json({ error: 'Invalid refresh token' });
    }
};

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required' });
        }

        await authService.logout(refreshToken);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.refresh = (req, res) => {
//     try {
//         // Get refresh token from HTTP-only cookie
//         const refreshToken = req.cookies.refreshToken;
//         if (!refreshToken) {
//             return res.status(401).json({ message: 'Unauthorized: No refresh token' });
//         }

//         // Verify the refresh token
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key', async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden: Invalid refresh token' });

//             const userId = decoded.userId;

//             // Check if the refresh token exists in the database
//             const storedToken = await RefreshToken.findOne({ where: { token: refreshToken, user_id: userId } });
//             if (!storedToken) {
//                 return res.status(403).json({ message: 'Forbidden: Refresh token not found' });
//             }

//             // Generate new tokens
//             const newAccessToken = generateAccessToken(userId);
//             const { token: newRefreshToken, expiresAt } = generateRefreshToken(userId);

//             // Delete the old refresh token from the database
//             await RefreshToken.destroy({ where: { token: refreshToken } });

//             // Store the new refresh token in the database
//             await RefreshToken.create({
//                 user_id: userId,
//                 token: newRefreshToken,
//                 expires_at: expiresAt,
//             });

//             // Set the new refresh token in an HTTP-only cookie
//             res.cookie('refreshToken', newRefreshToken, {
//                 httpOnly: true,
//                 secure: true,    // Ensure HTTPS in production
//                 sameSite: 'Strict',
//                 path: '/refresh',
//                 expires: expiresAt,
//             });

//             // Send new access token in response
//             res.json({ accessToken: newAccessToken });
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
