import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateuserDto } from './dto/user-create.dto';
import { User } from './user.entity';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    async getAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['pets'],
        });
    }

    async getOneById(id: number): Promise<User> {
        try {
            const user = await this.usersRepository.findOneOrFail(id);
            return user;
        } catch (error) {
            throw new NotFoundException();
        }
    }

    async createUser(createUserDto: CreateuserDto): Promise<User> {
        const { name, email, favorite } = createUserDto;
        const newUser = await this.usersRepository.create({
            name,
            email,
            favorite,
        });

        return this.usersRepository.save(newUser);
    }

    async updateUser(name: string, id: number): Promise<User> {
        const user = await this.getOneById(id);
        user.name = name;
        return this.usersRepository.save(user);
    }

    async deleteUser(id: number): Promise<User> {
        const user: User = await this.getOneById(id);

        return this.usersRepository.remove(user);
    }

    getHello(): string {
        return 'Hello World!';
    }
}
