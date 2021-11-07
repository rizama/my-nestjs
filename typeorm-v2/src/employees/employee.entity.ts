import { Meeting } from 'src/meetings/meeting.entity';
import { Task } from 'src/tasks/task.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Employee, (employee) => employee.directReports, {
        onDelete: 'SET NULL',
    })
    manager: Employee;

    @OneToMany(() => Employee, (employee) => employee.manager)
    directReports: Employee[];

    @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
    contactInfo: ContactInfo;

    @OneToMany(() => Task, (task) => task.employee)
    tasks: Task[];

    @ManyToMany(() => Meeting, meeting => meeting.attendees)
    @JoinTable()
    meetings: Meeting[];
}
