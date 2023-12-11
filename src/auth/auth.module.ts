import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminJwtStategy, GoogleStrategy, JwtStrategy } from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'google' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, AdminJwtStategy],
})
export class AuthModule {}
