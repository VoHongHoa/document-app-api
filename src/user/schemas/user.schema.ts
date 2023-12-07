import { Schema, Document, Types } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    updatedBy: { type: Types.ObjectId, ref: 'User' },
    display_name: { type: String },
    e_point: { type: Number, default: 50 },
    avatar: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
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
  e_point: number;
  displayName?: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
  role: 'Admin' | 'User';

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
