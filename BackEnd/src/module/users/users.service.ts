import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UpdateUserDto } from 'src/dto/updateUser.dtos';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) 
    {}

    async getUsers(): Promise<UsersEntity[]> {
        return await this.usersRepository.find({})
    }
    
    async addUser(newUser: CreateUserDto): Promise<UsersEntity> {
        return await this.usersRepository.save(newUser)
    }

    async updateUser(id: number, User: UpdateUserDto): Promise<UsersEntity> {
        const newUser = await this.usersRepository.preload({
            id,
            ...User
        })
        if(! newUser) {
            throw new NotFoundException(`cet id ${id} user n'existe pas`)
        }
        return await this.usersRepository.save(newUser)
    }
    async findUserById(id: number) {
        const user = await this.usersRepository.findOneBy({
            id: id
        })
        if(! user) {
            throw new NotFoundException(`cet id ${id} user n'existe pas`)
        }
        return user
    }

    async deleteUser(id: number) {
        const userToDelete = await this.findUserById(id)
        return this.usersRepository.delete(userToDelete.id)
    }

    async softDeleteUser(id: number) {
        await this.findUserById(id)
        return this.usersRepository.softDelete(id)
    }

    async restoreUser(id: number) {
        return this.usersRepository.restore(id)
    }

    async isEmailExists(email: string): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: { email }});
        if (user) {return user}
    }
}
