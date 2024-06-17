// src/users/users.controller.ts
import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body('name') name: string, @Body('age') age: number) {
    return this.usersService.create(name, age);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
