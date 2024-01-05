import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';
import { SignupDto } from './dto/SignupDto';
import { SigninDto } from './dto/SigninDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup({ settings, ...signupDto }: SignupDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();

      const newUser = new this.userModel({
        ...signupDto,
        settings: savedNewSettings._id,
      });
      const savedUser = await newUser.save();
      const userId = savedUser._id.toString();
      const access_token = await this.signToken(userId, savedUser.email);
      return {
        access_token,
        result: true,
      };
    }

    const newUser = new this.userModel(signupDto);
    const savedUser = await newUser.save();
    const userId = savedUser._id.toString();
    const access_token = await this.signToken(userId, savedUser.email);
    return {
      access_token,
      result: true,
    };
  }

  async signin({ email, password }: SigninDto) {
    const findUser = await this.userModel.findOne({ email });

    if (!findUser) throw new HttpException('User not found', 404);
    else if (findUser.password !== password)
      throw new HttpException('Email or Password wrong', 400);
    else {
      const access_token = await this.signToken(findUser._id, findUser.email);
      return {
        access_token,
        result: true,
      };
    }
  }

  signToken(userId: any, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
