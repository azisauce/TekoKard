import { User } from '../types';
import bcrypt from 'bcrypt';
import db from '../../config/database';

export class UserModel {
  static async findByEmail(email: string): Promise<User | undefined> {
    const user = await db('users')
      .where({ email })
      .first();
    return user || undefined;
  }

  static async findById(id: string): Promise<User | undefined> {
    const user = await db('users')
      .where({ id })
      .first();
    return user || undefined;
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async create(user: Omit<User, 'id'>): Promise<User> {
    const [newUser] = await db('users')
      .insert(user)
      .returning('*');
    return newUser;
  }

  static async update(id: string, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db('users')
      .where({ id })
      .update(userData)
      .returning('*');
    return updatedUser;
  }

  static async delete(id: string): Promise<boolean> {
    const deleted = await db('users')
      .where({ id })
      .delete();
    return deleted > 0;
  }
}