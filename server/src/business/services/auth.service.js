const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../../data/repositories/user.repository');

class AuthService {
    async login(email, password) {
        // Find user by email
        const user = await userRepository.findByEmail(email);        
        if (!user) {
            throw new Error('Invalid credentials');
        }
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data and token (excluding password)
        const { password_hash: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    }

    async register(username, email, password) {
        // Hash password
        const hash = await bcrypt.hash(password, 10);

        // Create user
        const user = await userRepository.create({
            username,
            email,
            password_hash: hash
        });
        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data and token (excluding password)
        const { password_hash: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token
        };
    }
}

module.exports = new AuthService();
