import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(
        //instantiate service
        private authService: AuthService,
    ) {}
}
