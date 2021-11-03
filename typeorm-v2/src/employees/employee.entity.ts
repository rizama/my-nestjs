import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contact.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToOne(() => ContactInfo, contactInfo => contactInfo.employee)
    contactInfo: ContactInfo
}