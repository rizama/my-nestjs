import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
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
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return { User: req.user, msg: 'User logged in' }; // TODO: return JWT Token
    }

    // Get / protected
    @UseGuards(AuthenticatedGuard)
    @Get('/protected')
    getHello(@Request() req): string { // TODO: require an Beare Token, validate token
        return req.user;
    }

    //Get / logout
    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' };
    }
}
