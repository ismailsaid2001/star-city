import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users.dtos';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { SigninDto } from 'src/dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly JwtService: JwtService
    ) {}

    async signup(signupDto: CreateUserDto) {
        const user = await this.usersService.isEmailExists(signupDto.email)
        if (user) {throw new ConflictException("User already existing")}
        const passwordHash = await bcrypt.hash(signupDto.password, 10)
        signupDto.password = passwordHash
        await this.usersService.addUser(signupDto)
        return (`User ${signupDto.email} succefully created`)
    }

    async signin(signinDto: SigninDto) {
        const user = await this.usersService.isEmailExists(signinDto.email)
        if (!user) {throw new NotFoundException("User not found")}
        const match = await bcrypt.compare(signinDto.password, user.password)
        if(!match) {throw new UnauthorizedException("Password don't match")}
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        }
        const token = this.JwtService.sign(payload, {expiresIn: "30d", secret: process.env.SECRET_KEY})
        return {
            status: 201,
            token,
            user: {
                username: `${user.name} ${user.lastName}`,
                email: user.email
            }
        }
    }

    async deleteAccount(userToDelete: SigninDto) {
        const user = await this.usersService.isEmailExists(userToDelete.email)
        if (!user) {throw new NotFoundException("User not found")}
        const match = await bcrypt.compare(userToDelete.password, user.password)
        if(!match) {throw new UnauthorizedException("Password don't match")}
        await this.usersService.deleteUser(+user.id)
        return (`Account of ${user.email} deleted`)
    }

}
