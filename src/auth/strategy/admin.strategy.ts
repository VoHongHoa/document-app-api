// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../interface';

@Injectable()
export class AdminJwtStategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'), // Replace with your own secret key
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userModel
      .findOne({
        _id: new mongoose.Types.ObjectId(payload.id),
        role: 'Admin',
      })
      .exec();
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}
