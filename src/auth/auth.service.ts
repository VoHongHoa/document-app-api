import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto, SignInDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { SignInReponse, SignUpReponse } from './reponse';
import { JWTPayload, UserFromGoogle } from './interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signin(dto: SignInDto): Promise<SignInReponse> {
    try {
      const user = await this.userModel.findOne({ username: dto.username });

      if (!user) {
        throw new NotFoundException('Username is incorrect');
      }
      if (!(await bcrypt.compare(dto.password, user.password))) {
        throw new NotFoundException('Password is incorrect');
      }
      const accessToken = await this.signToken({
        id: user._id,
        role: user.role,
      });
      return {
        access_token: accessToken,
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  async signup(dto: SignUpDto): Promise<SignUpReponse> {
    try {
      const existingUser = await this.userModel.findOne({
        $or: [{ username: dto.username }, { email: dto.email }],
      });

      if (existingUser) {
        throw new BadRequestException('Username or email already exists');
      }
      const salt: string = await bcrypt.genSalt();
      const hashPassword: string = await bcrypt.hash(dto.password, salt);
      const user = new this.userModel({
        email: dto.email,
        password: hashPassword,
        username: dto.username,
        display_name: dto.display_name,
      });
      const newUser = await user.save();
      const accessToken = await this.signToken({
        id: user._id,
        role: user.role,
      });
      return {
        access_token: accessToken,
        user: newUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async signinWithGoogle(user: UserFromGoogle): Promise<string> {
    try {
      const existUser = await this.userModel.findOne({
        $or: [{ username: user.email }, { email: user.email }],
      });
      if (!existUser) {
        const salt: string = await bcrypt.genSalt();
        const hashPassword: string = await bcrypt.hash(
          this.generateRandomString(6),
          salt,
        );
        const newUser = new this.userModel({
          username: user.email,
          password: hashPassword,
          email: user.email,
          avatar: user.avatar,
          display_name: user.display_name,
        });
        const savedUser = await newUser.save();
        return await this.signToken({
          id: savedUser._id,
          role: savedUser.role,
        });
      }
      return await this.signToken({
        id: existUser._id,
        role: existUser.role,
      });
    } catch (error) {
      throw error;
    }
  }

  async signToken(payload: JWTPayload): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    const accessToken: string = await this.jwt.signAsync(payload, {
      secret: secret,
    });
    return accessToken;
  }

  private generateRandomString(length: number): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      result += charset[randomIndex];
    }

    return result;
  }
}
