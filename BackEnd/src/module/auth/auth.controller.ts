import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/users.dtos';
import { AuthService } from './auth.service';
import { SigninDto } from 'src/dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(@Body() signupDto: CreateUserDto) {
        return this.authService.signup(signupDto)
    }

    @Post("signin")
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto)
    }
    @UseGuards(AuthGuard("jwt"))
    @Delete("delete")
    deleteAccount(@Body() deleteUser: SigninDto) {
        return this.authService.deleteAccount(deleteUser)
    }

}
