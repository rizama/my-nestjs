import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        //instantiate service
        private authService: AuthService,
    ) {}

    @Post('signup')
    signup(@Body() dto: AuthDto): Promise<{access_token: string}> {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto): Promise<{access_token: string}> {
        return this.authService.signin(dto)
    }
}
