import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('queryAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get('query')
  findOne(@Query('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('update')
  update(@Body('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get('delete')
  remove(@Query('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('star')
  star(@Body('id') id: string, @Body('templateId') templateId: string) {
    return this.userService.star(id, templateId);
  }
}
