// src/users/users.service.ts

import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (!this.isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(userId: string) {
    if (!this.isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async getUserById(userId: string): Promise<User> {
    if (!this.isValidObjectId(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    try {
      // Exclude the 'password' field from the query result
      return this.userModel.findById(userId).select('-password').exec();
    } catch (error) {
      // Handle not found error
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  private isValidObjectId(id: string): boolean {
    // Check if the provided ID is a valid MongoDB ObjectID
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}
