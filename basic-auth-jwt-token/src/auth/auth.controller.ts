import * as bcrypt from 'bcrypt';
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    //post / signup
    @Post('/signup')
    async addUser(
        @Body('password') userPassword: string,
        @Body('username') userName: string,
    ) {
        try {
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(
                userPassword,
                saltOrRounds,
            );
            const result = await this.usersService.insertUser(
                userName,
                hashedPassword,
            );
            return {
                msg: 'User successfully registered',
                userId: result.id,
                userName: result.username,
            };
        } catch (error) {
            return {
                msg: 'Failed',
                msgError: error.message,
            };
        }
    }

    //Post / Login
    @UseGuards(LocalAuthGuard) // Find user to database and mapping the body data
    @Post('/signin')
    login(@Request() req): any {
        return this.authService.login(req.user);
    }

    //Get / logout
    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' };
    }
}
