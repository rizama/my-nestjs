import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        
        // If using database
        const user = await this.usersService.getUser(username);
        const passwordValid = await bcrypt.compare(password, user.password);

        // use static database
        // const user = await this.usersService.getUserStatic(username);
        // const passwordValid = (password === user.password ? true : false);
        
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return {
                id: user.id,
                username: user.username,
            };
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.userName, sub: user.userId };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
