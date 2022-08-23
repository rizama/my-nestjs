import { UsersService } from './users.service';
import {
    Controller,
    Get,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Get / protected
    @UseGuards(JwtAuthGuard)
    @Get('/protected')
    getHello(@Request() req): string { // TODO: require an Beare Token, validate token
        return req.user;
    }

}
