import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('my-api')
@Crud({
    model: {
        type: User,
    },
})
@Controller('users')
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) {}
}
