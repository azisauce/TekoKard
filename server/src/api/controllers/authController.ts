import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../data/models/userModel';
import { LoginRequest, UserPayload } from '../../data/types';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginRequest = req.body;

      // Find user & verify password
      const user = await UserModel.findByEmail(email);
      if (!user || !(await UserModel.verifyPassword(password, user?.password_hash))) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Create tokens
      const accessToken = AuthController.generateAccessToken({
        userId: user.id,
        email: user.email
      });

      const refreshToken = AuthController.generateRefreshToken({
        userId: user.id
      });

      // Set refresh token as HTTP-only cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Send access token to client
      res.json({
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
        console.log('error,',error);
        
        res.status(500).json({ message: 'Server error' });
    }
  }

  static async refresh(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token not found' });
        return;
      }

      // Verify refresh token
      try {
        const decoded = jwt.verify(
          refreshToken, 
          process.env.REFRESH_TOKEN_SECRET as string
        ) as UserPayload;

        // Find user
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
          res.status(401).json({ message: 'User not found' });
          return;
        }

        // Create new access token
        const accessToken = AuthController.generateAccessToken({
          userId: user.id,
          email: user.email
        });

        res.json({ accessToken });
      } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // Clear the refresh token cookie
      res.clearCookie('refreshToken');
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async protected(req: Request, res: Response): Promise<void> {
    res.json({ message: 'This is protected data', user: req.user });
  }

  private static generateAccessToken(payload: UserPayload): string {
    return jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '15m' }
    );
  }

  private static generateRefreshToken(payload: UserPayload): string {
    return jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );
  }
}
