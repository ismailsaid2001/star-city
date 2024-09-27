import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";

type Payload = {
    id: number,
    email: string,
    role: string
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
            ignoreExpiration: true
        })
    }
    async validate(payload: Payload) {
        const user = await this.usersService.isEmailExists(payload.email)
        if (!user) {throw new UnauthorizedException("Unauthorized")}
        return user
    }
}
