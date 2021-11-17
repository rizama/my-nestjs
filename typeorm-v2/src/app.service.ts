import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './employees/contact.entity';
import { Employee } from './employees/employee.entity';
import { Meeting } from './meetings/meeting.entity';
import { Task } from './tasks/task.entity';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
        @InjectRepository(ContactInfo)
        private contactInfoRepo: Repository<ContactInfo>,
        @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
        @InjectRepository(Task) private taskRepo: Repository<Task>,
    ) {}

    async seed() {
        // Employee CEO
        const ceo = this.employeeRepo.create({ name: 'Mr. Ceo' });
        await this.employeeRepo.save(ceo);

        // ContactInfo CEO & Relation
        const ceoContactInfo = this.contactInfoRepo.create({
            email: 'ceo@mail.com',
        });
        ceoContactInfo.employee = ceo;
        await this.contactInfoRepo.save(ceoContactInfo);

        // Employee CEO
        const manager = this.employeeRepo.create({ name: 'Sam', manager: ceo });
        await this.employeeRepo.save(manager);

        const task1 = this.taskRepo.create({ name: 'Hire people' });
        await this.taskRepo.save(task1);
        const task2 = this.taskRepo.create({ name: 'Present to CEO' });
        await this.taskRepo.save(task2);

        manager.tasks = [task1, task2];

        const meeting1 = this.meetingRepo.create({
            zoomUrl: 'lalala@meeting.com',
        });
        meeting1.attendees = [ceo];
        await this.meetingRepo.save(meeting1);

        manager.meetings = [meeting1];

        await this.employeeRepo.save(manager);
    }

    getHello(): string {
        return 'Hello World!';
    }

    async getEmployeeById(id: number): Promise<Employee> {
        // Eloquent
        // return this.employeeRepo.findOne(id, {
        //     relations: [
        //         'manager',
        //         'directReports',
        //         'tasks',
        //         'contactInfo',
        //         'meetings',
        //     ],
        // });

        // For Complex Query
        return this.employeeRepo
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.contactInfo', 'contactInfo')
            .leftJoinAndSelect('employee.directReports', 'directReports')
            .leftJoinAndSelect('employee.meetings', 'meetings')
            .leftJoinAndSelect('employee.tasks', 'tasks')
            .where('employee.id = :employeeId', { employeeId: id })
            .getOne();
    }

    async deleteEmployee(id: number): Promise<void> {
        this.employeeRepo.delete(id);
    }
}
