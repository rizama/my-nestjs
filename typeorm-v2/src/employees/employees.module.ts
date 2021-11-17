import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './contact.entity';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Module({
    imports: [TypeOrmModule.forFeature([Employee, ContactInfo])],
    providers: [EmployeeService],
    controllers: [],
    exports: [TypeOrmModule.forFeature([Employee, ContactInfo])]
})
export class EmployeesModule {}
