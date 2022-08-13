import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    //post / signup
    @Post('/signup')
    async addUser(
        @Body('password') userPassword: string,
        @Body('username') userName: string,
    ) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
        const result = await this.usersService.insertUser(
            userName,
            hashedPassword,
        );
        return {
            msg: 'User successfully registered',
            userId: result.id,
            userName: result.username,
        };
    }

    //Post / Login
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return { User: req.user, msg: 'User logged in' };
    }
}
