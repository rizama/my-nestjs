import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateuserDto } from './dto/user-create.dto';
import { User } from './user.entity';

@Controller('users')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.appService.getAll();
    }

    @Get('/:id')
    async getUser(@Param('id') id: number): Promise<User> {
        return this.appService.getOneById(id);
    }

    @Post()
    async storeUser(@Body() createUserDto: CreateuserDto): Promise<User> {
        return this.appService.createUser(createUserDto);
    }

    @Patch('/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: CreateuserDto,
    ): Promise<User> {
        const { name } = updateUserDto;
        return this.appService.updateUser(name, id);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: number): Promise<User> {
        return this.appService.deleteUser(id);
    }
}
