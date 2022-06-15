import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('bookmarks')
export class BookmarkController {
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getMe(@Req() req: Request) {
        console.log(req);

        return 'bookmark info';
    }
}
