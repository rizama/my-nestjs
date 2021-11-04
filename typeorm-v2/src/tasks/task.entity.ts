import { Employee } from "src/employees/employee.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Employee, employee => employee.tasks, {
        onDelete: 'SET NULL'
    })
    employee: Employee;
}