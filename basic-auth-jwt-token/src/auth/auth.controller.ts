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
import { AuthDto } from './dto/auth.dto';
import { LocalValidatedStrategy, TokenLoginResponse } from './auth';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    //post / signup
    @Post('/signup')
    async addUser(
        @Body('password') payload: AuthDto,
    ) {
        try {
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(
                payload.password,
                saltOrRounds,
            );
            const result = await this.usersService.insertUser(
                payload.username,
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
    login(@Request() req: LocalValidatedStrategy): Promise<TokenLoginResponse> {
        return this.authService.login(req.user);
    }

    //Get / logout
    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' };
    }
}
