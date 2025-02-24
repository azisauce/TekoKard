const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../../data/repositories/user.repository');
const RefreshToken = require('../../data/models/refresh-token.model');
const Team = require('../../data/models/team.model');
const db = require('../../data/database');

class AuthService {
    generateAccessToken(user) {
        return jwt.sign(
            { userId: user.user_id, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '15m' } // Short lived access token
        );
    }

    generateRefreshToken(user) {
        const refreshToken = jwt.sign(
            { userId: user.user_id },
            process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key',
            { expiresIn: '7d' } // 7 days
        );

        // Calculate expiration date for database
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        return { token: refreshToken, expiresAt };
    }

    async login(email, password) {
        // Find user by email
        const user = await userRepository.findByEmail(email);  
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const team = await Team.findTeamByUserId(user.user_id);
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate tokens
        const accessToken = this.generateAccessToken(user);
        const { token: refreshToken, expiresAt } = this.generateRefreshToken(user);

        // Store refresh token
        await RefreshToken.create({
            user_id: user.user_id,
            token: refreshToken,
            expires_at: expiresAt,
        });

        // Set refresh token as an HTTP-only cookie
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,      // Prevents JavaScript access
        //     secure: true,        // Use HTTPS in production
        //     sameSite: 'Strict',  // Prevents CSRF attacks
        //     path: '/refresh',    // Only send this cookie on refresh requests
        //     expires: expiresAt,  // Set expiration
        // });

        // Return user data and tokens (excluding password)
        const { password_hash: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
            team
        };
    }

    async register(fullname, username, email, password) {
        const transaction = await db.transaction();
        
        try {
            // Hash password
            const hash = await bcrypt.hash(password, 10);

            // Create user within transaction
            const [user] = await userRepository.create({
                full_name: fullname,
                username,
                email,
                password_hash: hash
            }, { transaction });

            // Generate tokens
            const accessToken = this.generateAccessToken(user);
            const { token: refreshToken, expiresAt } = this.generateRefreshToken(user);

            // Store refresh token within transaction
            await RefreshToken.create({
                user_id: user.user_id,
                token: refreshToken,
                expires_at: expiresAt
            }, { transaction });

            // Commit transaction
            await transaction.commit();

            // Return user data and tokens (excluding password)
            const { password_hash: _, ...userWithoutPassword } = user;
            return {
                user: userWithoutPassword,
                accessToken,
                refreshToken
            };
        } catch (error) {
            // Rollback transaction on error
            await transaction.rollback();
            throw error;
        }
    }

    async refresh(refreshToken) {
        try {
            // Verify refresh token
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key'
            );

            // Check if refresh token exists in database
            const storedToken = await RefreshToken.findByToken(refreshToken);
            if (!storedToken) {
                throw new Error('Invalid refresh token');
            }

            // Check if token is expired
            if (new Date(storedToken.expires_at) < new Date()) {
                await RefreshToken.delete(refreshToken);
                throw new Error('Refresh token expired');
            }

            // Get user
            const user = await userRepository.findById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Generate new access token
            const accessToken = this.generateAccessToken(user);

            return { accessToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    async logout(refreshToken) {
        // Delete refresh token from database
        await RefreshToken.delete(refreshToken);
    }
}

module.exports = new AuthService();
