import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { MeetingService } from './meeting.service';

@Module({
    imports: [TypeOrmModule.forFeature([Meeting])],
    providers: [MeetingService]
})
export class MeetingsModule {}
