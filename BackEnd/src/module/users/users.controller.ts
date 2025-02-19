import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UpdateUserDto } from 'src/dto/updateUser.dtos';


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    async getAllUsers(): Promise<UsersEntity[]> {
        return await this.usersService.getUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UsersEntity> {
        return await this.usersService.findUserById(id);
    }
    
    @Post('create')
    async postUser(
        @Body() newUser: CreateUserDto
    ): Promise<UsersEntity> {
        return await this.usersService.addUser(newUser);
    }

    @Patch(':id')
    async updateUser(
        @Body() newUser: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<UsersEntity> {
        return await this.usersService.updateUser(id, newUser);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.usersService.deleteUser(id)
    }
}