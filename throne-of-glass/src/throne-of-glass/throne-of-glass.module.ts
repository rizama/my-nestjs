import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThroneOfGlassController } from './throne-of-glass.controller';
import { ThroneOfGlassService } from './throne-of-glass.service';
import { Tog } from './tog.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tog])],
    controllers: [ThroneOfGlassController],
    providers: [ThroneOfGlassService],
})
export class ThroneOfGlassModule {}
