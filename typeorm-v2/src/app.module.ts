import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'typeorm-v2',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
