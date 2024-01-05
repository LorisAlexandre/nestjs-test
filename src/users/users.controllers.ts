import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose, { Model } from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUse.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/schemas/User.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('all')
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(
    @GetUser() //custom decorator
    user: Model<User>, //user type: userModel
  ) {
    return { user, result: true };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    else return findUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedUser = await this.usersService.updateUser(id, updateUserDto);

    if (!updatedUser) throw new HttpException('Invalid ID', 404);
    else return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedUser = await this.usersService.deleteUser(id);

    if (!deletedUser) throw new HttpException('Invalid ID', 404);
    else return { result: true };
  }
}
