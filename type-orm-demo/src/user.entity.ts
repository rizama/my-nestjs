import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pet } from "./pet.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    favorite: string;

    @OneToMany(() => Pet, pet => pet.owner)
    @Column({
        type: 'simple-array',
        nullable: true
    })
    pets: Pet[]
}