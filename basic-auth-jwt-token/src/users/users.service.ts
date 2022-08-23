import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from './users.model';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel.USER_MODEL_NAME)
        private readonly userModel: Model<User>,
    ) {}
    async insertUser(userName: string, password: string) {
        try {
            const username = userName.toLowerCase();
            const newUser = new this.userModel({
                username,
                password,
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error.message, "*error");
            throw new Error(error);
            
        }
    }

    async getUser(userName: string) {
        const username = userName.toLowerCase();
        const user = await this.userModel.findOne({ username });
        return user;
    }

    async getUserStatic(userName?: string) {
        const User = {
            id: 1,
            username: userName.toLowerCase() || 'admin',
            password: 'admin',
        };

        return User;
    }
}
