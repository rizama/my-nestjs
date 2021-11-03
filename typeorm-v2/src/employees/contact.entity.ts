import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class ContactInfo {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    email: string;

    @Column()
    employeeId: number;

    @OneToOne(() => Employee, (employee) => employee.contactInfo)
    @JoinColumn()
    employee: Employee;
}
