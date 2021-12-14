import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThroneOfGlassModule } from './throne-of-glass/throne-of-glass.module';

@Module({
    imports: [
        ThroneOfGlassModule,
        // ref: https://docs.nestjs.com/techniques/database
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'tog',
            entities: ['dist/**/*.entity{.ts,.js}'], // Static glob paths (e.g., dist/**/*.entity{ .ts,.js}) won't work properly with webpack (like NX monorepo).
            // autoLoadEntities: true, // if you use monorepo
            synchronize: true,
        }),
        ConfigModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
