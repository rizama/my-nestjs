import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'my-jwt-strategy') {
    constructor() {
        super({
            secretOrKey: 'SECRET', // used for verified incoming token. must same with secret on generate token jwt, make sure put on env variable
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any) {
        // You can do more about user
        // do something ehre

        return {
            id: payload.sub,
            username: payload.username,
        };
    }
}
