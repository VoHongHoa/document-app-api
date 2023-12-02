// src/users/models/user.model.ts

import { model } from 'mongoose';
import { User, UserSchema } from '../schemas/user.schema';

export const UserModel = model<User>('User', UserSchema);
