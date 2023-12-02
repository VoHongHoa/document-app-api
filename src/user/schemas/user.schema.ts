import { Schema, Document, Types } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
    birthdate: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    isActive: { type: Boolean, default: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  birthdate?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  isActive: boolean;
  role: 'Admin' | 'User';

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
