import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact.entity';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
        @InjectRepository(ContactInfo)
        private contactInfoRepo: Repository<ContactInfo>,
    ) {}
}
